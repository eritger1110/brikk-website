import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const sig = event.headers['stripe-signature'];
  const body = event.body;

  if (!sig || !body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing signature or body' }),
    };
  }

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook signature verification failed' }),
    };
  }

  // Handle the event
  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(stripeEvent.data.object as Stripe.Checkout.Session);
        break;
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(stripeEvent.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(stripeEvent.data.object as Stripe.Subscription);
        break;
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(stripeEvent.data.object as Stripe.Invoice);
        break;
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(stripeEvent.data.object as Stripe.Invoice);
        break;
      
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' }),
    };
  }
};

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', {
    sessionId: session.id,
    customerId: session.customer,
    customerEmail: session.customer_email,
    subscriptionId: session.subscription,
    mode: session.mode,
    metadata: session.metadata,
  });

  // Handle setup mode completion for Free plan
  if (session.mode === 'setup' && session.metadata?.plan === 'free') {
    try {
      // Create a $0 subscription for the Free plan
      const subscription = await stripe.subscriptions.create({
        customer: session.customer as string,
        items: [
          {
            price: process.env.PRICE_FREE || 'price_1S0veEQpyOKlL3ogY1YodS3t',
          },
        ],
        default_payment_method: session.setup_intent ? 
          (await stripe.setupIntents.retrieve(session.setup_intent as string)).payment_method as string : 
          undefined,
        metadata: {
          plan: 'free',
          api_calls: '2000',
          agents: '2',
          signup_date: new Date().toISOString(),
        },
      });

      console.log('Created Free subscription:', subscription.id);
    } catch (error) {
      console.error('Error creating Free subscription:', error);
    }
  }

  // Update customer metadata with plan information
  if (session.customer && session.metadata) {
    try {
      await stripe.customers.update(session.customer as string, {
        metadata: {
          plan: session.metadata.plan || 'unknown',
          api_calls: session.metadata.api_calls || '0',
          agents: session.metadata.agents || '0',
          signup_date: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Error updating customer metadata:', error);
    }
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', {
    subscriptionId: subscription.id,
    customerId: subscription.customer,
    status: subscription.status,
    metadata: subscription.metadata,
  });

  // Update subscription metadata if needed
  if (subscription.metadata && Object.keys(subscription.metadata).length > 0) {
    try {
      await stripe.subscriptions.update(subscription.id, {
        metadata: {
          ...subscription.metadata,
          created_date: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Error updating subscription metadata:', error);
    }
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', {
    subscriptionId: subscription.id,
    customerId: subscription.customer,
    status: subscription.status,
    metadata: subscription.metadata,
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', {
    subscriptionId: subscription.id,
    customerId: subscription.customer,
    canceledAt: subscription.canceled_at,
  });

  // Update customer metadata to reflect cancellation
  try {
    await stripe.customers.update(subscription.customer as string, {
      metadata: {
        subscription_status: 'canceled',
        canceled_date: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error updating customer metadata on cancellation:', error);
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded:', {
    invoiceId: invoice.id,
    customerId: invoice.customer,
    subscriptionId: invoice.subscription,
    amountPaid: invoice.amount_paid,
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed:', {
    invoiceId: invoice.id,
    customerId: invoice.customer,
    subscriptionId: invoice.subscription,
    amountDue: invoice.amount_due,
  });

  // You might want to send an email notification here
  // or update customer status to indicate payment issues
}

