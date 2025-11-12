import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

// Whitelist of allowed price IDs (security measure)
const ALLOWED_PRICE_IDS = [
  'price_1S0veEQpyOKlL3ogY1YodS3t', // Free/Business Assistant $24/mo
  'price_1S0veEQpyOKlL3ogFDWWkgg4', // Hacker $29.99/mo
  'price_1S0veEQpyOKlL3ogbaTnkWr3', // Starter $99.99/mo
  'price_1S0veEQpyOKlL3ogbfGK3q76', // Professional $299.99/mo
];

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

    // Request - now accepts priceId directly
    const { priceId } = JSON.parse(event.body || '{}');
    
    if (!priceId) {
      return res(400, { message: 'priceId is required.' });
    }
    
    // Security: validate priceId is in our whitelist
    if (!ALLOWED_PRICE_IDS.includes(priceId)) {
      return res(400, { message: 'Invalid priceId.' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', // ← CRITICAL: Must be subscription for recurring billing

      line_items: [{ price: priceId, quantity: 1 }],

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

