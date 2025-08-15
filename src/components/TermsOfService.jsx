import React from 'react';
import { ArrowLeft, FileText, Shield, Scale } from 'lucide-react';
import BrikkLogo from '../assets/BrikkLogo.webp';

const TermsOfService = ({ onBackToHome }) => {
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
            <Scale className="text-blue-400" size={24} />
            <span style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'var(--brikk-white)'
            }}>
              Legal Documentation
            </span>
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--brikk-white)',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            Terms of Service
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            These terms govern your use of the Brikk AI agent coordination platform. 
            Please read them carefully as they contain important information about your rights and obligations.
          </p>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1.5rem',
            fontSize: '0.9rem',
            color: 'var(--brikk-slate-text)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={16} />
              Last Updated: January 15, 2025
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={16} />
              Version 2.0
            </div>
          </div>
        </div>

        {/* Terms Content */}
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
                1. Introduction
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                Welcome to Brikk, the economic infrastructure for AI agents. These Terms of Service ("Terms") 
                govern your use of the Brikk platform, services, and APIs (collectively, the "Service") 
                operated by Brikk Technologies Inc. ("Brikk," "we," "us," or "our").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
                with any part of these terms, then you may not access the Service.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                2. Description of Service
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                Brikk provides a coordination platform for AI agents, enabling:
              </p>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li><strong>Universal Coordination Protocol:</strong> A standardized communication layer for AI agents</li>
                <li><strong>Multi-language Support:</strong> Native support for Python, Node.js, Java, Go, Rust, and C#</li>
                <li><strong>Real-time Coordination:</strong> Sub-second response times for agent communication</li>
                <li><strong>Economic Infrastructure:</strong> Micropayment and reputation systems for agent-to-agent commerce</li>
                <li><strong>Enterprise Security:</strong> HIPAA-ready architecture with enterprise-grade security</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                3. Account Registration and Eligibility
              </h2>
              
              <h3 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.2rem', 
                fontWeight: '500',
                marginBottom: '0.5rem',
                marginTop: '1rem'
              }}>
                3.1 Eligibility
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                You must be at least 18 years old and have the legal capacity to enter into contracts 
                to use our Service. By using the Service, you represent and warrant that you meet these requirements.
              </p>

              <h3 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.2rem', 
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                3.2 Account Information
              </h3>
              <p style={{ marginBottom: '1rem' }}>
                You must provide accurate, current, and complete information during registration and keep 
                your account information updated. You are responsible for safeguarding your account credentials 
                and for all activities that occur under your account.
              </p>

              <h3 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.2rem', 
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                3.3 Account Types
              </h3>
              <p style={{ marginBottom: '0.5rem' }}>We offer multiple account types:</p>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li><strong>Free:</strong> 1,000 API calls per month, 2 agents maximum</li>
                <li><strong>Starter:</strong> $99/month, 10,000 API calls, 5 agents maximum</li>
                <li><strong>Professional:</strong> $299/month, 100,000 API calls, 25 agents maximum</li>
                <li><strong>Enterprise:</strong> Custom pricing, unlimited usage with dedicated support</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                4. Acceptable Use Policy
              </h2>
              
              <h3 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.2rem', 
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                4.1 Permitted Uses
              </h3>
              <p style={{ marginBottom: '0.5rem' }}>You may use the Service to:</p>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li>Coordinate AI agents for legitimate business purposes</li>
                <li>Build applications that enhance productivity and automation</li>
                <li>Integrate with existing systems for improved efficiency</li>
                <li>Develop proof-of-concepts and production applications</li>
              </ul>

              <h3 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.2rem', 
                fontWeight: '500',
                marginBottom: '0.5rem'
              }}>
                4.2 Prohibited Uses
              </h3>
              <p style={{ marginBottom: '0.5rem' }}>You may not use the Service to:</p>
              <ul style={{ 
                listStyle: 'disc',
                paddingLeft: '1.5rem',
                marginBottom: '1rem'
              }}>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malicious code, viruses, or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the Service for illegal activities or fraud</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Generate spam, harassment, or abusive content</li>
              </ul>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                5. Privacy and Data Protection
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                We implement enterprise-grade security measures including end-to-end encryption, 
                regular security audits, and HIPAA-ready architecture. For detailed information 
                about how we collect, use, and protect your data, please see our Privacy Policy.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                6. Payment Terms
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                Paid plans are billed monthly in advance. You authorize us to charge your payment 
                method for all fees incurred. We offer prorated refunds for downgrades within the 
                current billing period. We may change our pricing with 30 days' notice.
              </p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                color: 'var(--brikk-white)', 
                fontSize: '1.5rem', 
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                7. Limitation of Liability
              </h2>
              <p style={{ marginBottom: '1rem' }}>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, BRIKK SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. OUR TOTAL LIABILITY SHALL 
                NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM.
              </p>
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
                If you have any questions about these Terms, please contact us:
              </p>
              <div style={{ 
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Brikk Technologies Inc.</strong></p>
                <p style={{ margin: '0 0 0.5rem 0' }}>Email: legal@getbrikk.com</p>
                <p style={{ margin: '0 0 0.5rem 0' }}>Technical Support: support@getbrikk.com</p>
                <p style={{ margin: '0' }}>Billing Questions: billing@getbrikk.com</p>
              </div>
            </section>

            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '8px',
              padding: '1rem',
              marginTop: '2rem'
            }}>
              <p style={{ 
                margin: '0',
                fontSize: '0.9rem',
                fontStyle: 'italic'
              }}>
                These Terms of Service are designed to protect both Brikk and our users while enabling 
                innovation in AI agent coordination. We are committed to transparency and fair dealing 
                in all our business relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

