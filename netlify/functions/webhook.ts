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
    console.log('Webhook event type:', evt.type);
    
    if (evt.type === 'checkout.session.completed') {
      const s = evt.data.object as Stripe.Checkout.Session;
      console.log('Checkout session ID:', s.id);
      
      const full = await stripe.checkout.sessions.retrieve(s.id, { expand: ['customer', 'subscription'] });
      const customer = full.customer as Stripe.Customer | null;
      const subscription = full.subscription as Stripe.Subscription | null;
      
      console.log('Customer ID:', customer?.id);
      console.log('Subscription ID:', subscription?.id);

      const payload = {
        email: full.customer_details?.email || customer?.email || null,
        name: customer?.name || full.customer_details?.name || null,
        phone: customer?.phone || full.customer_details?.phone || null,
        address: customer?.address || full.customer_details?.address || null,
        plan: full.metadata?.plan || subscription?.items?.data?.[0]?.price?.id || null,
        stripeCustomerId: customer?.id || null,
        subscriptionId: subscription?.id || null,
      };
      
      console.log('Provision payload:', JSON.stringify(payload, null, 2));

      // Back-channel to your API (secure)
      let appUrl: string | null = null;
      if (process.env.PROVISION_URL && process.env.PROVISION_SECRET) {
        console.log('Calling provision endpoint:', process.env.PROVISION_URL);
        
        const r = await fetch(process.env.PROVISION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PROVISION_SECRET}`
          },
          body: JSON.stringify(payload)
        });
        
        console.log('Provision response status:', r.status);
        const responseText = await r.text();
        console.log('Provision response body:', responseText);
        
        try { 
          appUrl = JSON.parse(responseText)?.app_url ?? null;
          console.log('App URL from provision:', appUrl);
        } catch (e) {
          console.error('Failed to parse provision response:', e);
        }
      } else {
        console.error('Missing PROVISION_URL or PROVISION_SECRET');
      }
      
      // Store app_url on the Customer so success page can pick it up
      if (appUrl && customer?.id) {
        console.log('Updating customer metadata with app_url');
        await stripe.customers.update(customer.id, { metadata: { app_url: appUrl } });
      } else {
        console.log('Not updating customer metadata - appUrl:', appUrl, 'customer.id:', customer?.id);
      }
    }
    return { statusCode: 200, body: 'ok' };
  } catch (err: any) {
    console.error('Webhook handler error', err?.message || err);
    return { statusCode: 500, body: 'error' };
  }
}
