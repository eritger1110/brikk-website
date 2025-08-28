# Brikk Website - Production Ready

This repository contains the production-ready Brikk website with complete Stripe integration.

## 🚀 Features

- **Complete Stripe Integration**: Checkout, billing portal, webhooks, and admin dashboard
- **Responsive Design**: Works perfectly on desktop and mobile
- **Security Hardened**: Fort Knox security headers and CSP
- **Production Ready**: Optimized for performance and SEO

## 📁 Structure

```
/
├── assets/           # CSS and styling
├── brand/           # Logo and brand assets
├── media/           # Videos and images
├── netlify/         # Netlify Functions for Stripe
├── signup/          # Success/cancel pages
├── *.html           # All website pages
├── _headers         # Security headers
├── _redirects       # URL redirects
├── package.json     # Dependencies
└── favicon.ico      # Site icon
```

## 🔧 Netlify Setup

### Environment Variables Required:
```
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SITE_URL=https://www.getbrikk.com
CHECKOUT_SUCCESS_URL=https://www.getbrikk.com/thanks?session_id={CHECKOUT_SESSION_ID}
CHECKOUT_CANCEL_URL=https://www.getbrikk.com/pricing
PRICE_FREE=price_1S0veEQpyOKlL3ogY1YodS3t
PRICE_HACKER=price_1S0veEQpyOKlL3ogFDWWkgg4
PRICE_STARTER=price_1S0veEQpyOKlL3ogbaTnkWr3
PRICE_PRO=price_1S0veEQpyOKlL3ogbfGK3q76
OWNER_ADMIN_PASSWORD=Effect-0adc1
```

### Build Settings:
- **Build command**: `npm install`
- **Publish directory**: `/` (root)
- **Functions directory**: `netlify/functions`

## 🎯 Stripe Integration

### Netlify Functions:
- `/netlify/functions/createCheckout` - Creates Stripe checkout sessions
- `/netlify/functions/createPortal` - Customer billing portal
- `/netlify/functions/webhook` - Handles Stripe webhooks
- `/netlify/functions/adminListCustomers` - Owner admin dashboard

### Webhook URL:
`https://www.getbrikk.com/.netlify/functions/webhook`

## 📋 Pages

- **/** - Homepage with hero and features
- **/features** - Feature details and benefits
- **/use-cases** - Real-world use cases
- **/pricing** - Plans and pricing calculator
- **/security** - Security and compliance
- **/about** - Company information
- **/contact** - Contact form and information
- **/signup** - Plan selection and Stripe checkout
- **/thanks** - Post-checkout success page
- **/owner** - Admin dashboard (password protected)

## 🔒 Security

- Content Security Policy (CSP) configured for Stripe
- Security headers for production
- HTTPS enforcement
- XSS protection

## 📞 Support

For technical support: support@getbrikk.com

