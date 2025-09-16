// netlify/functions/provision-link.ts
import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_API_KEY;
const PROVISION_SECRET = process.env.PROVISION_SECRET;

const stripe = new Stripe(STRIPE_KEY as string, {
  apiVersion: '2024-06-20',
});

function refFromSession(id: string) {
  const tail = (id || '').replace(/[^A-Za-z0-9]/g, '').slice(-6).toUpperCase();
  return `BRK-${tail || '—'}`;
}

export const handler: Handler = async (event) => {
  try {
    const sessionId = event.queryStringParameters?.session_id || '';
    if (!sessionId) {
      return { statusCode: 400, body: JSON.stringify({ error: 'missing session_id' }) };
    }
    if (!STRIPE_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'STRIPE_SECRET_KEY not set' }) };
    }
    if (!PROVISION_SECRET) {
      return { statusCode: 500, body: JSON.stringify({ error: 'PROVISION_SECRET not set' }) };
    }

    const s = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'customer_details'],
    });

    const email =
      s.customer_details?.email ||
      (typeof s.customer === 'object' ? s.customer?.email : undefined) ||
      (s.metadata?.email as string | undefined) ||
      '';

    const fullName =
      s.customer_details?.name ||
      (typeof s.customer === 'object' ? s.customer?.name : undefined) ||
      '';

    let first = (s.metadata?.first_name as string) || '';
    let last = (s.metadata?.last_name as string) || '';
    if (fullName && !(first || last)) {
      const parts = fullName.trim().split(/\s+/);
      first = parts.shift() || '';
      last = parts.join(' ');
    }

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store',
      },
      body: JSON.stringify({
        token: PROVISION_SECRET,        // backend expects the exact secret
        email,
        first,
        last,
        reference: refFromSession(sessionId),
      }),
    };
  } catch (e: any) {
    console.error('[provision-link] error:', e?.message || e);
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: e?.message || 'unknown error' }),
    };
  }
};
