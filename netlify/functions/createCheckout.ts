import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

// plan -> price id
const PLAN_TO_PRICE: Record<string, string | undefined> = {
  free:    process.env.PRICE_FREE,
  hacker:  process.env.PRICE_HACKER,
  starter: process.env.PRICE_STARTER,
  pro:     process.env.PRICE_PRO,
};

function json(statusCode: number, body: unknown) {
  return { statusCode, body: JSON.stringify(body) };
}

export async function handler(event: any) {
  try {
    // Required env
    for (const k of ['STRIPE_SECRET_KEY','CHECKOUT_SUCCESS_URL','CHECKOUT_CANCEL_URL']) {
      if (!process.env[k]) return json(500, { message: `Server not configured (${k}).` });
    }

    // Parse body
    let plan: string | undefined;
    try {
      const body = event.body ? JSON.parse(event.body) : {};
      plan = body?.plan;
    } catch {
      return json(400, { message: 'Invalid JSON body.' });
    }

    const price = plan ? PLAN_TO_PRICE[plan] : undefined;
    if (!price) return json(400, { message: 'Unknown or missing plan.' });

    // Create Checkout Session (SUBSCRIPTION)
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],

      // Require a card even for $0 plans; Stripe will create/use a Customer automatically
      payment_method_collection: 'always',

      // Collect the user info you wanted
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      customer_update: { address: 'auto', name: 'auto' },

      success_url: process.env.CHECKOUT_SUCCESS_URL!,
      cancel_url: process.env.CHECKOUT_CANCEL_URL!,
    });

    return json(200, { url: session.url });
  } catch (err: any) {
    const msg = err?.raw?.message || err?.message || 'Failed to create checkout session.';
    console.error('createCheckout error:', err);
    // 400 so the browser shows this message instead of a generic 500
    return json(400, { message: msg });
  }
}
