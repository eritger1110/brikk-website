import React from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  MessageCircle, 
  Github, 
  BarChart3, 
  ExternalLink,
  Download,
  Play,
  Code,
  Users,
  Lightbulb,
  FileText,
  Video,
  Headphones,
  Calendar,
  Zap,
  Shield,
  Globe,
  Cpu,
  Network,
  Database,
  Cloud
} from 'lucide-react';
import BrikkLogo from '../assets/BrikkLogo.webp';

const ResourcesPage = ({ onBackToHome, onNavigate }) => {
  const resourceCategories = [
    {
      id: 'documentation',
      title: 'Documentation',
      description: 'Comprehensive guides, API references, and technical documentation',
      icon: <BookOpen className="text-blue-400" size={32} />,
      resources: [
        {
          title: 'Getting Started Guide',
          description: 'Complete walkthrough for new developers',
          type: 'Guide',
          url: 'https://docs.getbrikk.com/getting-started',
          icon: <Play className="text-green-400" size={20} />,
          external: true
        },
        {
          title: 'API Reference',
          description: 'Complete API documentation with examples',
          type: 'Documentation',
          url: 'https://docs.getbrikk.com/api',
          icon: <Code className="text-purple-400" size={20} />,
          external: true
        },
        {
          title: 'Universal Coordination Protocol',
          description: 'Technical specification for agent coordination',
          type: 'Specification',
          url: 'https://docs.getbrikk.com/ucp',
          icon: <Network className="text-orange-400" size={20} />,
          external: true
        },
        {
          title: 'Security Architecture',
          description: 'Enterprise security design and compliance',
          type: 'Architecture',
          url: 'https://docs.getbrikk.com/security',
          icon: <Shield className="text-red-400" size={20} />,
          external: true
        }
      ]
    },
    {
      id: 'tutorials',
      title: 'Tutorials & Examples',
      description: 'Step-by-step tutorials and code examples for all programming languages',
      icon: <Code className="text-green-400" size={32} />,
      resources: [
        {
          title: 'Python Agent Coordination',
          description: 'Build your first coordinated AI agents in Python',
          type: 'Tutorial',
          url: 'https://github.com/brikk-ai/examples/tree/main/python',
          icon: <Code className="text-blue-400" size={20} />,
          external: true
        },
        {
          title: 'Node.js Integration',
          description: 'Integrate Brikk with your Node.js applications',
          type: 'Tutorial',
          url: 'https://github.com/brikk-ai/examples/tree/main/nodejs',
          icon: <Code className="text-green-400" size={20} />,
          external: true
        },
        {
          title: 'Healthcare Use Case',
          description: 'HIPAA-compliant diagnostic agent coordination',
          type: 'Example',
          url: 'https://github.com/brikk-ai/examples/tree/main/healthcare',
          icon: <Building2 className="text-red-400" size={20} />,
          external: true
        },
        {
          title: 'Financial Trading Bots',
          description: 'Ultra-low latency trading agent coordination',
          type: 'Example',
          url: 'https://github.com/brikk-ai/examples/tree/main/finance',
          icon: <TrendingUp className="text-yellow-400" size={20} />,
          external: true
        }
      ]
    },
    {
      id: 'community',
      title: 'Community & Support',
      description: 'Connect with developers, get help, and share knowledge',
      icon: <Users className="text-purple-400" size={32} />,
      resources: [
        {
          title: 'Discord Community',
          description: 'Join 500+ developers building with Brikk',
          type: 'Community',
          url: 'https://discord.gg/brikk',
          icon: <MessageCircle className="text-indigo-400" size={20} />,
          external: true,
          stats: '500+ members'
        },
        {
          title: 'GitHub Discussions',
          description: 'Technical discussions and feature requests',
          type: 'Forum',
          url: 'https://github.com/brikk-ai/community/discussions',
          icon: <Github className="text-gray-400" size={20} />,
          external: true,
          stats: '1,247 stars'
        },
        {
          title: 'Stack Overflow',
          description: 'Get help with technical questions',
          type: 'Q&A',
          url: 'https://stackoverflow.com/questions/tagged/brikk',
          icon: <Lightbulb className="text-orange-400" size={20} />,
          external: true
        },
        {
          title: 'Developer Newsletter',
          description: 'Weekly updates on new features and best practices',
          type: 'Newsletter',
          url: 'https://newsletter.getbrikk.com',
          icon: <FileText className="text-blue-400" size={20} />,
          external: true
        }
      ]
    },
    {
      id: 'learning',
      title: 'Learning Resources',
      description: 'Educational content about AI agent coordination and industry trends',
      icon: <Lightbulb className="text-yellow-400" size={32} />,
      resources: [
        {
          title: 'AI Agent Coordination Fundamentals',
          description: 'Understanding the basics of multi-agent systems',
          type: 'Article',
          url: 'https://blog.getbrikk.com/fundamentals',
          icon: <BookOpen className="text-blue-400" size={20} />,
          external: true
        },
        {
          title: 'The Future of AI Agents',
          description: 'Industry trends and predictions for 2024-2030',
          type: 'Whitepaper',
          url: 'https://resources.getbrikk.com/future-of-ai-agents',
          icon: <FileText className="text-purple-400" size={20} />,
          external: true
        },
        {
          title: 'Enterprise AI Architecture',
          description: 'Best practices for scaling AI systems',
          type: 'Guide',
          url: 'https://blog.getbrikk.com/enterprise-architecture',
          icon: <Cloud className="text-green-400" size={20} />,
          external: true
        },
        {
          title: 'Multi-Agent Economics',
          description: 'Economic models for AI agent marketplaces',
          type: 'Research',
          url: 'https://research.getbrikk.com/agent-economics',
          icon: <BarChart3 className="text-yellow-400" size={20} />,
          external: true
        }
      ]
    },
    {
      id: 'tools',
      title: 'Developer Tools',
      description: 'SDKs, CLI tools, and development utilities',
      icon: <Cpu className="text-orange-400" size={32} />,
      resources: [
        {
          title: 'Brikk CLI',
          description: 'Command-line interface for agent management',
          type: 'Tool',
          url: 'https://github.com/brikk-ai/cli',
          icon: <Download className="text-green-400" size={20} />,
          external: true
        },
        {
          title: 'Python SDK',
          description: 'Official Python library for Brikk integration',
          type: 'SDK',
          url: 'https://pypi.org/project/brikk/',
          icon: <Code className="text-blue-400" size={20} />,
          external: true
        },
        {
          title: 'Node.js SDK',
          description: 'Official Node.js library for Brikk integration',
          type: 'SDK',
          url: 'https://www.npmjs.com/package/brikk',
          icon: <Code className="text-green-400" size={20} />,
          external: true
        },
        {
          title: 'Monitoring Dashboard',
          description: 'Real-time agent coordination monitoring',
          type: 'Tool',
          url: 'https://dashboard.getbrikk.com',
          icon: <BarChart3 className="text-purple-400" size={20} />,
          external: true
        }
      ]
    },
    {
      id: 'media',
      title: 'Videos & Podcasts',
      description: 'Visual learning content and industry discussions',
      icon: <Video className="text-red-400" size={32} />,
      resources: [
        {
          title: 'Brikk Platform Overview',
          description: '10-minute introduction to AI agent coordination',
          type: 'Video',
          url: 'https://youtube.com/watch?v=brikk-overview',
          icon: <Play className="text-red-400" size={20} />,
          external: true,
          duration: '10 min'
        },
        {
          title: 'Building Your First Agent',
          description: 'Step-by-step video tutorial',
          type: 'Tutorial',
          url: 'https://youtube.com/watch?v=first-agent',
          icon: <Video className="text-blue-400" size={20} />,
          external: true,
          duration: '25 min'
        },
        {
          title: 'AI Coordination Podcast',
          description: 'Weekly discussions on AI agent trends',
          type: 'Podcast',
          url: 'https://podcast.getbrikk.com',
          icon: <Headphones className="text-purple-400" size={20} />,
          external: true
        },
        {
          title: 'Enterprise Case Studies',
          description: 'Real-world implementation stories',
          type: 'Webinar',
          url: 'https://webinars.getbrikk.com/case-studies',
          icon: <Users className="text-green-400" size={20} />,
          external: true
        }
      ]
    }
  ];

  const upcomingEvents = [
    {
      title: 'AI Agent Coordination Summit 2024',
      date: 'March 15-16, 2024',
      location: 'San Francisco, CA',
      type: 'Conference',
      url: 'https://summit.getbrikk.com',
      description: 'Join 500+ developers and industry leaders'
    },
    {
      title: 'Healthcare AI Coordination Workshop',
      date: 'April 8, 2024',
      location: 'Virtual',
      type: 'Workshop',
      url: 'https://workshops.getbrikk.com/healthcare',
      description: 'HIPAA-compliant agent coordination'
    },
    {
      title: 'Financial Services Webinar',
      date: 'April 22, 2024',
      location: 'Virtual',
      type: 'Webinar',
      url: 'https://webinars.getbrikk.com/finance',
      description: 'Ultra-low latency trading coordination'
    }
  ];

  const industryInsights = [
    {
      title: 'The $50 Billion AI Agent Market',
      description: 'Market analysis and growth projections for AI agent coordination',
      source: 'McKinsey Global Institute',
      url: 'https://mckinsey.com/ai-agent-market-2024',
      type: 'Market Research'
    },
    {
      title: 'Enterprise AI Adoption Trends',
      description: '75% of Fortune 500 companies plan multi-agent deployments by 2026',
      source: 'Gartner Research',
      url: 'https://gartner.com/enterprise-ai-trends',
      type: 'Industry Report'
    },
    {
      title: 'AI Coordination Standards',
      description: 'Emerging standards for multi-agent system interoperability',
      source: 'IEEE Standards Association',
      url: 'https://ieee.org/ai-coordination-standards',
      type: 'Technical Standard'
    },
    {
      title: 'Healthcare AI Regulations',
      description: 'FDA guidance on AI agent coordination in medical devices',
      source: 'FDA Digital Health Center',
      url: 'https://fda.gov/ai-coordination-guidance',
      type: 'Regulatory Guidance'
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
            Developer <span style={{ 
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Resources</span>
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Everything you need to build, deploy, and scale AI agent coordination systems. 
            From comprehensive documentation to community support and industry insights.
          </p>
        </div>

        {/* Resource Categories */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {resourceCategories.map((category) => (
              <div key={category.id} style={{
                background: 'var(--brikk-card-bg)',
                border: '1px solid var(--brikk-border)',
                borderRadius: '20px',
                padding: '2rem',
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {category.icon}
                  <div>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: 'var(--brikk-white)',
                      margin: 0,
                      marginBottom: '0.25rem'
                    }}>
                      {category.title}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--brikk-slate-text)',
                      margin: 0
                    }}>
                      {category.description}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {category.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target={resource.external ? '_blank' : '_self'}
                      rel={resource.external ? 'noopener noreferrer' : ''}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        background: 'rgba(15, 23, 42, 0.5)',
                        border: '1px solid var(--brikk-border)',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)';
                        e.currentTarget.style.borderColor = 'var(--brikk-border)';
                      }}
                    >
                      <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: '8px',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {resource.icon}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.25rem'
                        }}>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: 'var(--brikk-white)',
                            margin: 0
                          }}>
                            {resource.title}
                          </h4>
                          <span style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '4px',
                            padding: '0.125rem 0.5rem',
                            fontSize: '0.7rem',
                            color: 'var(--brikk-slate-text)'
                          }}>
                            {resource.type}
                          </span>
                          {resource.stats && (
                            <span style={{
                              background: 'rgba(139, 92, 246, 0.1)',
                              border: '1px solid rgba(139, 92, 246, 0.2)',
                              borderRadius: '4px',
                              padding: '0.125rem 0.5rem',
                              fontSize: '0.7rem',
                              color: 'var(--brikk-slate-text)'
                            }}>
                              {resource.stats}
                            </span>
                          )}
                          {resource.duration && (
                            <span style={{
                              background: 'rgba(245, 158, 11, 0.1)',
                              border: '1px solid rgba(245, 158, 11, 0.2)',
                              borderRadius: '4px',
                              padding: '0.125rem 0.5rem',
                              fontSize: '0.7rem',
                              color: 'var(--brikk-slate-text)'
                            }}>
                              {resource.duration}
                            </span>
                          )}
                        </div>
                        <p style={{
                          fontSize: '0.85rem',
                          color: 'var(--brikk-slate-text)',
                          margin: 0
                        }}>
                          {resource.description}
                        </p>
                      </div>
                      
                      {resource.external && (
                        <ExternalLink size={16} style={{ color: 'var(--brikk-slate-text)' }} />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--brikk-white)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Upcoming Events
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {upcomingEvents.map((event, index) => (
              <div key={index} style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '16px',
                padding: '2rem',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <Calendar size={24} style={{ color: '#3b82f6' }} />
                  <span style={{
                    background: 'rgba(59, 130, 246, 0.2)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.8rem',
                    color: 'var(--brikk-white)',
                    fontWeight: '500'
                  }}>
                    {event.type}
                  </span>
                </div>
                
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: 'var(--brikk-white)',
                  marginBottom: '0.5rem'
                }}>
                  {event.title}
                </h3>
                
                <div style={{
                  fontSize: '0.9rem',
                  color: 'var(--brikk-slate-text)',
                  marginBottom: '0.5rem'
                }}>
                  <strong>{event.date}</strong> • {event.location}
                </div>
                
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--brikk-slate-text)',
                  marginBottom: '1.5rem'
                }}>
                  {event.description}
                </p>
                
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Register Now
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Insights */}
        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '600',
            color: 'var(--brikk-white)',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Industry Insights & Research
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {industryInsights.map((insight, index) => (
              <a
                key={index}
                href={insight.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: 'var(--brikk-card-bg)',
                  border: '1px solid var(--brikk-border)',
                  borderRadius: '16px',
                  padding: '2rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--brikk-border)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.75rem',
                    fontSize: '0.8rem',
                    color: 'var(--brikk-slate-text)',
                    fontWeight: '500'
                  }}>
                    {insight.type}
                  </span>
                  <ExternalLink size={16} style={{ color: 'var(--brikk-slate-text)' }} />
                </div>
                
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: 'var(--brikk-white)',
                  marginBottom: '0.75rem'
                }}>
                  {insight.title}
                </h3>
                
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--brikk-slate-text)',
                  lineHeight: 1.5,
                  marginBottom: '1rem'
                }}>
                  {insight.description}
                </p>
                
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--brikk-slate-text)',
                  fontStyle: 'italic'
                }}>
                  Source: {insight.source}
                </div>
              </a>
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
            Ready to Start Building?
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--brikk-slate-text)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            Join the developer community building the future of AI agent coordination. 
            Start with our comprehensive documentation and free tier.
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
            
            <a
              href="https://docs.getbrikk.com"
              target="_blank"
              rel="noopener noreferrer"
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
                gap: '0.5rem',
                textDecoration: 'none'
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
              <BookOpen size={20} />
              View Documentation
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResourcesPage;

