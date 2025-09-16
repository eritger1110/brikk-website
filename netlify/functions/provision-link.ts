// netlify/functions/provision-link.ts
import type { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2024-06-20',
});

export const handler: Handler = async (event) => {
  try {
    const session_id = event.queryStringParameters?.session_id || '';
    if (!session_id) return { statusCode: 400, body: 'Missing session_id' };

    if (!process.env.PROVISION_SECRET) {
      return { statusCode: 500, body: 'Server misconfigured: PROVISION_SECRET missing' };
    }
    if (!process.env.STRIPE_SECRET) {
      return { statusCode: 500, body: 'Server misconfigured: STRIPE_SECRET missing' };
    }

    // Get the Checkout Session; expand customer so we can read its email if needed
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer', 'payment_intent'],
    });

    // --- Pull email robustly ---
    let email: string | undefined =
      (session.customer_details as any)?.email ||
      (session as any).customer_email;

    // From expanded customer (object) or by fetching it if we only have an ID
    if (!email && session.customer) {
      if (typeof session.customer === 'string') {
        const cust = await stripe.customers.retrieve(session.customer);
        email = (cust as any)?.email || email;
      } else {
        email = (session.customer as any)?.email || email;
      }
    }

    // As a last resort, try the payment intent's receipt_email
    if (!email && session.payment_intent) {
      const pi =
        typeof session.payment_intent === 'string'
          ? await stripe.paymentIntents.retrieve(session.payment_intent)
          : (session.payment_intent as Stripe.PaymentIntent);
      email = (pi as any)?.receipt_email || email;
    }

    // --- Derive first/last name if we have one ---
    const nameFrom =
      (session.customer_details as any)?.name ||
      (typeof session.customer !== 'string' ? (session.customer as any)?.name : undefined) ||
      '';
    let first = '';
    let last = '';
    if (nameFrom) {
      const parts = String(nameFrom).trim().split(/\s+/);
      first = parts.shift() || '';
      last = parts.join(' ');
    }

    // Short-lived token (10 minutes) for /api/auth/complete-signup
    const now = Math.floor(Date.now() / 1000);
    const token = jwt.sign(
      { sub: 'provision', session_id, email, first, last, iat: now, exp: now + 600 },
      process.env.PROVISION_SECRET as string,
      { algorithm: 'HS256', issuer: 'brikk-netlify' }
    );

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
      body: JSON.stringify({ token, email, first, last }),
    };
  } catch (e: any) {
    return { statusCode: 500, body: `provision-link failed: ${e?.message || e}` };
  }
};
