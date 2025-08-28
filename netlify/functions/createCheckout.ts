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
    const { plan, email } = JSON.parse(event.body || '{}');

    if (!plan) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Plan is required' }),
      };
    }

    // Map plan names to Stripe price IDs
    const priceMapping: { [key: string]: string } = {
      free: process.env.PRICE_FREE || 'price_1S0veEQpyOKlL3ogY1YodS3t',
      hacker: process.env.PRICE_HACKER || 'price_1S0veEQpyOKlL3ogFDWWkgg4',
      starter: process.env.PRICE_STARTER || 'price_1S0veEQpyOKlL3ogbaTnkWr3',
      professional: process.env.PRICE_PRO || 'price_1S0veEQpyOKlL3ogbfGK3q76',
    };

    const priceId = priceMapping[plan];
    if (!priceId) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid plan selected' }),
      };
    }

    // Plan metadata for tracking
    const planMetadata: { [key: string]: any } = {
      free: { plan: 'free', api_calls: 2000, agents: 2, price: '$0.00' },
      hacker: { plan: 'hacker', api_calls: 10000, agents: 5, price: '$29.99' },
      starter: { plan: 'starter', api_calls: 100000, agents: 10, price: '$99.99' },
      professional: { plan: 'professional', api_calls: 1000000, agents: 50, price: '$299.99' },
    };

    const metadata = planMetadata[plan] || {};

    // For Free plan, use setup mode to collect card without charging
    if (plan === 'free') {
      const session = await stripe.checkout.Session.create({
        payment_method_types: ['card'],
        mode: 'setup',
        success_url: `${process.env.CHECKOUT_SUCCESS_URL || process.env.SITE_URL + '/thanks?session_id={CHECKOUT_SESSION_ID}'}`,
        cancel_url: `${process.env.CHECKOUT_CANCEL_URL || process.env.SITE_URL + '/pricing'}`,
        customer_email: email,
        metadata: metadata,
      });

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: session.url }),
      };
    }

    // For paid plans, create subscription checkout
    const session = await stripe.checkout.Session.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.CHECKOUT_SUCCESS_URL || process.env.SITE_URL + '/thanks?session_id={CHECKOUT_SESSION_ID}'}`,
      cancel_url: `${process.env.CHECKOUT_CANCEL_URL || process.env.SITE_URL + '/pricing'}`,
      customer_email: email,
      metadata: metadata,
      subscription_data: {
        metadata: metadata,
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

