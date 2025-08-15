import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Globe } from 'lucide-react';
import BrikkLogo from '../assets/BrikkLogo.webp';

const PrivacyPolicy = ({ onBackToHome }) => {
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
            onClick={onBackToHome}
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
                height: '40px',
                width: 'auto'
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
        maxWidth: '800px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        {/* Page Header */}
        <div style={{ 
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'var(--brikk-card-bg)',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--brikk-border)',
            marginBottom: '1.5rem'
          }}>
            <Shield className="text-green-400" size={24} />
            <span style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'var(--brikk-white)'
            }}>
              Privacy & Data Protection
            </span>
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--brikk-white)',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            Privacy Policy
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            We are committed to protecting your privacy and ensuring the security of your data. 
            This policy explains how we collect, use, and safeguard your information.
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: 'var(--brikk-slate-text)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={16} />
              GDPR Compliant
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={16} />
              CCPA Compliant
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={16} />
              Global Privacy Standards
            </div>
          </div>
        </div>

        {/* Privacy Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-border)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <Lock className="text-blue-400 mx-auto mb-3" size={32} />
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'var(--brikk-white)',
              marginBottom: '0.5rem'
            }}>
              End-to-End Encryption
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--brikk-slate-text)',
              lineHeight: 1.5
            }}>
              All data is encrypted in transit and at rest using industry-standard AES-256 encryption
            </p>
          </div>

          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-border)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <Shield className="text-green-400 mx-auto mb-3" size={32} />
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'var(--brikk-white)',
              marginBottom: '0.5rem'
            }}>
              No Data Selling
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--brikk-slate-text)',
              lineHeight: 1.5
            }}>
              We never sell, rent, or trade your personal information to third parties
            </p>
          </div>

          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-border)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <Eye className="text-purple-400 mx-auto mb-3" size={32} />
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'var(--brikk-white)',
              marginBottom: '0.5rem'
            }}>
              Full Transparency
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--brikk-slate-text)',
              lineHeight: 1.5
            }}>
              Complete visibility into what data we collect and how we use it
            </p>
          </div>
        </div>

        {/* Privacy Content */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-border)',
          borderRadius: '12px',
          padding: '2rem',
          lineHeight: 1.7
        }}>
          <div style={{ color: 'var(--brikk-slate-text)' }}>
            
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                1. Information We Collect
              </h2>
              
              <h3 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.2rem', 
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                Information You Provide Directly
              </h3>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li><strong>Account Information:</strong> Name, email address, company information</li>
                <li><strong>Billing Information:</strong> Payment details and billing address</li>
                <li><strong>Service Usage:</strong> API calls, agent configurations, support communications</li>
                <li><strong>Content Data:</strong> Data you transmit through our APIs and coordination logs</li>
              </ul>

              <h3 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.2rem', 
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                Information We Collect Automatically
              </h3>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li><strong>Technical Information:</strong> IP address, browser type, device identifiers</li>
                <li><strong>Usage Analytics:</strong> Feature usage, performance metrics, error logs</li>
                <li><strong>Cookies:</strong> Essential, analytics, and preference cookies</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                2. How We Use Your Information
              </h2>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li><strong>Service Provision:</strong> Provide and maintain the Brikk platform</li>
                <li><strong>Account Management:</strong> Process payments, manage subscriptions</li>
                <li><strong>Service Improvement:</strong> Analyze usage patterns, develop new features</li>
                <li><strong>Security:</strong> Protect against fraud, enforce Terms of Service</li>
                <li><strong>Communications:</strong> Send service updates and support responses</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                3. Information Sharing
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                <strong>We do not sell your personal data.</strong> We may share information with:
              </p>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li><strong>Service Providers:</strong> Stripe for payments, cloud providers for hosting</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                4. Data Security
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                We implement comprehensive security measures to protect your information:
              </p>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li><strong>Encryption:</strong> TLS 1.3 for data in transit, AES-256 for data at rest</li>
                <li><strong>Access Controls:</strong> Multi-factor authentication and role-based access</li>
                <li><strong>Infrastructure:</strong> SOC 2 Type II compliant data centers</li>
                <li><strong>Monitoring:</strong> 24/7 security monitoring and incident response</li>
                <li><strong>HIPAA-Ready:</strong> Architecture designed for healthcare compliance</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                5. Your Rights and Choices
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                You have the following rights regarding your personal data:
              </p>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                6. International Data Transfers
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                Our Service is provided globally. For transfers from the EEA, we implement appropriate 
                safeguards including Standard Contractual Clauses and additional security measures.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                7. Data Retention
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                We retain your information for as long as necessary to provide the Service:
              </p>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li><strong>Account Information:</strong> While active and 7 years after closure</li>
                <li><strong>Usage Data:</strong> 2 years for analytics and improvement</li>
                <li><strong>Payment Information:</strong> 7 years for tax and accounting</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                8. Contact Information
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                For privacy questions or to exercise your rights, contact us:
              </p>
              <div style={{ 
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Privacy Team</strong></p>
                <p style={{ margin: '0 0 0.5rem 0' }}>Email: privacy@getbrikk.com</p>
                <p style={{ margin: '0 0 0.5rem 0' }}>Data Protection Officer: dpo@getbrikk.com</p>
                <p style={{ margin: '0' }}>Support: support@getbrikk.com</p>
              </div>
            </section>

            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '8px',
              padding: '1rem',
              marginTop: '2rem'
            }}>
              <p style={{ 
                margin: '0',
                fontSize: '0.9rem',
                fontStyle: 'italic'
              }}>
                <strong>Last Updated:</strong> January 15, 2025. We may update this Privacy Policy 
                from time to time. We will notify you of material changes by email or through the Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

