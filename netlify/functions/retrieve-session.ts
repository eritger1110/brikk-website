import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function handler(event: any) {
  try {
    const session_id = event.queryStringParameters?.session_id;
    if (!session_id) return { statusCode: 400, body: 'session_id required' };

    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ['customer'] });
    const email = session.customer_details?.email || (session.customer as any)?.email || null;
    const name  = (session.customer as any)?.name || session.customer_details?.name || null;
    const app_url = (session.customer as any)?.metadata?.app_url || null;

    return { statusCode: 200, body: JSON.stringify({ email, name, app_url }) };
  } catch (e: any) {
    console.error('retrieve-session error', e?.message || e);
    return { statusCode: 500, body: 'error' };
  }
}
