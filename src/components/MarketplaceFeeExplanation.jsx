import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle,
  Info,
  Calculator,
  CreditCard,
  ArrowRight
} from 'lucide-react';

const MarketplaceFeeExplanation = ({ onNavigate }) => {
  const [selectedExample, setSelectedExample] = useState('professional');

  const feeStructure = [
    {
      plan: 'Free & Hacker',
      fee: '2.9%',
      fixed: '$0.30',
      description: 'Standard marketplace fee for all transactions'
    },
    {
      plan: 'Starter',
      fee: '2.9%',
      fixed: '$0.30',
      description: 'Standard marketplace fee for all transactions'
    },
    {
      plan: 'Professional',
      fee: '2.4%',
      fixed: '$0.30',
      description: 'Reduced fee as a loyalty benefit',
      highlight: true
    },
    {
      plan: 'Enterprise',
      fee: '2.0%',
      fixed: '$0.30',
      description: 'Lowest fee for enterprise customers',
      highlight: true
    }
  ];

  const examples = {
    professional: {
      salePrice: 100,
      fee: 2.4,
      fixed: 0.30,
      plan: 'Professional'
    },
    enterprise: {
      salePrice: 500,
      fee: 2.0,
      fixed: 0.30,
      plan: 'Enterprise'
    },
    standard: {
      salePrice: 50,
      fee: 2.9,
      fixed: 0.30,
      plan: 'Starter'
    }
  };

  const calculateFee = (salePrice, feePercent, fixedFee) => {
    const percentageFee = (salePrice * feePercent) / 100;
    const totalFee = percentageFee + fixedFee;
    const youReceive = salePrice - totalFee;
    return { totalFee, youReceive, percentageFee };
  };

  const currentExample = examples[selectedExample];
  const calculation = calculateFee(currentExample.salePrice, currentExample.fee, currentExample.fixed);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--brikk-dark-bg)',
      color: 'var(--brikk-white)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            background: 'var(--brikk-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Brikk Agent Marketplace Fees
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--brikk-slate-text)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Transparent, competitive fees that decrease as you grow. No hidden charges, no surprises.
          </p>
        </div>

        {/* What is the Marketplace */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Users className="w-6 h-6" style={{ color: 'var(--brikk-purple)' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
              What is the Brikk Agent Marketplace?
            </h2>
          </div>
          <p style={{
            color: 'var(--brikk-slate-text)',
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }}>
            The Brikk Agent Marketplace is where developers can share, sell, and monetize their AI agents. 
            Whether you've built a specialized customer service agent, a data analysis bot, or a complex 
            multi-agent coordination system, you can list it on our marketplace for other developers to use.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: 'rgba(115, 95, 255, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(115, 95, 255, 0.3)'
            }}>
              <Zap className="w-5 h-5" style={{ color: 'var(--brikk-purple)' }} />
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Instant Deployment</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
                  Agents deploy instantly to buyers
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <Shield className="w-5 h-5" style={{ color: '#22c55e' }} />
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Secure Transactions</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
                  All payments processed securely
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              background: 'rgba(6, 182, 212, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(6, 182, 212, 0.3)'
            }}>
              <DollarSign className="w-5 h-5" style={{ color: 'var(--brikk-teal)' }} />
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Automatic Payouts</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
                  Get paid automatically after each sale
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <TrendingDown className="w-6 h-6" style={{ color: 'var(--brikk-teal)' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
              Fee Structure by Plan
            </h2>
          </div>
          <p style={{
            color: 'var(--brikk-slate-text)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Our marketplace fees decrease as you upgrade your plan, rewarding loyal customers with better rates.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {feeStructure.map((tier, index) => (
              <div key={index} style={{
                padding: '1.5rem',
                background: tier.highlight ? 'rgba(115, 95, 255, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                border: tier.highlight ? '1px solid rgba(115, 95, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                position: 'relative'
              }}>
                {tier.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--brikk-gradient)',
                    color: 'var(--brikk-white)',
                    padding: '0.25rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    REDUCED FEE
                  </div>
                )}
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {tier.plan}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ 
                      fontSize: '2rem', 
                      fontWeight: '700', 
                      color: tier.highlight ? 'var(--brikk-purple)' : 'var(--brikk-white)' 
                    }}>
                      {tier.fee}
                    </span>
                    <span style={{ color: 'var(--brikk-slate-text)' }}>+ {tier.fixed}</span>
                  </div>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--brikk-slate-text)',
                    lineHeight: '1.5'
                  }}>
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee Calculator */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Calculator className="w-6 h-6" style={{ color: 'var(--brikk-yellow)' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
              Fee Calculator
            </h2>
          </div>
          <p style={{
            color: 'var(--brikk-slate-text)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            See exactly how much you'll receive from marketplace sales based on your plan.
          </p>
          
          {/* Example Selector */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {Object.entries(examples).map(([key, example]) => (
              <button
                key={key}
                onClick={() => setSelectedExample(key)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: selectedExample === key ? 'var(--brikk-gradient)' : 'transparent',
                  border: selectedExample === key ? 'none' : '1px solid var(--brikk-card-border)',
                  borderRadius: '8px',
                  color: 'var(--brikk-white)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                ${example.salePrice} sale ({example.plan})
              </button>
            ))}
          </div>

          {/* Calculation Display */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '0.5rem' }}>
                Sale Price
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--brikk-white)' }}>
                ${currentExample.salePrice.toFixed(2)}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '0.5rem' }}>
                Marketplace Fee
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ef4444' }}>
                -${calculation.totalFee.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--brikk-slate-text)' }}>
                ({currentExample.fee}% + ${currentExample.fixed})
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '0.5rem' }}>
                You Receive
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#22c55e' }}>
                ${calculation.youReceive.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--brikk-slate-text)' }}>
                {((calculation.youReceive / currentExample.salePrice) * 100).toFixed(1)}% of sale
              </div>
            </div>
          </div>
        </div>

        {/* What Fees Cover */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Info className="w-6 h-6" style={{ color: 'var(--brikk-teal)' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
              What Do Marketplace Fees Cover?
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              gap: '1rem',
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px'
            }}>
              <CreditCard className="w-6 h-6" style={{ color: 'var(--brikk-purple)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Payment Processing
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', lineHeight: '1.5' }}>
                  Secure credit card processing, fraud protection, and automatic payouts to your account.
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: '1rem',
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px'
            }}>
              <Shield className="w-6 h-6" style={{ color: '#22c55e', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Platform Security
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', lineHeight: '1.5' }}>
                  Enterprise-grade security, compliance monitoring, and protection against malicious agents.
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: '1rem',
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px'
            }}>
              <Zap className="w-6 h-6" style={{ color: 'var(--brikk-yellow)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Infrastructure & Hosting
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', lineHeight: '1.5' }}>
                  Global CDN, 99.97% uptime, automatic scaling, and instant agent deployment.
                </p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              gap: '1rem',
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px'
            }}>
              <Users className="w-6 h-6" style={{ color: 'var(--brikk-teal)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Customer Support
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', lineHeight: '1.5' }}>
                  24/7 support for marketplace transactions, dispute resolution, and technical assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'var(--brikk-gradient)',
          borderRadius: '16px',
          padding: '3rem 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: 'var(--brikk-white)'
          }}>
            Ready to Start Selling Your AI Agents?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Join thousands of developers already monetizing their AI agents on the Brikk Marketplace.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('signup')}
              style={{
                background: 'var(--brikk-white)',
                color: 'var(--brikk-dark-bg)',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              Start Free Account
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              style={{
                background: 'transparent',
                color: 'var(--brikk-white)',
                border: '2px solid var(--brikk-white)',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              View All Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFeeExplanation;

