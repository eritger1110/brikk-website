import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function handler(event: any) {
  const sig = event.headers['stripe-signature'];
  const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64') : Buffer.from(event.body || '');
  let evt: Stripe.Event;

  try {
    evt = stripe.webhooks.constructEvent(raw, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed', err?.message);
    return { statusCode: 400, body: 'Invalid signature' };
  }

  try {
    if (evt.type === 'checkout.session.completed') {
      const s = evt.data.object as Stripe.Checkout.Session;
      const full = await stripe.checkout.sessions.retrieve(s.id, { expand: ['customer', 'subscription'] });
      const customer = full.customer as Stripe.Customer | null;
      const subscription = full.subscription as Stripe.Subscription | null;

      const payload = {
        email: full.customer_details?.email || customer?.email || null,
        name: customer?.name || full.customer_details?.name || null,
        phone: customer?.phone || full.customer_details?.phone || null,
        address: customer?.address || full.customer_details?.address || null,
        plan: full.metadata?.plan || subscription?.items?.data?.[0]?.price?.id || null,
        stripeCustomerId: customer?.id || null,
        subscriptionId: subscription?.id || null,
      };

      // Back-channel to your API (secure)
      let appUrl: string | null = null;
      if (process.env.PROVISION_URL && process.env.PROVISION_SECRET) {
        const r = await fetch(process.env.PROVISION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PROVISION_SECRET}`
          },
          body: JSON.stringify(payload)
        });
        try { appUrl = (await r.json())?.app_url ?? null; } catch {}
      }
      // Store app_url on the Customer so success page can pick it up
      if (appUrl && customer?.id) {
        await stripe.customers.update(customer.id, { metadata: { app_url: appUrl } });
      }
    }
    return { statusCode: 200, body: 'ok' };
  } catch (err: any) {
    console.error('Webhook handler error', err?.message || err);
    return { statusCode: 500, body: 'error' };
  }
}
