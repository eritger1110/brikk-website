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
    const { plan } = JSON.parse(event.body || '{}');
    if (!plan || !PLAN_TO_PRICE[plan as keyof typeof PLAN_TO_PRICE]) {
      return res(400, { message: 'Plan is required or invalid.' });
    }
    const price = PLAN_TO_PRICE[plan as keyof typeof PLAN_TO_PRICE]!;
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      // require card even for Free
      payment_method_collection: 'always',
      subscription_data: { payment_settings: { save_default_payment_method: 'on_subscription' } },
      success_url: process.env.CHECKOUT_SUCCESS_URL!,
      cancel_url: process.env.CHECKOUT_CANCEL_URL!,
    });
    return res(200, { url: session.url });
  } catch (err: any) {
    console.error('createCheckout error:', err?.message);
    return res(500, { message: 'Failed to create checkout session.' });
  }
}

function res(status: number, body: any) { 
  return { statusCode: status, body: JSON.stringify(body) }; 
}

