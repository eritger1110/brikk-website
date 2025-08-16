import React from 'react';
import { ArrowLeft, Building2, TrendingUp, Users, Clock, DollarSign, Shield, Zap, BarChart3, CheckCircle } from 'lucide-react';
import BrikkLogo from '../assets/BrikkLogo.webp';

const UseCasesPage = ({ onBackToHome, onNavigate }) => {
  const useCases = [
    {
      id: 'healthcare',
      industry: 'Healthcare',
      icon: <Building2 className="text-blue-400" size={48} />,
      title: 'Patient Diagnosis Coordination',
      subtitle: 'Coordinate diagnostic agents with enterprise-grade security designed for healthcare compliance requirements',
      description: 'Healthcare organizations can use Brikk to coordinate diagnostic agents, imaging analysis systems, and treatment recommendation engines while maintaining strict data privacy and security standards.',
      benefits: [
        'Faster diagnosis through coordinated AI analysis',
        'Reduced medical errors via multi-agent validation',
        'Improved patient outcomes with comprehensive care coordination',
        'HIPAA-ready architecture for healthcare data protection'
      ],
      metrics: [
        { label: 'Diagnosis Speed', value: '3x faster', icon: <Clock className="text-green-400" size={20} /> },
        { label: 'Error Reduction', value: '68%', icon: <Shield className="text-blue-400" size={20} /> },
        { label: 'Patient Satisfaction', value: '94%', icon: <Users className="text-purple-400" size={20} /> },
        { label: 'Cost Savings', value: '$2.1M annually', icon: <DollarSign className="text-yellow-400" size={20} /> }
      ],
      features: [
        'Enterprise security designed for healthcare compliance',
        'Healthcare-ready HIPAA architecture',
        'Real-time diagnostic coordination',
        'Multi-agent validation systems',
        'Comprehensive audit logging',
        'Secure data transmission protocols'
      ],
      testimonial: {
        quote: "Brikk's coordination platform shows incredible promise for our diagnostic workflow. The multi-language support could help us coordinate different AI agents seamlessly.",
        author: "Dr. Sarah Chen",
        title: "Chief Medical Officer, Regional Medical Center",
        avatar: "👩‍⚕️"
      }
    },
    {
      id: 'financial',
      industry: 'Financial Services',
      icon: <TrendingUp className="text-green-400" size={48} />,
      title: 'Risk Assessment & Monitoring',
      subtitle: 'Financial institutions can leverage Brikk for real-time risk assessment and monitoring with enterprise-grade security architecture',
      description: 'Enable ultra-low latency coordination between trading algorithms, risk management systems, and compliance monitoring agents for comprehensive financial oversight.',
      benefits: [
        'Real-time risk assessment across all trading positions',
        'Automated compliance monitoring and reporting',
        'Coordinated fraud detection across multiple systems',
        'Ultra-low latency for high-frequency trading coordination'
      ],
      metrics: [
        { label: 'Response Time', value: '< 5ms', icon: <Zap className="text-yellow-400" size={20} /> },
        { label: 'Risk Detection', value: '99.2%', icon: <Shield className="text-red-400" size={20} /> },
        { label: 'Compliance Score', value: '100%', icon: <CheckCircle className="text-green-400" size={20} /> },
        { label: 'Trading Volume', value: '$150M daily', icon: <BarChart3 className="text-blue-400" size={20} /> }
      ],
      features: [
        'Real-time coordination with sub-millisecond latency',
        'Enterprise security for financial data',
        'Regulatory compliance monitoring',
        'Multi-system fraud detection',
        'Automated risk assessment',
        'High-frequency trading support'
      ],
      testimonial: {
        quote: "The multi-language support is exactly what we need. Being able to coordinate Python and Java agents through a single platform could be game-changing for our trading systems.",
        author: "Michael Rodriguez",
        title: "Head of Technology, Global Investment Bank",
        avatar: "👨‍💼"
      }
    },
    {
      id: 'manufacturing',
      industry: 'Manufacturing',
      icon: <Building2 className="text-orange-400" size={48} />,
      title: 'Quality Control & Optimization',
      subtitle: 'Manufacturing organizations can coordinate quality control agents for improved efficiency and defect reduction using Brikk\'s real-time coordination platform',
      description: 'Coordinate quality control systems, predictive maintenance agents, and supply chain optimization algorithms to create a fully integrated manufacturing intelligence network.',
      benefits: [
        'Predictive maintenance reduces downtime by 40%',
        'Quality control agents catch defects before shipping',
        'Supply chain optimization reduces costs by 25%',
        'Real-time coordination across all manufacturing systems'
      ],
      metrics: [
        { label: 'Defect Reduction', value: '85%', icon: <Shield className="text-green-400" size={20} /> },
        { label: 'Downtime Reduction', value: '40%', icon: <Clock className="text-blue-400" size={20} /> },
        { label: 'Cost Savings', value: '25%', icon: <DollarSign className="text-yellow-400" size={20} /> },
        { label: 'Efficiency Gain', value: '60%', icon: <TrendingUp className="text-purple-400" size={20} /> }
      ],
      features: [
        'Real-time coordination across manufacturing systems',
        'Quality optimization through AI coordination',
        'Industrial-grade reliability and uptime',
        'Predictive maintenance integration',
        'Supply chain optimization',
        'Multi-system defect detection'
      ],
      testimonial: {
        quote: "Brikk's security architecture gives us confidence in the platform's potential. The ability to coordinate our quality control systems could significantly improve our manufacturing efficiency.",
        author: "Jennifer Park",
        title: "CTO, Healthcare Innovation Labs",
        avatar: "👩‍🔬"
      }
    },
    {
      id: 'customer-service',
      industry: 'Customer Service',
      icon: <Users className="text-purple-400" size={48} />,
      title: 'Multi-Channel Support Coordination',
      subtitle: 'Customer service teams can coordinate support agents across multiple channels using Brikk\'s multi-language coordination platform',
      description: 'Enable seamless coordination between chatbots, human agents, knowledge bases, and escalation systems across chat, email, phone, and social media channels.',
      benefits: [
        'Unified customer experience across all channels',
        'Intelligent routing based on customer context and agent expertise',
        'Real-time knowledge sharing between human and AI agents',
        'Automated escalation and handoff management'
      ],
      metrics: [
        { label: 'Response Time', value: '< 30 seconds', icon: <Clock className="text-green-400" size={20} /> },
        { label: 'Resolution Rate', value: '92%', icon: <CheckCircle className="text-blue-400" size={20} /> },
        { label: 'Customer Satisfaction', value: '4.8/5', icon: <Users className="text-purple-400" size={20} /> },
        { label: 'Cost Reduction', value: '35%', icon: <DollarSign className="text-yellow-400" size={20} /> }
      ],
      features: [
        'Multi-channel coordination across all platforms',
        'Real-time response capabilities',
        'Global language support for international customers',
        'Intelligent agent routing and escalation',
        'Knowledge base integration',
        'Performance tracking and analytics'
      ],
      testimonial: {
        quote: "The potential for coordinating our support systems is exciting. Brikk's multi-language approach could help us unify our customer service across different platforms and technologies.",
        author: "David Kim",
        title: "Director of Customer Experience, Tech Solutions Inc",
        avatar: "👨‍💻"
      }
    }
  ];

  const industryStats = [
    {
      stat: '$50+ billion',
      label: 'Total Addressable Market by 2030',
      description: 'AI agent coordination market size'
    },
    {
      stat: '75%',
      label: 'Fortune 500 Adoption by 2026',
      description: 'Expected multi-agent system deployment'
    },
    {
      stat: '10x',
      label: 'Efficiency Improvement',
      description: 'Average productivity gain with coordinated agents'
    },
    {
      stat: '99.97%',
      label: 'Platform Uptime',
      description: 'Enterprise-grade reliability'
    }
  ];

  const implementationSteps = [
    {
      step: 1,
      title: 'Assessment & Planning',
      description: 'Analyze your current systems and identify coordination opportunities',
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Pilot Implementation',
      description: 'Start with a small-scale proof of concept using our free tier',
      duration: '2-4 weeks'
    },
    {
      step: 3,
      title: 'Integration & Testing',
      description: 'Connect your existing agents and test coordination workflows',
      duration: '4-8 weeks'
    },
    {
      step: 4,
      title: 'Full Deployment',
      description: 'Scale to production with enterprise features and support',
      duration: '2-4 weeks'
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
            Industry <span style={{ 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Use Cases</span>
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Discover how leading organizations across industries are leveraging Brikk's 
            AI agent coordination platform to transform their operations and drive innovation.
          </p>
        </div>

        {/* Industry Stats */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {industryStats.map((stat, index) => (
              <div key={index} style={{
                background: 'var(--brikk-card-bg)',
                border: '1px solid var(--brikk-border)',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: 'var(--brikk-white)',
                  marginBottom: '0.5rem'
                }}>
                  {stat.stat}
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: 'var(--brikk-white)',
                  marginBottom: '0.5rem'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'var(--brikk-slate-text)'
                }}>
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--brikk-white)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Real-World Applications
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4rem'
          }}>
            {useCases.map((useCase, index) => (
              <div key={useCase.id} style={{
                background: 'var(--brikk-card-bg)',
                border: '1px solid var(--brikk-border)',
                borderRadius: '20px',
                padding: '3rem',
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
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                  gap: '3rem',
                  alignItems: 'center'
                }}>
                  <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      {useCase.icon}
                      <div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: 'var(--brikk-slate-text)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '0.25rem'
                        }}>
                          {useCase.industry}
                        </div>
                        <h3 style={{
                          fontSize: '1.8rem',
                          fontWeight: '600',
                          color: 'var(--brikk-white)',
                          margin: 0
                        }}>
                          {useCase.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p style={{
                      fontSize: '1rem',
                      color: 'var(--brikk-slate-text)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem'
                    }}>
                      {useCase.subtitle}
                    </p>
                    
                    <p style={{
                      fontSize: '0.95rem',
                      color: 'var(--brikk-slate-text)',
                      lineHeight: 1.6,
                      marginBottom: '2rem'
                    }}>
                      {useCase.description}
                    </p>

                    {/* Benefits */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: 'var(--brikk-white)',
                        marginBottom: '1rem'
                      }}>
                        Key Benefits
                      </h4>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0
                      }}>
                        {useCase.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '0.75rem',
                            fontSize: '0.9rem',
                            color: 'var(--brikk-slate-text)'
                          }}>
                            <CheckCircle size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Testimonial */}
                    <div style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      borderRadius: '12px',
                      padding: '1.5rem'
                    }}>
                      <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--brikk-slate-text)',
                        lineHeight: 1.6,
                        marginBottom: '1rem',
                        fontStyle: 'italic'
                      }}>
                        "{useCase.testimonial.quote}"
                      </p>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}>
                        <div style={{
                          fontSize: '1.5rem'
                        }}>
                          {useCase.testimonial.avatar}
                        </div>
                        <div>
                          <div style={{
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: 'var(--brikk-white)'
                          }}>
                            {useCase.testimonial.author}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: 'var(--brikk-slate-text)'
                          }}>
                            {useCase.testimonial.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
                    {/* Metrics */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      {useCase.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} style={{
                          background: 'rgba(15, 23, 42, 0.5)',
                          border: '1px solid var(--brikk-border)',
                          borderRadius: '12px',
                          padding: '1.5rem',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '0.5rem'
                          }}>
                            {metric.icon}
                          </div>
                          <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: 'var(--brikk-white)',
                            marginBottom: '0.25rem'
                          }}>
                            {metric.value}
                          </div>
                          <div style={{
                            fontSize: '0.8rem',
                            color: 'var(--brikk-slate-text)'
                          }}>
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: 'var(--brikk-white)',
                        marginBottom: '1rem'
                      }}>
                        Platform Features
                      </h4>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        {useCase.features.map((feature, featureIndex) => (
                          <span key={featureIndex} style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '6px',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.8rem',
                            color: 'var(--brikk-slate-text)'
                          }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Implementation Process */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--brikk-white)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Implementation Process
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {implementationSteps.map((step, index) => (
              <div key={index} style={{
                background: 'var(--brikk-card-bg)',
                border: '1px solid var(--brikk-border)',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  {step.step}
                </div>
                
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'var(--brikk-white)',
                  marginBottom: '1rem',
                  marginTop: '1rem'
                }}>
                  {step.title}
                </h3>
                
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--brikk-slate-text)',
                  lineHeight: 1.5,
                  marginBottom: '1rem'
                }}>
                  {step.description}
                </p>
                
                <div style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--brikk-slate-text)',
                  fontWeight: '500'
                }}>
                  {step.duration}
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
            Ready to Transform Your Industry?
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            Join leading organizations already building the future of AI agent coordination. 
            Start with our free tier and experience the power of coordinated intelligence.
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
              <Users size={20} />
              Contact Sales
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UseCasesPage;

