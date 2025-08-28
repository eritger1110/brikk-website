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
    const { priceId, mode = 'subscription', requireCard = true, successUrl, cancelUrl } = JSON.parse(event.body || '{}');

    if (!priceId) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Price ID is required' }),
      };
    }

    // For Free plan, use setup mode to collect card without charging
    if (priceId === process.env.PRICE_FREE) {
      const session = await stripe.checkout.Session.create({
        payment_method_types: ['card'],
        mode: 'setup',
        success_url: successUrl || `${process.env.SITE_URL}/thanks?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl || `${process.env.SITE_URL}/pricing`,
        metadata: {
          plan: 'free',
          priceId: priceId,
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
    }

    // For paid plans, create subscription checkout
    const session = await stripe.checkout.Session.create({
      payment_method_types: ['card'],
      mode: mode,
      payment_method_collection: requireCard ? 'always' : 'if_required',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.SITE_URL}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.SITE_URL}/pricing`,
      metadata: {
        priceId: priceId,
      },
      subscription_data: {
        metadata: {
          priceId: priceId,
        },
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

