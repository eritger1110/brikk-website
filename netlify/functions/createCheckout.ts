// netlify/functions/createcheckout.ts (or .js)
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

const PLAN_TO_PRICE = {
  free:    process.env.PRICE_FREE,
  hacker:  process.env.PRICE_HACKER,
  starter: process.env.PRICE_STARTER,
  pro:     process.env.PRICE_PRO,
} as const;

export async function handler(event: any) {
  try {
    // Env sanity
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY not set');
      return res(500, { message: 'Server configuration error' });
    }

    const { plan } = JSON.parse(event.body || '{}');
    if (!plan || !(plan in PLAN_TO_PRICE)) {
      return res(400, { message: 'Plan is required or invalid.' });
    }

    const price = PLAN_TO_PRICE[plan as keyof typeof PLAN_TO_PRICE];
    if (!price) {
      console.error(`Price ID not found for plan: ${plan}`);
      return res(500, { message: 'Plan configuration error' });
    }

    const successUrl =
      process.env.CHECKOUT_SUCCESS_URL ||
      `${process.env.SITE_URL}/thanks`;

    const cancelUrl =
      process.env.CHECKOUT_CANCEL_URL ||
      `${process.env.SITE_URL}/pricing`;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      // You wanted to require a card even for Free:
      payment_method_collection: 'always',
      // Only include fields that Checkout supports under subscription_data
      subscription_data: {
        metadata: { plan: String(plan) } // optional metadata; safe
        // You can also add trial settings or proration_behavior here if needed
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      // optional quality-of-life flags you can keep or drop:
      allow_promotion_codes: true
    });

    return res(200, { url: session.url });
  } catch (err: any) {
    // Bubble up Stripe’s message so you can see exact cause in Netlify logs
    console.error('createCheckout error:', err?.message || err);
    return res(500, { message: 'Failed to create checkout session.' });
  }
}

function res(status: number, body: any) {
  return { statusCode: status, body: JSON.stringify(body) };
}
