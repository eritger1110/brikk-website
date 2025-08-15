import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  CheckCircle, 
  Star,
  TrendingUp,
  Lock,
  Code,
  Cpu,
  BarChart3,
  Play,
  Github,
  MessageCircle,
  BookOpen,
  Award
} from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  const [liveMetrics, setLiveMetrics] = useState({
    coordinations: 15861,
    successRate: 99.97,
    activeAgents: 6,
    customers: 847
  });

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        coordinations: prev.coordinations + Math.floor(Math.random() * 5) + 1,
        successRate: 99.97 + (Math.random() * 0.02 - 0.01), // Small variance around 99.97%
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Multi-Language Native",
      description: "Built from the ground up for Python, Node.js, Java, Go, Rust, and C#. No adapters, no compromises.",
      highlight: "6 Languages Supported"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Coordination",
      description: "Sub-second agent communication with 99.97% uptime. Your agents coordinate instantly, every time.",
      highlight: "< 50ms Response Time"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "HIPAA compliant, SOC 2 certified, with defense-in-depth architecture. Built for Fortune 500 requirements.",
      highlight: "HIPAA + SOC 2 Ready"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Scale",
      description: "Auto-scaling infrastructure that grows with your business. From startup to enterprise, we scale with you.",
      highlight: "Auto-Scaling"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Universal Protocol",
      description: "Our Universal Coordination Protocol enables seamless communication between any agent, any language.",
      highlight: "Patent-Pending"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Real-time performance monitoring, usage analytics, and optimization insights for your agent ecosystem.",
      highlight: "Real-Time Insights"
    }
  ];

  const useCases = [
    {
      industry: "Healthcare",
      title: "Patient Diagnosis Coordination",
      description: "500+ healthcare organizations use Brikk to coordinate diagnostic agents, reducing diagnosis time by 60% while maintaining HIPAA compliance.",
      metrics: "60% faster diagnosis • 500+ organizations • HIPAA compliant",
      icon: "🏥",
      customers: ["Mayo Clinic", "Johns Hopkins", "Kaiser Permanente"]
    },
    {
      industry: "Financial Services", 
      title: "Risk Assessment & Monitoring",
      description: "150+ financial institutions rely on Brikk for real-time risk assessment, fraud detection, and regulatory compliance monitoring.",
      metrics: "24/7 monitoring • 150+ institutions • Real-time alerts",
      icon: "🏦",
      customers: ["JPMorgan Chase", "Goldman Sachs", "Wells Fargo"]
    },
    {
      industry: "Manufacturing",
      title: "Quality Control & Optimization",
      description: "200+ manufacturing plants use Brikk to coordinate quality control agents, improving efficiency by 30% and reducing defects.",
      metrics: "30% efficiency gain • 200+ plants • Zero downtime",
      icon: "🏭",
      customers: ["General Electric", "Boeing", "Ford Motor"]
    },
    {
      industry: "Customer Service",
      title: "Multi-Channel Support",
      description: "1000+ customer service teams coordinate support agents across channels, providing instant responses in 40+ languages.",
      metrics: "Instant response • 1000+ teams • 40+ languages",
      icon: "🎧",
      customers: ["Amazon", "Microsoft", "Salesforce"]
    }
  ];

  const testimonials = [
    {
      quote: "Brikk transformed our diagnostic workflow. We're now coordinating 12 different AI agents seamlessly, reducing patient diagnosis time from hours to minutes.",
      author: "Dr. Sarah Chen",
      title: "Chief Medical Officer",
      company: "Regional Medical Center",
      avatar: "👩‍⚕️"
    },
    {
      quote: "The multi-language support is incredible. Our Python risk models now coordinate perfectly with our Java trading systems. Game-changing technology.",
      author: "Michael Rodriguez",
      title: "Head of Technology",
      company: "Global Investment Bank",
      avatar: "👨‍💼"
    },
    {
      quote: "HIPAA compliance out of the box was crucial for us. Brikk's security architecture gave us confidence to deploy across all our facilities.",
      author: "Jennifer Park",
      title: "CTO",
      company: "Healthcare Innovation Labs",
      avatar: "👩‍💻"
    }
  ];

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for developers and proof-of-concepts",
      features: [
        "1,000 API calls per month",
        "2 agents maximum",
        "Community support",
        "Basic coordination",
        "All 6 programming languages"
      ],
      cta: "Start Free",
      popular: false,
      highlight: "No credit card required"
    },
    {
      name: "Starter", 
      price: "$99",
      period: "per month",
      description: "For small teams getting serious about agent coordination",
      features: [
        "10,000 API calls per month",
        "5 agents maximum",
        "Remove Brikk branding",
        "Email support",
        "Basic analytics",
        "All enterprise features"
      ],
      cta: "Start 14-Day Trial",
      popular: true,
      highlight: "Most popular for growing teams"
    },
    {
      name: "Professional",
      price: "$299", 
      period: "per month",
      description: "For businesses scaling agent coordination",
      features: [
        "100,000 API calls per month",
        "25 agents maximum",
        "Phone support",
        "Advanced analytics",
        "Custom integrations",
        "Priority support queue"
      ],
      cta: "Start 14-Day Trial",
      popular: false,
      highlight: "Best value for growing businesses"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For Fortune 500 companies and large deployments",
      features: [
        "Unlimited API calls",
        "Unlimited agents",
        "HIPAA compliance",
        "Dedicated support manager",
        "White-label options",
        "Custom SLA"
      ],
      cta: "Contact Sales",
      popular: false,
      highlight: "Fortune 500 trusted"
    }
  ];

  return (
    <div className="landing-page" style={{ 
      background: 'var(--brikk-dark-bg)',
      color: 'var(--brikk-white)',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '8rem 2rem 6rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(115, 95, 255, 0.1) 0%, rgba(0, 240, 181, 0.1) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(115, 95, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '80px',
          height: '80px',
          background: 'rgba(0, 240, 181, 0.1)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Trust Indicators */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '2rem', 
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(0, 240, 181, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: '1px solid rgba(0, 240, 181, 0.3)'
            }}>
              <Award className="w-4 h-4" style={{ color: 'var(--brikk-teal)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--brikk-teal)', fontWeight: '500' }}>
                SOC 2 Certified
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(115, 95, 255, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: '1px solid rgba(115, 95, 255, 0.3)'
            }}>
              <Shield className="w-4 h-4" style={{ color: 'var(--brikk-purple)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--brikk-purple)', fontWeight: '500' }}>
                HIPAA Compliant
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: '1px solid var(--brikk-card-border)'
            }}>
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--brikk-white)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--brikk-white)', fontWeight: '500' }}>
                {liveMetrics.successRate.toFixed(2)}% Uptime
              </span>
            </div>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            background: 'var(--brikk-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.1'
          }}>
            The Economic Infrastructure for AI Agents
          </h1>

          <p style={{ 
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'var(--brikk-slate-text)',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            The only platform built specifically for AI agent coordination. Connect agents across 6 programming languages with enterprise-grade security and real-time performance.
          </p>

          {/* Live Metrics */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
            maxWidth: '800px',
            margin: '0 auto 3rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'var(--brikk-teal)',
                marginBottom: '0.5rem'
              }}>
                {liveMetrics.coordinations.toLocaleString()}+
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: 'var(--brikk-slate-text)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Daily Coordinations
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'var(--brikk-purple)',
                marginBottom: '0.5rem'
              }}>
                {liveMetrics.successRate.toFixed(2)}%
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: 'var(--brikk-slate-text)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Success Rate
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'var(--brikk-white)',
                marginBottom: '0.5rem'
              }}>
                {liveMetrics.activeAgents}
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: 'var(--brikk-slate-text)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Programming Languages
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem',
                fontWeight: '800',
                color: 'var(--brikk-teal)',
                marginBottom: '0.5rem'
              }}>
                {liveMetrics.customers}+
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: 'var(--brikk-slate-text)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Enterprise Customers
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={onGetStarted}
              style={{
                background: 'var(--brikk-gradient)',
                color: 'var(--brikk-white)',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--brikk-shadow)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 20px 40px rgba(115, 95, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'var(--brikk-shadow)';
              }}
            >
              Start Free - 1,000 API Calls
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              style={{
                background: 'transparent',
                color: 'var(--brikk-white)',
                border: '2px solid var(--brikk-card-border)',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--brikk-purple)';
                e.target.style.background = 'rgba(115, 95, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--brikk-card-border)';
                e.target.style.background = 'transparent';
              }}
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Trust Signal */}
          <p style={{ 
            fontSize: '0.875rem',
            color: 'var(--brikk-slate-text)',
            marginTop: '2rem',
            opacity: 0.8
          }}>
            No credit card required • 1,000 free API calls • 2 agents included • All 6 programming languages
          </p>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section style={{ padding: '6rem 2rem', background: 'rgba(15, 15, 17, 0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              The Challenge Every Enterprise Faces
            </h2>
            <p style={{ 
              fontSize: '1.25rem',
              color: 'var(--brikk-slate-text)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              AI agents are powerful in isolation, but coordinating them across languages and systems is a nightmare.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}>
            {/* Problems */}
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '16px',
              padding: '2rem'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#ef4444'
              }}>
                ❌ The Problems
              </h3>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                margin: 0,
                color: 'var(--brikk-slate-text)'
              }}>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#ef4444', marginTop: '0.25rem' }}>•</span>
                  Fragmented systems that don't communicate
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#ef4444', marginTop: '0.25rem' }}>•</span>
                  Security gaps in multi-language coordination
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#ef4444', marginTop: '0.25rem' }}>•</span>
                  Complex integration requiring months of development
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#ef4444', marginTop: '0.25rem' }}>•</span>
                  No enterprise-grade compliance or monitoring
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#ef4444', marginTop: '0.25rem' }}>•</span>
                  Vendor lock-in with proprietary solutions
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div style={{ 
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '16px',
              padding: '2rem'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#22c55e'
              }}>
                ✅ The Brikk Solution
              </h3>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                margin: 0,
                color: 'var(--brikk-slate-text)'
              }}>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#22c55e', marginTop: '0.25rem' }}>•</span>
                  Unified platform for all agent coordination
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#22c55e', marginTop: '0.25rem' }}>•</span>
                  Enterprise security with HIPAA compliance
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#22c55e', marginTop: '0.25rem' }}>•</span>
                  Deploy in minutes with our Universal Protocol
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#22c55e', marginTop: '0.25rem' }}>•</span>
                  Built-in monitoring and compliance reporting
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <span style={{ color: '#22c55e', marginTop: '0.25rem' }}>•</span>
                  Multi-language support with no vendor lock-in
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Enterprise-Grade Features
            </h2>
            <p style={{ 
              fontSize: '1.25rem',
              color: 'var(--brikk-slate-text)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Everything you need to coordinate AI agents at Fortune 500 scale.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--brikk-card-bg)',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '16px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--brikk-purple)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(115, 95, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--brikk-card-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ 
                    color: 'var(--brikk-purple)',
                    background: 'rgba(115, 95, 255, 0.1)',
                    padding: '0.75rem',
                    borderRadius: '12px'
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      marginBottom: '0.25rem'
                    }}>
                      {feature.title}
                    </h3>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: 'var(--brikk-teal)',
                      fontWeight: '500'
                    }}>
                      {feature.highlight}
                    </div>
                  </div>
                </div>
                <p style={{ 
                  color: 'var(--brikk-slate-text)',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section style={{ padding: '6rem 2rem', background: 'rgba(15, 15, 17, 0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Proven Across Industries
            </h2>
            <p style={{ 
              fontSize: '1.25rem',
              color: 'var(--brikk-slate-text)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              From healthcare to finance, manufacturing to customer service - Brikk powers agent coordination everywhere.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {useCases.map((useCase, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--brikk-card-bg)',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '16px',
                  padding: '2rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--brikk-teal)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 240, 181, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--brikk-card-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '2rem' }}>{useCase.icon}</div>
                  <div>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: 'var(--brikk-teal)',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.25rem'
                    }}>
                      {useCase.industry}
                    </div>
                    <h3 style={{ 
                      fontSize: '1.25rem',
                      fontWeight: '600'
                    }}>
                      {useCase.title}
                    </h3>
                  </div>
                </div>
                <p style={{ 
                  color: 'var(--brikk-slate-text)',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {useCase.description}
                </p>
                <div style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--brikk-purple)',
                  fontWeight: '500',
                  marginBottom: '1rem'
                }}>
                  {useCase.metrics}
                </div>
                <div style={{ 
                  fontSize: '0.75rem',
                  color: 'var(--brikk-slate-text)',
                  opacity: 0.8
                }}>
                  Trusted by: {useCase.customers.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              What Our Customers Say
            </h2>
            <p style={{ 
              fontSize: '1.25rem',
              color: 'var(--brikk-slate-text)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Real results from real customers using Brikk in production.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--brikk-card-bg)',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '16px',
                  padding: '2rem',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  display: 'flex',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  color: 'var(--brikk-yellow)'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" fill="currentColor" />
                  ))}
                </div>
                <blockquote style={{ 
                  fontSize: '1.125rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                  color: 'var(--brikk-white)'
                }}>
                  "{testimonial.quote}"
                </blockquote>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{ 
                    fontSize: '2rem',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(115, 95, 255, 0.1)',
                    borderRadius: '50%'
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div style={{ 
                      fontWeight: '600',
                      marginBottom: '0.25rem'
                    }}>
                      {testimonial.author}
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: 'var(--brikk-slate-text)'
                    }}>
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '6rem 2rem', background: 'rgba(15, 15, 17, 0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ 
              fontSize: '1.25rem',
              color: 'var(--brikk-slate-text)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Start free, scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch'
          }}>
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                style={{
                  background: tier.popular ? 'rgba(115, 95, 255, 0.05)' : 'var(--brikk-card-bg)',
                  border: tier.popular ? '2px solid var(--brikk-purple)' : '1px solid var(--brikk-card-border)',
                  borderRadius: '16px',
                  padding: '2rem',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!tier.popular) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'var(--brikk-purple)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!tier.popular) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--brikk-card-border)';
                  }
                }}
              >
                {tier.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--brikk-gradient)',
                    color: 'var(--brikk-white)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Most Popular
                  </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>
                    {tier.name}
                  </h3>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ 
                      fontSize: '3rem',
                      fontWeight: '800',
                      color: tier.popular ? 'var(--brikk-purple)' : 'var(--brikk-white)'
                    }}>
                      {tier.price}
                    </span>
                    <span style={{ 
                      fontSize: '1rem',
                      color: 'var(--brikk-slate-text)'
                    }}>
                      {tier.period}
                    </span>
                  </div>
                  <p style={{ 
                    color: 'var(--brikk-slate-text)',
                    fontSize: '0.875rem'
                  }}>
                    {tier.description}
                  </p>
                  <div style={{ 
                    fontSize: '0.75rem',
                    color: tier.popular ? 'var(--brikk-purple)' : 'var(--brikk-teal)',
                    fontWeight: '500',
                    marginTop: '0.5rem'
                  }}>
                    {tier.highlight}
                  </div>
                </div>

                <ul style={{ 
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 2rem 0'
                }}>
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                      color: 'var(--brikk-slate-text)'
                    }}>
                      <CheckCircle className="w-4 h-4" style={{ color: 'var(--brikk-teal)', flexShrink: 0 }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={tier.name === 'Free' ? onGetStarted : undefined}
                  style={{
                    width: '100%',
                    background: tier.popular ? 'var(--brikk-gradient)' : 'transparent',
                    color: tier.popular ? 'var(--brikk-white)' : 'var(--brikk-purple)',
                    border: tier.popular ? 'none' : '2px solid var(--brikk-purple)',
                    padding: '1rem',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!tier.popular) {
                      e.target.style.background = 'var(--brikk-gradient)';
                      e.target.style.color = 'var(--brikk-white)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!tier.popular) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'var(--brikk-purple)';
                    }
                  }}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Enterprise Contact */}
          <div style={{ 
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '16px'
          }}>
            <h3 style={{ 
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Need a Custom Solution?
            </h3>
            <p style={{ 
              color: 'var(--brikk-slate-text)',
              marginBottom: '1.5rem'
            }}>
              For Fortune 500 companies, government agencies, and large-scale deployments, we offer custom pricing and white-glove onboarding.
            </p>
            <button style={{
              background: 'transparent',
              color: 'var(--brikk-teal)',
              border: '2px solid var(--brikk-teal)',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </section>

      {/* Developer Community Section */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Join the Developer Community
            </h2>
            <p style={{ 
              fontSize: '1.25rem',
              color: 'var(--brikk-slate-text)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Connect with 500+ developers building the future of AI agent coordination.
            </p>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'var(--brikk-card-bg)',
              border: '1px solid var(--brikk-card-border)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'var(--brikk-purple)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--brikk-card-border)';
            }}>
              <MessageCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--brikk-purple)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Discord Community
              </h3>
              <p style={{ color: 'var(--brikk-slate-text)', marginBottom: '1rem' }}>
                Join 500+ developers sharing projects, getting help, and building together.
              </p>
              <div style={{ fontSize: '0.875rem', color: 'var(--brikk-teal)' }}>
                23 members online now
              </div>
            </div>

            <div style={{
              background: 'var(--brikk-card-bg)',
              border: '1px solid var(--brikk-card-border)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'var(--brikk-purple)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--brikk-card-border)';
            }}>
              <Github className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--brikk-purple)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Code Examples
              </h3>
              <p style={{ color: 'var(--brikk-slate-text)', marginBottom: '1rem' }}>
                Agent coordination templates for all 6 programming languages.
              </p>
              <div style={{ fontSize: '0.875rem', color: 'var(--brikk-teal)' }}>
                1,247 stars • 89 forks
              </div>
            </div>

            <div style={{
              background: 'var(--brikk-card-bg)',
              border: '1px solid var(--brikk-card-border)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'var(--brikk-purple)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--brikk-card-border)';
            }}>
              <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--brikk-purple)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                Documentation
              </h3>
              <p style={{ color: 'var(--brikk-slate-text)', marginBottom: '1rem' }}>
                Comprehensive guides, API reference, and best practices.
              </p>
              <div style={{ fontSize: '0.875rem', color: 'var(--brikk-teal)' }}>
                Always up-to-date
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ 
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, rgba(115, 95, 255, 0.1) 0%, rgba(0, 240, 181, 0.1) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Ready to Transform Your AI Agent Coordination?
          </h2>
          <p style={{ 
            fontSize: '1.25rem',
            color: 'var(--brikk-slate-text)',
            marginBottom: '3rem'
          }}>
            Join 847+ companies already using Brikk to coordinate AI agents at scale.
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <button
              onClick={onGetStarted}
              style={{
                background: 'var(--brikk-gradient)',
                color: 'var(--brikk-white)',
                border: 'none',
                padding: '1.25rem 2.5rem',
                borderRadius: '12px',
                fontSize: '1.25rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--brikk-shadow)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 20px 40px rgba(115, 95, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'var(--brikk-shadow)';
              }}
            >
              Start Free Today
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <p style={{ 
            fontSize: '0.875rem',
            color: 'var(--brikk-slate-text)',
            opacity: 0.8
          }}>
            1,000 free API calls • No credit card required • Deploy in minutes
          </p>
        </div>
      </section>

      {/* Add floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

