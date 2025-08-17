import React, { useState } from 'react';
import { ArrowLeft, Check, Zap, Crown, Building, Users, Phone, Mail, MessageCircle, Shield, Clock, BarChart3, Code, Star, Sparkles } from 'lucide-react';
import BrikkLogo from '../assets/BrikkLogo.webp';

const PricingPage = ({ onBackToHome, onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for developers and proof-of-concepts',
      badge: null,
      features: [
        '1,000 API calls per month',
        '2 agents maximum',
        'All 6 programming languages',
        'Community support',
        'Basic coordination',
        'Standard documentation'
      ],
      overage: '$0.008 per extra call',
      extras: null,
      cta: 'Start Free',
      popular: false,
      color: 'gray'
    },
    {
      id: 'hacker',
      name: 'Hacker',
      price: { monthly: 49, annual: 44 },
      description: 'For developers building serious projects',
      badge: 'Developer Favorite',
      features: [
        '7,500 API calls per month',
        '3 agents maximum',
        'All 6 programming languages',
        'Email support',
        'Basic coordination',
        'Priority documentation',
        'Community access'
      ],
      overage: '$0.008 per extra call',
      extras: null,
      cta: 'Start Free',
      popular: false,
      color: 'green'
    },
    {
      id: 'starter',
      name: 'Starter',
      price: { monthly: 99, annual: 89 },
      description: 'For small teams getting serious about agent coordination',
      badge: 'Most Popular',
      features: [
        '10,000 API calls per month',
        '5 agents maximum',
        'All enterprise features',
        'Email support',
        'Remove Brikk branding',
        'Basic analytics',
        'Priority documentation',
        'Webhook integrations'
      ],
      overage: '$0.005 per extra call',
      extras: null,
      cta: 'Start 14-Day Trial',
      popular: true,
      color: 'blue'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: { monthly: 299, annual: 269 },
      description: 'For businesses scaling agent coordination',
      badge: 'Best Value',
      features: [
        '100,000 API calls per month',
        '25 agents maximum',
        'Phone support',
        'Advanced analytics',
        'Custom integrations',
        'Priority support queue',
        'Dedicated account manager',
        'SLA guarantees'
      ],
      overage: '$0.002 per extra call',
      extras: 'Reduced Brikk Agent Marketplace fee (2.4% + $0.30 per transaction)',
      cta: 'Start 14-Day Trial',
      popular: false,
      color: 'purple'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 'Custom', annual: 'Custom' },
      description: 'For Fortune 500 companies with unlimited needs',
      badge: 'Custom Solutions',
      features: [
        'Unlimited API calls',
        'Unlimited agents',
        'Dedicated support team',
        'Custom SLA',
        'On-premise deployment',
        'Advanced security',
        'Compliance certifications',
        'Custom integrations',
        'Training and onboarding'
      ],
      overage: 'Negotiated',
      extras: 'Reduced Brikk Agent Marketplace fee (2.0% + $0.30 per transaction)',
      cta: 'Contact Sales',
      popular: false,
      color: 'gold'
    },
    {
      id: 'enterprise-plus',
      name: 'Enterprise Plus',
      price: { monthly: 'Custom', annual: 'Custom' },
      description: 'Advanced compliance packages for regulated industries',
      badge: 'Coming Soon',
      features: [
        'Unlimited API calls',
        'Unlimited agents',
        'Dedicated support team',
        'Custom SLA',
        'Advanced compliance packages',
        'HIPAA compliance (planned)',
        'SOC 2 certification (planned)',
        'Government compliance (planned)',
        'White-glove onboarding'
      ],
      overage: 'Negotiated',
      extras: 'Advanced compliance packages (HIPAA, SOC 2, Government) planned for future release — contact us for early access and preferred pricing',
      cta: 'Contact for Early Access',
      popular: false,
      color: 'platinum',
      comingSoon: true
    }
  ];

  const comparisonFeatures = [
    {
      category: 'Core Features',
      features: [
        { name: 'API Calls per Month', free: '1,000', hacker: '7,500', starter: '10,000', professional: '100,000', enterprise: 'Unlimited' },
        { name: 'Maximum Agents', free: '2', hacker: '3', starter: '5', professional: '25', enterprise: 'Unlimited' },
        { name: 'Programming Languages', free: '6', hacker: '6', starter: '6', professional: '6', enterprise: '6' },
        { name: 'Response Time SLA', free: 'Best Effort', hacker: 'Best Effort', starter: '< 100ms', professional: '< 50ms', enterprise: 'Custom' },
        { name: 'Overage Pricing', free: '$0.008/call', hacker: '$0.008/call', starter: '$0.005/call', professional: '$0.002/call', enterprise: 'Negotiated' }
      ]
    },
    {
      category: 'Support & Services',
      features: [
        { name: 'Support Channel', free: 'Community', hacker: 'Email', starter: 'Email', professional: 'Phone + Email', enterprise: 'Dedicated Team' },
        { name: 'Response Time', free: 'Community', hacker: '72 hours', starter: '48 hours', professional: '24 hours', enterprise: '1 hour' },
        { name: 'Account Manager', free: '❌', hacker: '❌', starter: '❌', professional: '✅', enterprise: '✅' },
        { name: 'Training & Onboarding', free: '❌', hacker: 'Self-service', starter: 'Self-service', professional: 'Guided', enterprise: 'Full Service' }
      ]
    },
    {
      category: 'Analytics & Monitoring',
      features: [
        { name: 'Basic Analytics', free: '✅', hacker: '✅', starter: '✅', professional: '✅', enterprise: '✅' },
        { name: 'Advanced Analytics', free: '❌', hacker: '❌', starter: '❌', professional: '✅', enterprise: '✅' },
        { name: 'Custom Dashboards', free: '❌', hacker: '❌', starter: '❌', professional: '✅', enterprise: '✅' },
        { name: 'Real-time Monitoring', free: '❌', hacker: 'Basic', starter: 'Basic', professional: 'Advanced', enterprise: 'Enterprise' }
      ]
    },
    {
      category: 'Security & Compliance',
      features: [
        { name: 'Data Encryption', free: '✅', hacker: '✅', starter: '✅', professional: '✅', enterprise: '✅' },
        { name: 'HIPAA-Ready Architecture', free: '✅', hacker: '✅', starter: '✅', professional: '✅', enterprise: '✅' },
        { name: 'SOC 2 Compliance', free: 'Design Only', hacker: 'Design Only', starter: 'Design Only', professional: 'In Progress', enterprise: 'Full Compliance' },
        { name: 'Custom Security Controls', free: '❌', hacker: '❌', starter: '❌', professional: 'Limited', enterprise: 'Full' },
        { name: 'Marketplace Fee', free: 'N/A', hacker: 'Standard (2.9%)', starter: 'Standard (2.9%)', professional: 'Reduced (2.4%)', enterprise: 'Reduced (2.0%)' }
      ]
    }
  ];

  const faqItems = [
    {
      question: "Can I change plans at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle. We provide prorated billing for fair pricing."
    },
    {
      question: "What happens if I exceed my API call limit?",
      answer: "We'll notify you when you reach 75%, 90%, and 95% of your limit. If you exceed your limit, we'll temporarily throttle requests and suggest upgrading to a higher plan. No surprise charges."
    },
    {
      question: "Do you offer custom enterprise pricing?",
      answer: "Yes, our Enterprise plan includes custom pricing based on your specific needs, usage patterns, and compliance requirements. Contact our sales team for a personalized quote."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes, all paid plans include a 14-day free trial with full access to features. No credit card required to start the trial."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) and ACH transfers for Enterprise customers. All payments are processed securely through Stripe."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer prorated refunds for downgrades within the current billing period. For cancellations, we provide refunds on a case-by-case basis within the first 30 days."
    }
  ];

  return (
    <div style={{ 
      background: 'var(--brikk-dark-bg)',
      color: 'var(--brikk-white)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ 
        borderBottom: '1px solid var(--brikk-border)',
        padding: '1rem 2rem'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={() => {
              onBackToHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--brikk-slate-text)',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--brikk-white)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--brikk-slate-text)'}
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <img 
              src={BrikkLogo} 
              alt="Brikk Logo" 
              style={{
                height: '48px',
                width: 'auto',
                cursor: 'pointer'
              }}
              onClick={() => {
              onBackToHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            />
            <div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: 'var(--brikk-white)',
                lineHeight: 1
              }}>
                Brikk
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--brikk-slate-text)',
                lineHeight: 1
              }}>
                AI Agent Infrastructure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: 'var(--brikk-white)',
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Simple, <span style={{ 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Transparent</span> Pricing
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            Start free, scale as you grow. No hidden fees, no surprises. 
            Choose the plan that fits your AI agent coordination needs.
          </p>

          {/* Billing Toggle */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-border)',
            borderRadius: '12px',
            padding: '0.5rem'
          }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                background: billingCycle === 'monthly' ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                color: 'var(--brikk-white)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                background: billingCycle === 'annual' ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                color: 'var(--brikk-white)',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              Annual
              <span style={{
                position: 'absolute',
                top: '-0.5rem',
                right: '-0.5rem',
                background: '#10b981',
                color: 'white',
                fontSize: '0.7rem',
                padding: '0.2rem 0.4rem',
                borderRadius: '4px',
                fontWeight: '600'
              }}>
                Save 10%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem'
        }}>
          {pricingPlans.map((plan) => (
            <div key={plan.id} style={{
              background: 'var(--brikk-card-bg)',
              border: plan.popular ? '2px solid #3b82f6' : '1px solid var(--brikk-border)',
              borderRadius: '20px',
              padding: '2rem',
              position: 'relative',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: plan.popular ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : '#10b981',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--brikk-white)',
                  marginBottom: '0.5rem'
                }}>
                  {plan.name}
                </h3>
                
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: 'var(--brikk-white)',
                  marginBottom: '0.5rem'
                }}>
                  {typeof plan.price[billingCycle] === 'number' ? (
                    <>
                      ${plan.price[billingCycle]}
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: '400',
                        color: 'var(--brikk-slate-text)'
                      }}>
                        {plan.price[billingCycle] === 0 ? ' forever' : '/month'}
                      </span>
                    </>
                  ) : (
                    <span style={{ fontSize: '2rem' }}>{plan.price[billingCycle]}</span>
                  )}
                </div>
                
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--brikk-slate-text)',
                  lineHeight: 1.4
                }}>
                  {plan.description}
                </p>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 1rem 0'
              }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem',
                    color: 'var(--brikk-slate-text)'
                  }}>
                    <Check size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Overage Pricing */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--brikk-slate-text)',
                  marginBottom: '0.25rem',
                  fontWeight: '500'
                }}>
                  Overage Pricing:
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'var(--brikk-white)',
                  fontWeight: '600'
                }}>
                  {plan.overage}
                </div>
              </div>

              {/* Extras */}
              {plan.extras && (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--brikk-slate-text)',
                    marginBottom: '0.25rem',
                    fontWeight: '500'
                  }}>
                    Extras:
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--brikk-white)',
                    lineHeight: 1.4
                  }}>
                    {plan.extras}
                  </div>
                </div>
              )}

              {/* Coming Soon Badge */}
              {plan.comingSoon && (
                <div style={{
                  background: 'rgba(251, 191, 36, 0.1)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#fbbf24',
                    fontWeight: '600'
                  }}>
                    🚀 Coming Soon - Contact for Early Access
                  </div>
                </div>
              )}

              <button
                onClick={() => plan.id === 'free' ? onNavigate('signup') : plan.id === 'enterprise' ? onNavigate('contact') : onNavigate('signup')}
                style={{
                  width: '100%',
                  background: plan.popular ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : 'transparent',
                  border: plan.popular ? 'none' : '1px solid var(--brikk-border)',
                  borderRadius: '12px',
                  padding: '1rem',
                  color: 'var(--brikk-white)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!plan.popular) {
                    e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.popular) {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = 'var(--brikk-border)';
                  }
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--brikk-white)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Detailed Feature Comparison
          </h2>
          
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-border)',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            {/* Table Headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
              gap: '1rem',
              padding: '1rem 2rem',
              background: 'rgba(59, 130, 246, 0.2)',
              borderBottom: '1px solid var(--brikk-border)',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '1rem',
                color: 'var(--brikk-white)',
                fontWeight: '600'
              }}>
                Feature
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--brikk-white)',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                Free
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--brikk-white)',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                Hacker
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--brikk-white)',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                Starter
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--brikk-white)',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                Professional
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--brikk-white)',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                Enterprise
              </div>
            </div>
            
            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: categoryIndex > 0 ? '1px solid var(--brikk-border)' : 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--brikk-white)'
                }}>
                  {category.category}
                </div>
                
                {category.features.map((feature, featureIndex) => (
                  <div key={featureIndex} style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                    gap: '1rem',
                    padding: '1rem 2rem',
                    borderBottom: featureIndex < category.features.length - 1 ? '1px solid var(--brikk-border)' : 'none',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'var(--brikk-white)',
                      fontWeight: '500'
                    }}>
                      {feature.name}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--brikk-slate-text)',
                      textAlign: 'center'
                    }}>
                      {feature.free}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--brikk-slate-text)',
                      textAlign: 'center'
                    }}>
                      {feature.hacker}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--brikk-slate-text)',
                      textAlign: 'center'
                    }}>
                      {feature.starter}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--brikk-slate-text)',
                      textAlign: 'center'
                    }}>
                      {feature.professional}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'var(--brikk-slate-text)',
                      textAlign: 'center'
                    }}>
                      {feature.enterprise}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--brikk-white)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {faqItems.map((faq, index) => (
              <div key={index} style={{
                background: 'var(--brikk-card-bg)',
                border: '1px solid var(--brikk-border)',
                borderRadius: '12px',
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--brikk-white)',
                  marginBottom: '1rem'
                }}>
                  {faq.question}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--brikk-slate-text)',
                  lineHeight: 1.6
                }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '20px',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--brikk-white)',
            marginBottom: '1rem'
          }}>
            Ready to Get Started?
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            Join thousands of developers building the future of AI agent coordination. 
            Start with our free plan or try any paid plan with a 14-day free trial.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => onNavigate('signup')}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2rem',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Zap size={20} />
              Start Free
            </button>
            
            <button
              onClick={() => onNavigate('contact')}
              style={{
                background: 'transparent',
                border: '1px solid var(--brikk-border)',
                borderRadius: '12px',
                padding: '1rem 2rem',
                color: 'var(--brikk-white)',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.target.style.background = 'rgba(59, 130, 246, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--brikk-border)';
                e.target.style.background = 'transparent';
              }}
            >
              <MessageCircle size={20} />
              Contact Sales
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingPage;

