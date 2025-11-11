import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

/**
 * Check if a Stripe session has been provisioned
 * Returns: { provisioned: boolean, app_url?: string, email?: string, name?: string }
 */
export async function handler(event: any) {
  const sessionId = event.queryStringParameters?.session_id;

  if (!sessionId) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing session_id' })
    };
  }

  try {
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer']
    });

    const customer = session.customer as Stripe.Customer | null;

    if (!customer) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provisioned: false,
          email: session.customer_details?.email || null,
          name: session.customer_details?.name || null
        })
      };
    }

    // Check if app_url exists in customer metadata (set by webhook)
    const appUrl = customer.metadata?.app_url || null;
    const provisioned = !!appUrl;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provisioned,
        app_url: appUrl,
        email: customer.email || session.customer_details?.email || null,
        name: customer.name || session.customer_details?.name || null
      })
    };
  } catch (err: any) {
    console.error('check-provision error:', err?.message || err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to check provision status' })
    };
  }
}

