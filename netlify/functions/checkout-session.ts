// netlify/functions/checkout-session.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function handler(event: any) {
  try {
    const id =
      event.queryStringParameters?.session_id ||
      event.queryStringParameters?.id;

    if (!id) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing session_id' }) };
    }

    // Pull useful bits for the success page
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['customer', 'subscription'],
    });

    return { statusCode: 200, body: JSON.stringify(session) };
  } catch (err: any) {
    console.error('checkout-session error:', err?.message);
    return { statusCode: 500, body: JSON.stringify({ error: err?.message || 'Unknown error' }) };
  }
}
