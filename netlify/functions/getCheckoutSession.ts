import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function handler(event: any) {
  try {
    const id = event.queryStringParameters?.id;
    if (!id) return { statusCode: 400, body: 'Missing id' };

    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['customer', 'subscription']
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: session.id,
        email: session.customer_details?.email || null,
        name:
          // from custom field 'full_name' if you added it
          session.custom_fields?.find(f => f.key === 'full_name')?.text?.value ||
          session.customer_details?.name ||
          null,
        plan_price: session.amount_total,
        currency: session.currency
      })
    };
  } catch (e: any) {
    console.error('getCheckoutSession error:', e?.message);
    return { statusCode: 500, body: 'Failed to fetch session' };
  }
}
