import Stripe from 'stripe';

export async function handler() {
  const required = [
    'STRIPE_SECRET_KEY','PRICE_FREE','PRICE_HACKER','PRICE_STARTER','PRICE_PRO',
    'CHECKOUT_SUCCESS_URL','CHECKOUT_CANCEL_URL','SITE_URL'
  ];
  const missing = required.filter(k => !process.env[k]);

  let stripeOk = false;
  const priceChecks: Record<string, string | null> = {};
  try {
    if (process.env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
      for (const [label, key] of Object.entries({
        free: 'PRICE_FREE', hacker: 'PRICE_HACKER', starter: 'PRICE_STARTER', pro: 'PRICE_PRO'
      })) {
        const id = process.env[key as keyof NodeJS.ProcessEnv] as string | undefined;
        if (!id) { priceChecks[label] = null; continue; }
        try {
          const p = await stripe.prices.retrieve(id);
          priceChecks[label] = p.id ?? null;
        } catch {
          priceChecks[label] = null;
        }
      }
      stripeOk = true;
    }
  } catch { stripeOk = false; }

  return {
    statusCode: 200,
    body: JSON.stringify({ missingEnv: missing, stripeKeyLooksUsable: stripeOk, pricesFound: priceChecks })
  };
}
