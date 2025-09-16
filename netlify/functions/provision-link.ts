// netlify/functions/provision-link.ts
import type { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const PROVISION_SECRET = process.env.PROVISION_SECRET;
if (!PROVISION_SECRET) {
  console.warn('WARNING: PROVISION_SECRET is not set in Netlify env.');
}

export const handler: Handler = async (event) => {
  try {
    const sessionId = event.queryStringParameters?.session_id?.trim();
    if (!sessionId) {
      return { statusCode: 400, body: 'Missing session_id' };
    }

    // Expand so we can read customer details reliably
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'customer_details'],
    });

    // Best-effort extraction
    const details = (session as any).customer_details || {};
    const custObj = typeof session.customer === 'object' ? (session.customer as any) : null;

    const email =
      details.email ||
      session.customer_email ||
      (custObj?.email ?? '');

    // Try to get name from multiple places
    const fullName: string =
      details.name ||
      (custObj?.name ?? '') ||
      '';

    let first = '';
    let last = '';
    if (fullName) {
      const parts = fullName.split(' ').filter(Boolean);
      first = parts.shift() || '';
      last = parts.join(' ');
    }

    // Build a short-lived token the API will verify
    const token = jwt.sign(
      {
        email,
        first_name: first,
        last_name: last,
        session_id: sessionId,
        purpose: 'complete-signup',
      },
      PROVISION_SECRET as string,
      {
        algorithm: 'HS256',
        issuer: 'brikk-netlify',
        expiresIn: '15m',
      }
    );

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
      body: JSON.stringify({ token, email, first, last }),
    };
  } catch (e: any) {
    console.error('provision-link error', e);
    return { statusCode: 500, body: `provision-link failed: ${e?.message || e}` };
  }
};
