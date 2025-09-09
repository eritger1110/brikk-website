import Stripe from 'stripe';
import * as jwt from 'jsonwebtoken';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

function json(status: number, body: any) {
  return {
    statusCode: status,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  };
}

export async function handler(event: any) {
  try {
    const session_id =
      (event.queryStringParameters && event.queryStringParameters.session_id) ||
      new URLSearchParams(event.rawUrl?.split('?')[1] || '').get('session_id');

    if (!session_id) return json(400, { error: 'Missing session_id' });
    if (!process.env.PROVISION_SECRET) return json(500, { error: 'Missing PROVISION_SECRET' });

    // Fetch and expand so we can render a nice success page
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer', 'subscription'],
    });

    if (session.mode !== 'subscription') return json(400, { error: 'Wrong mode' });
    if (session.status !== 'complete') return json(400, { error: `Session not complete (status=${session.status})` });

    const email =
      session.customer_details?.email ||
      (typeof session.customer === 'object' ? (session.customer.email as string) : undefined);

    const name =
      session.customer_details?.name ||
      (typeof session.customer === 'object' ? (session.customer.name as string) : undefined);

    const customerId =
      typeof session.customer === 'string' ? session.customer : (session.customer?.id as string);

    const subscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : (session.subscription?.id as string | undefined);

    // Short-lived JWT for the welcome handshake
    const payload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 600, // 10 minutes
      email,
      name,
      customer: customerId,
      subscription: subscriptionId || null,
      source: 'netlify-provision',
    };

    const token = jwt.sign(payload, process.env.PROVISION_SECRET as string, {
      algorithm: 'HS256',
      issuer: 'brikk-netlify',
      subject: email || customerId || 'unknown',
    });

    const base = (process.env.APP_WELCOME_URL || 'https://app.getbrikk.com').replace(/\/$/, '');
    const url = `${base}/welcome?token=${encodeURIComponent(token)}`;

    // IMPORTANT: return { url }
    return json(200, { url });
  } catch (err: any) {
    console.error('provision-link error', err);
    return json(500, { error: err?.message || 'Failed to make provision link' });
  }
}
