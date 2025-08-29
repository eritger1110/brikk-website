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
    const { customerId, sessionId } = JSON.parse(event.body || '{}');

    let customer = customerId;

    // If no customerId provided, try to get it from session
    if (!customer && sessionId) {
      try {
        const session = await stripe.checkout.Session.retrieve(sessionId);
        customer = session.customer as string;
      } catch (error) {
        console.error('Error retrieving session:', error);
      }
    }

    if (!customer) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Customer ID or Session ID is required' }),
      };
    }

    // Create customer portal session
    const portalSession = await stripe.billingPortal.Session.create({
      customer: customer,
      return_url: `${process.env.SITE_URL}/`,
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: portalSession.url }),
    };
  } catch (error) {
    console.error('Error creating portal session:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Failed to create portal session',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

