/**
 * Stripe Integration Utilities for Brikk Platform
 * Handles payment processing, subscription management, and billing
 */

import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef'
);

// API base URL
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Create a Stripe customer and optionally start subscription
 */
export const createCustomer = async (customerData) => {
    try {
        const response = await fetch(`${API_BASE}/api/payments/create-customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create customer');
        }
        
        return data;
    } catch (error) {
        console.error('Create customer error:', error);
        throw error;
    }
};

/**
 * Create payment method and attach to customer
 */
export const createPaymentMethod = async (cardElement, billingDetails) => {
    try {
        const stripe = await stripePromise;
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: billingDetails,
        });
        
        if (error) {
            throw new Error(error.message);
        }
        
        return paymentMethod;
    } catch (error) {
        console.error('Create payment method error:', error);
        throw error;
    }
};

/**
 * Confirm payment intent for subscription
 */
export const confirmPayment = async (clientSecret, paymentMethodId) => {
    try {
        const stripe = await stripePromise;
        
        const { error, paymentIntent } = await stripe.confirmPayment({
            clientSecret,
            payment_method: paymentMethodId,
            return_url: `${window.location.origin}/dashboard`,
        });
        
        if (error) {
            throw new Error(error.message);
        }
        
        return paymentIntent;
    } catch (error) {
        console.error('Confirm payment error:', error);
        throw error;
    }
};

/**
 * Update subscription plan
 */
export const updateSubscription = async (subscriptionId, newPlanType) => {
    try {
        const response = await fetch(`${API_BASE}/api/payments/update-subscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subscription_id: subscriptionId,
                new_plan_type: newPlanType
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update subscription');
        }
        
        return data;
    } catch (error) {
        console.error('Update subscription error:', error);
        throw error;
    }
};

/**
 * Cancel subscription
 */
export const cancelSubscription = async (subscriptionId, cancelAtPeriodEnd = true) => {
    try {
        const response = await fetch(`${API_BASE}/api/payments/cancel-subscription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subscription_id: subscriptionId,
                cancel_at_period_end: cancelAtPeriodEnd
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to cancel subscription');
        }
        
        return data;
    } catch (error) {
        console.error('Cancel subscription error:', error);
        throw error;
    }
};

/**
 * Get customer billing information
 */
export const getCustomerBilling = async (customerId) => {
    try {
        const response = await fetch(`${API_BASE}/api/payments/customer/${customerId}`);
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to get customer billing');
        }
        
        return data;
    } catch (error) {
        console.error('Get customer billing error:', error);
        throw error;
    }
};

/**
 * Format currency amount for display
 */
export const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Get plan pricing information
 */
export const getPlanPricing = () => {
    return {
        free: {
            name: 'Free',
            price: 0,
            billing: 'forever',
            api_calls: 1000,
            agents: 2,
            features: [
                '1,000 API calls per month',
                '2 agents maximum',
                'Community support',
                'Basic coordination',
                'All 6 programming languages'
            ],
            limitations: [
                'Powered by Brikk branding',
                'Community support only',
                'Basic features only'
            ]
        },
        starter: {
            name: 'Starter',
            price: 99,
            billing: 'per month',
            api_calls: 10000,
            agents: 5,
            features: [
                '10,000 API calls per month',
                '5 agents maximum',
                'Remove Brikk branding',
                'Email support',
                'Basic analytics',
                'All enterprise features'
            ],
            popular: true
        },
        professional: {
            name: 'Professional',
            price: 299,
            billing: 'per month',
            api_calls: 100000,
            agents: 25,
            features: [
                '100,000 API calls per month',
                '25 agents maximum',
                'Phone support',
                'Advanced analytics',
                'Custom integrations',
                'Priority support queue'
            ]
        },
        enterprise: {
            name: 'Enterprise',
            price: 'Custom',
            billing: 'pricing',
            api_calls: 'Unlimited',
            agents: 'Unlimited',
            features: [
                'Unlimited API calls',
                'Unlimited agents',
                'Dedicated support',
                'Custom SLA',
                'White-label options',
                'On-premise deployment'
            ]
        }
    };
};

/**
 * Validate credit card information
 */
export const validateCardInfo = (cardNumber, expiryDate, cvc) => {
    const errors = {};
    
    // Basic card number validation (remove spaces and check length)
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber || cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
        errors.cardNumber = 'Please enter a valid card number';
    }
    
    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryDate || !expiryRegex.test(expiryDate)) {
        errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            errors.expiryDate = 'Card has expired';
        }
    }
    
    // CVC validation
    if (!cvc || cvc.length < 3 || cvc.length > 4) {
        errors.cvc = 'Please enter a valid CVC';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Format card number with spaces for display
 */
export const formatCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    const match = cleaned.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/);
    
    if (!match) return cardNumber;
    
    return [match[1], match[2], match[3], match[4]]
        .filter(Boolean)
        .join(' ');
};

/**
 * Get card brand from card number
 */
export const getCardBrand = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6/.test(cleaned)) return 'discover';
    
    return 'unknown';
};

export default {
    createCustomer,
    createPaymentMethod,
    confirmPayment,
    updateSubscription,
    cancelSubscription,
    getCustomerBilling,
    formatCurrency,
    getPlanPricing,
    validateCardInfo,
    formatCardNumber,
    getCardBrand
};

