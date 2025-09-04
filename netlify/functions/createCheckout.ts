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
    if (!plan || !(plan in PLAN_TO_PRICE)) return resp(400, { message: 'Plan is required or invalid.' });

    const price = PLAN_TO_PRICE[plan as keyof typeof PLAN_TO_PRICE];
    if (!price) return resp(500, { message: 'Plan configuration error' });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],

      // Collect full customer info
      customer_creation: 'always',
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },

      // Require a card even for Free (as requested)
      payment_method_collection: 'always',

      subscription_data: { metadata: { plan: String(plan) } },
      allow_promotion_codes: true,

      success_url: `${process.env.CHECKOUT_SUCCESS_URL || process.env.SITE_URL + '/checkout/success'}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CHECKOUT_CANCEL_URL || `${process.env.SITE_URL}/checkout/cancel`,
    });

    return resp(200, { url: session.url });
  } catch (err: any) {
    console.error('createCheckout error:', err?.message || err);
    return resp(500, { message: 'Failed to create checkout session.' });
  }
}
const resp = (status: number, body: any) => ({ statusCode: status, body: JSON.stringify(body) });
