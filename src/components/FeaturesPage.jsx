import React from 'react';
import { ArrowLeft, Zap, Code, Shield, Globe, Clock, Users, Database, Cpu, Network, Lock, BarChart3, Webhook, GitBranch } from 'lucide-react';
import BrikkLogo from '../assets/BrikkLogo.webp';

const FeaturesPage = ({ onBackToHome, onNavigate }) => {
  const coreFeatures = [
    {
      icon: <Network className="text-blue-400" size={32} />,
      title: "Universal Coordination Protocol",
      description: "The Internet Protocol for AI Agents - enabling seamless communication across any platform, language, or framework.",
      details: [
        "Standardized communication layer",
        "Cross-platform compatibility",
        "Real-time message routing",
        "Protocol versioning and upgrades"
      ]
    },
    {
      icon: <Code className="text-green-400" size={32} />,
      title: "Multi-Language Support",
      description: "Native SDKs for all major programming languages with consistent APIs and comprehensive documentation.",
      details: [
        "Python, Node.js, Java, Go, Rust, C#",
        "Consistent API across all languages",
        "Type-safe implementations",
        "Comprehensive code examples"
      ]
    },
    {
      icon: <Zap className="text-yellow-400" size={32} />,
      title: "Real-Time Coordination",
      description: "Sub-10ms response times with 99.97% uptime for mission-critical agent coordination.",
      details: [
        "< 10ms average response time",
        "99.97% uptime SLA",
        "Global edge network",
        "Automatic failover and recovery"
      ]
    },
    {
      icon: <Shield className="text-purple-400" size={32} />,
      title: "Enterprise Security",
      description: "HIPAA-ready architecture with end-to-end encryption and comprehensive audit logging.",
      details: [
        "End-to-end encryption (AES-256)",
        "HIPAA-ready compliance",
        "SOC 2 design standards",
        "Comprehensive audit trails"
      ]
    }
  ];

  const advancedFeatures = [
    {
      icon: <Database className="text-cyan-400" size={24} />,
      title: "Economic Infrastructure",
      description: "Built-in micropayment and reputation systems for agent-to-agent commerce",
      capabilities: ["Micropayment processing", "Reputation scoring", "Transaction history", "Economic incentives"]
    },
    {
      icon: <Cpu className="text-orange-400" size={24} />,
      title: "Intelligent Routing",
      description: "Smart agent discovery and load balancing for optimal performance",
      capabilities: ["Agent discovery", "Load balancing", "Performance optimization", "Capacity planning"]
    },
    {
      icon: <Lock className="text-red-400" size={24} />,
      title: "Access Control",
      description: "Granular permissions and role-based access for enterprise security",
      capabilities: ["Role-based access", "API key management", "Permission granularity", "Security policies"]
    },
    {
      icon: <BarChart3 className="text-indigo-400" size={24} />,
      title: "Analytics & Monitoring",
      description: "Real-time insights into agent performance and coordination patterns",
      capabilities: ["Performance metrics", "Usage analytics", "Error tracking", "Custom dashboards"]
    },
    {
      icon: <Webhook className="text-pink-400" size={24} />,
      title: "Webhook Integration",
      description: "Real-time event notifications and third-party system integration",
      capabilities: ["Event notifications", "Custom webhooks", "Integration APIs", "Event filtering"]
    },
    {
      icon: <GitBranch className="text-teal-400" size={24} />,
      title: "Version Management",
      description: "Agent versioning, deployment, and rollback capabilities",
      capabilities: ["Version control", "Deployment automation", "Rollback support", "Environment management"]
    }
  ];

  const industryFeatures = [
    {
      industry: "Healthcare",
      icon: "🏥",
      title: "HIPAA-Compliant Coordination",
      description: "Secure patient data handling with full audit trails and compliance reporting",
      features: ["PHI encryption", "Audit logging", "Compliance reporting", "Access controls"]
    },
    {
      industry: "Financial Services",
      icon: "🏦",
      title: "Ultra-Low Latency Trading",
      description: "Sub-millisecond coordination for high-frequency trading and risk management",
      features: ["Sub-ms latency", "Risk management", "Regulatory compliance", "Transaction integrity"]
    },
    {
      industry: "Manufacturing",
      icon: "🏭",
      title: "Industrial IoT Integration",
      description: "Real-time coordination of manufacturing agents and quality control systems",
      features: ["IoT connectivity", "Quality control", "Predictive maintenance", "Supply chain optimization"]
    },
    {
      industry: "Customer Service",
      icon: "🎧",
      title: "Multi-Channel Support",
      description: "Coordinate support agents across chat, email, phone, and social media",
      features: ["Omnichannel routing", "Escalation management", "Knowledge sharing", "Performance tracking"]
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
                height: '48px',
                width: 'auto',
                cursor: 'pointer'
              }}
              onClick={onBackToHome}
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

      {/* Hero Section */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: 'var(--brikk-white)',
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Platform <span style={{ 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Features</span>
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Comprehensive capabilities designed for enterprise-scale AI agent coordination. 
            From real-time communication to economic infrastructure, Brikk provides everything 
            you need to build the future of autonomous systems.
          </p>
        </div>

        {/* Core Features */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--brikk-white)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Core Platform Capabilities
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '2rem'
          }}>
            {coreFeatures.map((feature, index) => (
              <div key={index} style={{
                background: 'var(--brikk-card-bg)',
                border: '1px solid var(--brikk-border)',
                borderRadius: '16px',
                padding: '2rem',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--brikk-border)';
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  {feature.icon}
                </div>
                
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--brikk-white)',
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--brikk-slate-text)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  {feature.description}
                </p>
                
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      fontSize: '0.9rem',
                      color: 'var(--brikk-slate-text)'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                      }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Features */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--brikk-white)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Advanced Capabilities
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {advancedFeatures.map((feature, index) => (
              <div key={index} style={{
                background: 'var(--brikk-card-bg)',
                border: '1px solid var(--brikk-border)',
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: 'var(--brikk-white)',
                    margin: 0
                  }}>
                    {feature.title}
                  </h3>
                </div>
                
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--brikk-slate-text)',
                  lineHeight: 1.5,
                  marginBottom: '1rem'
                }}>
                  {feature.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {feature.capabilities.map((capability, capIndex) => (
                    <span key={capIndex} style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '6px',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      color: 'var(--brikk-slate-text)'
                    }}>
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry-Specific Features */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--brikk-white)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Industry-Specific Solutions
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {industryFeatures.map((industry, index) => (
              <div key={index} style={{
                background: 'var(--brikk-card-bg)',
                border: '1px solid var(--brikk-border)',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {industry.icon}
                </div>
                
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--brikk-slate-text)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem'
                }}>
                  {industry.industry}
                </div>
                
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: 'var(--brikk-white)',
                  marginBottom: '1rem'
                }}>
                  {industry.title}
                </h3>
                
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--brikk-slate-text)',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem'
                }}>
                  {industry.description}
                </p>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem'
                }}>
                  {industry.features.map((feature, featureIndex) => (
                    <div key={featureIndex} style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      borderRadius: '6px',
                      padding: '0.5rem',
                      fontSize: '0.75rem',
                      color: 'var(--brikk-slate-text)'
                    }}>
                      {feature}
                    </div>
                  ))}
                </div>
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
            Ready to Build the Future?
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            Start with 1,000 free API calls and experience the power of universal AI agent coordination.
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
              onClick={() => onNavigate('pricing')}
              style={{
                background: 'transparent',
                border: '1px solid var(--brikk-border)',
                borderRadius: '12px',
                padding: '1rem 2rem',
                color: 'var(--brikk-white)',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
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
              View Pricing
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturesPage;

