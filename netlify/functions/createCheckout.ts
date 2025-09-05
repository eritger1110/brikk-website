import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

const PLAN_TO_PRICE = {
  free:    process.env.PRICE_FREE,
  hacker:  process.env.PRICE_HACKER,
  starter: process.env.PRICE_STARTER,
  pro:     process.env.PRICE_PRO,
} as const;

function res(status: number, body: any) {
  return { statusCode: status, body: JSON.stringify(body) };
}

export async function handler(event: any) {
  try {
    // Basic env sanity
    const missing: string[] = [];
    if (!process.env.STRIPE_SECRET_KEY) missing.push('STRIPE_SECRET_KEY');
    if (!process.env.CHECKOUT_SUCCESS_URL) missing.push('CHECKOUT_SUCCESS_URL');
    if (!process.env.CHECKOUT_CANCEL_URL) missing.push('CHECKOUT_CANCEL_URL');
    if (missing.length) return res(500, { message: `Missing env: ${missing.join(', ')}` });

    // Request
    const { plan } = JSON.parse(event.body || '{}');
    if (!plan || !(plan in PLAN_TO_PRICE)) return res(400, { message: 'Plan is required or invalid.' });

    const price = PLAN_TO_PRICE[plan as keyof typeof PLAN_TO_PRICE];
    if (!price) return res(500, { message: `Price ID missing for plan '${plan}'.` });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],

      // collect a card even on the $0 plan
      payment_method_collection: 'always',

      // collect name + address on the built-in form (optional line; set 'auto' or 'required')
      billing_address_collection: 'required',

      // Stripe collects email automatically in subscription mode.
      // (If you have a logged-in user and want to prefill: customer_email: 'user@domain.tld')

      // Add FIRST / LAST NAME as two required custom text fields:
      custom_fields: [
        {
          key: 'first_name',
          label: { type: 'custom', custom: 'First name' },
          type: 'text',
          optional: false,
        },
        {
          key: 'last_name',
          label: { type: 'custom', custom: 'Last name' },
          type: 'text',
          optional: false,
        },
      ],

      // (Optional) collect phone on the page as well
      phone_number_collection: { enabled: true },

      success_url: process.env.CHECKOUT_SUCCESS_URL, // include ?session_id={CHECKOUT_SESSION_ID}
      cancel_url: process.env.CHECKOUT_CANCEL_URL,
    });

    return res(200, { url: session.url });
  } catch (err: any) {
    console.error('createCheckout error:', err?.message);
    return res(500, { message: 'Failed to create checkout session.' });
  }
}
