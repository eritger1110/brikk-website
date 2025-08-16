import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  MessageCircle, 
  BookOpen,
  ExternalLink,
  Shield,
  FileText,
  Cookie
} from 'lucide-react';
import BrikkLogo from '../assets/BrikkLogo.webp';

const Footer = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', action: () => onNavigate('features') },
        { label: 'Pricing', action: () => onNavigate('pricing') },
        { label: 'Use Cases', action: () => onNavigate('use-cases') },
        { label: 'API Reference', href: 'https://docs.getbrikk.com/api', external: true },
        { label: 'Status Page', href: 'https://status.getbrikk.com', external: true }
      ]
    },
    {
      title: 'Developers',
      links: [
        { label: 'Documentation', href: 'https://docs.getbrikk.com', external: true },
        { label: 'GitHub Examples', href: 'https://github.com/brikk-ai/examples', external: true },
        { label: 'Discord Community', href: 'https://discord.gg/brikk', external: true },
        { label: 'SDK Downloads', href: 'https://docs.getbrikk.com/sdks', external: true },
        { label: 'Changelog', href: 'https://docs.getbrikk.com/changelog', external: true }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', action: () => onNavigate('about') },
        { label: 'Blog', href: 'https://blog.getbrikk.com', external: true },
        { label: 'Careers', href: 'https://careers.getbrikk.com', external: true },
        { label: 'Contact', action: () => onNavigate('contact') },
        { label: 'Press Kit', href: 'https://press.getbrikk.com', external: true }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', action: () => onNavigate('terms') },
        { label: 'Privacy Policy', action: () => onNavigate('privacy') },
        { label: 'Cookie Policy', action: () => onNavigate('cookies') },
        { label: 'Security', action: () => onNavigate('security') },
        { label: 'Compliance', action: () => onNavigate('compliance') }
      ]
    }
  ];

  const handleLinkClick = (link) => {
    if (link.external && link.href) {
      window.open(link.href, '_blank', 'noopener,noreferrer');
    } else if (link.action) {
      link.action();
    }
  };

  return (
    <footer style={{
      background: 'var(--brikk-dark-bg)',
      borderTop: '1px solid var(--brikk-card-border)',
      color: 'var(--brikk-white)',
      padding: '4rem 2rem 2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Company Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <img 
                src={BrikkLogo} 
                alt="Brikk Logo" 
                style={{
                  height: '48px',
                  width: 'auto'
                }}
              />
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--brikk-white)'
                }}>
                  Brikk
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--brikk-slate-text)'
                }}>
                  AI Agent Infrastructure
                </div>
              </div>
            </div>
            <p style={{
              color: 'var(--brikk-slate-text)',
              lineHeight: '1.6',
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}>
              The only platform built specifically for AI agent coordination. Connect agents across 6 programming languages with enterprise-grade security and real-time performance.
            </p>
            
            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail className="w-4 h-4" style={{ color: 'var(--brikk-teal)' }} />
                <a 
                  href="mailto:support@getbrikk.com"
                  style={{
                    color: 'var(--brikk-slate-text)',
                    textDecoration: 'none',
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--brikk-white)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--brikk-slate-text)'}
                >
                  support@getbrikk.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone className="w-4 h-4" style={{ color: 'var(--brikk-teal)' }} />
                <a 
                  href="tel:+1-555-BRIKK-AI"
                  style={{
                    color: 'var(--brikk-slate-text)',
                    textDecoration: 'none',
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--brikk-white)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--brikk-slate-text)'}
                >
                  +1 (555) BRIKK-AI
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin className="w-4 h-4" style={{ color: 'var(--brikk-teal)' }} />
                <span style={{
                  color: 'var(--brikk-slate-text)',
                  fontSize: '0.875rem'
                }}>
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 style={{
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--brikk-white)'
              }}>
                {section.title}
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--brikk-slate-text)',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--brikk-white)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--brikk-slate-text)'}
                    >
                      {link.label}
                      {link.external && <ExternalLink className="w-3 h-3" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '2rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--brikk-card-border)'
        }}>
          <a
            href="https://github.com/brikk-ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              color: 'var(--brikk-slate-text)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--brikk-gradient)';
              e.target.style.color = 'var(--brikk-white)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = 'var(--brikk-slate-text)';
            }}
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://discord.gg/brikk"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              color: 'var(--brikk-slate-text)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--brikk-gradient)';
              e.target.style.color = 'var(--brikk-white)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = 'var(--brikk-slate-text)';
            }}
          >
            <MessageCircle className="w-5 h-5" />
          </a>
          <a
            href="https://docs.getbrikk.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              color: 'var(--brikk-slate-text)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--brikk-gradient)';
              e.target.style.color = 'var(--brikk-white)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = 'var(--brikk-slate-text)';
            }}
          >
            <BookOpen className="w-5 h-5" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid var(--brikk-card-border)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--brikk-slate-text)'
          }}>
            © {currentYear} Brikk Technologies, Inc. All rights reserved.
          </div>
          
          {/* Security & Compliance Badges */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              <Shield className="w-3 h-3" style={{ color: '#22c55e' }} />
              <span style={{
                fontSize: '0.75rem',
                color: '#22c55e',
                fontWeight: '500'
              }}>
                SOC 2 Ready
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <FileText className="w-3 h-3" style={{ color: '#3b82f6' }} />
              <span style={{
                fontSize: '0.75rem',
                color: '#3b82f6',
                fontWeight: '500'
              }}>
                HIPAA Designed
              </span>
            </div>
          </div>
        </div>

        {/* Additional Legal Notice */}
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: '1.5',
            margin: 0,
            textAlign: 'center'
          }}>
            Brikk is a trademark of Brikk Technologies, Inc. All other trademarks are the property of their respective owners. 
            This platform is designed with enterprise-grade security and compliance standards. 
            For enterprise inquiries and custom deployments, contact our sales team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

