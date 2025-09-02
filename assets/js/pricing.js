// Single source of truth for all pricing data
export const PRICING = {
  free: { 
    label: 'Free', 
    monthly: 0, 
    priceId: 'price_1S0veEQpyOKlL3ogY1YodS3t',
    threshold: 1000
  },
  hacker: { 
    label: 'Hacker', 
    monthly: 29.99, 
    priceId: 'price_1S0veEQpyOKlL3ogFDWWkgg4',
    threshold: 10000
  },
  starter: { 
    label: 'Starter', 
    monthly: 99.99, 
    priceId: 'price_1S0veEQpyOKlL3ogbaTnkWr3',
    threshold: 100000
  },
  pro: { 
    label: 'Professional', 
    monthly: 299.99, 
    priceId: 'price_1S0veEQpyOKlL3ogbfGK3q76',
    threshold: 1000000
  }
};

// Recommendation logic based on usage
export function getRecommendedTier(monthlyWorkflows, monthlyAPICalls) {
  const totalCalls = monthlyWorkflows * 10 + monthlyAPICalls; // Rough estimate
  
  if (totalCalls <= PRICING.free.threshold) return 'free';
  if (totalCalls <= PRICING.hacker.threshold) return 'hacker';
  if (totalCalls <= PRICING.starter.threshold) return 'starter';
  if (totalCalls <= PRICING.pro.threshold) return 'pro';
  return 'custom';
}

// Format price for display
export function formatPrice(amount) {
  if (amount === 0) return '$0';
  return `$${amount.toFixed(2)}`;
}

