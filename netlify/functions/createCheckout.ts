import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

// Map plan → price env
const PLAN_TO_PRICE: Record<string, string | undefined> = {
  free: process.env.PRICE_FREE,
  hacker: process.env.PRICE_HACKER,
  starter: process.env.PRICE_STARTER,
  pro: process.env.PRICE_PRO,
};

function json(statusCode: number, body: unknown) {
  return { statusCode, body: JSON.stringify(body) };
}

export async function handler(event: any) {
  try {
    // Basic env sanity
    const required = [
      'STRIPE_SECRET_KEY',
      'CHECKOUT_SUCCESS_URL',
      'CHECKOUT_CANCEL_URL',
    ];
    for (const k of required) {
      if (!process.env[k]) {
        console.error(`Missing env: ${k}`);
        return json(500, { message: `Server not configured (${k}).` });
      }
    }

    // Parse plan from POST { plan: "starter" }
    let plan: string | undefined;
    try {
      const body = event.body ? JSON.parse(event.body) : {};
      plan = body?.plan;
    } catch {
      return json(400, { message: 'Invalid JSON body.' });
    }

    const price = plan ? PLAN_TO_PRICE[plan] : undefined;
    if (!price) {
      return json(400, { message: `Unknown or missing plan.` });
    }

    // Create Checkout Session for a subscription
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],

      // Require card even for Free, and always get a Customer
      payment_method_collection: 'always',
      customer_creation: 'always',

      // Capture user info you asked for
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },

      // Keep customer data in sync with what’s entered in Checkout
      customer_update: {
        address: 'auto',
        name: 'auto',
      },

      success_url: process.env.CHECKOUT_SUCCESS_URL!,
      cancel_url: process.env.CHECKOUT_CANCEL_URL!,
    });

    return json(200, { url: session.url });
  } catch (err: any) {
    // Surface the Stripe error message to help us debug
    const msg =
      err?.raw?.message || err?.message || 'Failed to create checkout session.';
    console.error('createCheckout error:', err);
    // Use 400 here so browser shows the message we return instead of a generic 500
    return json(400, { message: msg });
  }
}
