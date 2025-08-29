import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const handler: Handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    const { password } = JSON.parse(event.body || '{}');

    // Simple password protection
    if (password !== process.env.OWNER_ADMIN_PASSWORD) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid password' }),
      };
    }

    // Fetch customers with active subscriptions
    const customers = await stripe.customers.list({
      limit: 100,
      expand: ['data.subscriptions'],
    });

    const customerData = await Promise.all(
      customers.data.map(async (customer) => {
        const subscriptions = customer.subscriptions?.data || [];
        const activeSubscription = subscriptions.find(sub => sub.status === 'active');
        
        let planInfo = null;
        if (activeSubscription) {
          const priceId = activeSubscription.items.data[0]?.price.id;
          planInfo = {
            subscriptionId: activeSubscription.id,
            status: activeSubscription.status,
            currentPeriodEnd: activeSubscription.current_period_end,
            priceId: priceId,
            plan: activeSubscription.metadata?.plan || 'unknown',
            apiCalls: activeSubscription.metadata?.api_calls || 'unknown',
            agents: activeSubscription.metadata?.agents || 'unknown',
          };
        }

        return {
          customerId: customer.id,
          email: customer.email,
          name: customer.name,
          created: customer.created,
          metadata: customer.metadata,
          subscription: planInfo,
        };
      })
    );

    // Filter to only customers with subscriptions
    const customersWithSubscriptions = customerData.filter(c => c.subscription);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customers: customersWithSubscriptions,
        total: customersWithSubscriptions.length,
      }),
    };
  } catch (error) {
    console.error('Error fetching customers:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch customers',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

