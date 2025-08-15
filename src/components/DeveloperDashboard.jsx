import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Zap, 
  Key, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Copy,
  Eye,
  EyeOff,
  Github,
  MessageCircle,
  BookOpen,
  Cpu,
  Globe,
  Shield,
  Crown,
  Sparkles
} from 'lucide-react';

const DeveloperDashboard = ({ user, onUpgrade, onLogout }) => {
  const [usage, setUsage] = useState({
    apiCalls: 847,
    apiLimit: 1000,
    agents: 2,
    agentLimit: 2,
    period: 'November 2024'
  });
  
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey] = useState('brikk_live_sk_1a2b3c4d5e6f7g8h9i0j');
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'coordination', message: 'Python agent coordinated with Node.js agent', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'deployment', message: 'New Java agent deployed successfully', time: '15 minutes ago', status: 'success' },
    { id: 3, type: 'coordination', message: 'Multi-agent workflow executed', time: '1 hour ago', status: 'success' },
    { id: 4, type: 'api_call', message: 'API rate limit warning (85% usage)', time: '2 hours ago', status: 'warning' }
  ]);

  const usagePercentage = (usage.apiCalls / usage.apiLimit) * 100;
  const agentUsagePercentage = (usage.agents / usage.agentLimit) * 100;

  const getUsageStatus = () => {
    if (usagePercentage >= 95) return { level: 'critical', color: '#ef4444', message: 'Critical - Upgrade needed!' };
    if (usagePercentage >= 90) return { level: 'high', color: '#f59e0b', message: 'High usage - Consider upgrading' };
    if (usagePercentage >= 75) return { level: 'medium', color: '#eab308', message: 'Growing fast!' };
    return { level: 'low', color: '#22c55e', message: 'You\'re all set' };
  };

  const usageStatus = getUsageStatus();

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    // Could add a toast notification here
  };

  const communityLinks = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Discord Community",
      description: "Join 500+ developers building with Brikk",
      link: "https://discord.gg/brikk",
      members: "23 online now"
    },
    {
      icon: <Github className="w-5 h-5" />,
      title: "Code Examples",
      description: "Agent coordination templates for all 6 languages",
      link: "https://github.com/brikk-ai/examples",
      members: "1,247 stars"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Documentation",
      description: "Comprehensive guides and API reference",
      link: "https://docs.getbrikk.com",
      members: "Always up-to-date"
    }
  ];

  const quickStartExamples = [
    {
      language: "Python",
      title: "Basic Agent Coordination",
      description: "Connect two Python agents with real-time communication",
      code: `import brikk

# Initialize Brikk client
client = brikk.Client(api_key="your_api_key")

# Create agent coordination
coordination = client.coordinate([
    {"agent": "python-agent-1", "task": "process_data"},
    {"agent": "python-agent-2", "task": "analyze_results"}
])

print(f"Coordination ID: {coordination.id}")`,
      icon: "🐍"
    },
    {
      language: "Node.js",
      title: "Multi-Language Coordination",
      description: "Coordinate Python and Node.js agents together",
      code: `const brikk = require('@brikk/sdk');

const client = new brikk.Client({
  apiKey: 'your_api_key'
});

// Coordinate across languages
const coordination = await client.coordinate([
  { agent: 'python-ml-model', task: 'predict' },
  { agent: 'nodejs-api-server', task: 'serve_results' }
]);

console.log('Coordination successful:', coordination.id);`,
      icon: "🟢"
    },
    {
      language: "Java",
      title: "Enterprise Workflow",
      description: "Build complex multi-step agent workflows",
      code: `import com.brikk.sdk.BrikkClient;
import com.brikk.sdk.Coordination;

BrikkClient client = new BrikkClient("your_api_key");

Coordination coordination = client.coordinate()
    .addAgent("java-processor", "validate_data")
    .addAgent("python-analyzer", "generate_insights")
    .addAgent("go-reporter", "create_report")
    .execute();

System.out.println("Workflow ID: " + coordination.getId());`,
      icon: "☕"
    }
  ];

  const upgradePrompts = [
    {
      trigger: usagePercentage >= 95,
      title: "🚨 API Limit Almost Reached!",
      message: "You've used 95%+ of your API calls. Upgrade now to avoid service interruption.",
      urgency: "critical",
      cta: "Upgrade Now - $99/month"
    },
    {
      trigger: usagePercentage >= 90,
      title: "⚡ You're Growing Fast!",
      message: "You've used 90%+ of your API calls. Time to scale with our Starter plan.",
      urgency: "high", 
      cta: "Upgrade to Starter - $99/month"
    },
    {
      trigger: usagePercentage >= 75,
      title: "📈 Great Progress!",
      message: "You're using Brikk heavily. Consider upgrading for more API calls and agents.",
      urgency: "medium",
      cta: "View Upgrade Options"
    }
  ];

  const activeUpgradePrompt = upgradePrompts.find(prompt => prompt.trigger);

  return (
    <div style={{ 
      background: 'var(--brikk-dark-bg)',
      color: 'var(--brikk-white)',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>
              Welcome back, {user?.name || 'Developer'}! 👋
            </h1>
            <p style={{ 
              color: 'var(--brikk-slate-text)',
              fontSize: '1.125rem'
            }}>
              Here's your agent coordination overview for {usage.period}
            </p>
          </div>
          
          <div style={{ 
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <div style={{ 
              background: 'var(--brikk-card-bg)',
              border: '1px solid var(--brikk-card-border)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              color: 'var(--brikk-teal)'
            }}>
              Free Tier
            </div>
            <button
              onClick={onLogout}
              style={{
                background: 'transparent',
                border: '1px solid var(--brikk-card-border)',
                color: 'var(--brikk-slate-text)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Upgrade Prompt */}
        {activeUpgradePrompt && (
          <div style={{ 
            background: activeUpgradePrompt.urgency === 'critical' 
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)'
              : activeUpgradePrompt.urgency === 'high'
              ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(115, 95, 255, 0.1) 0%, rgba(115, 95, 255, 0.05) 100%)',
            border: `1px solid ${
              activeUpgradePrompt.urgency === 'critical' ? 'rgba(239, 68, 68, 0.3)' :
              activeUpgradePrompt.urgency === 'high' ? 'rgba(245, 158, 11, 0.3)' :
              'rgba(115, 95, 255, 0.3)'
            }`,
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                {activeUpgradePrompt.title}
              </h3>
              <p style={{ 
                color: 'var(--brikk-slate-text)',
                margin: 0
              }}>
                {activeUpgradePrompt.message}
              </p>
            </div>
            <button
              onClick={onUpgrade}
              style={{
                background: 'var(--brikk-gradient)',
                color: 'var(--brikk-white)',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              {activeUpgradePrompt.cta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Usage Overview */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* API Usage */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{ 
                  background: 'rgba(115, 95, 255, 0.1)',
                  padding: '0.5rem',
                  borderRadius: '8px'
                }}>
                  <Zap className="w-5 h-5" style={{ color: 'var(--brikk-purple)' }} />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>API Usage</h3>
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: usageStatus.color,
                fontWeight: '500'
              }}>
                {usageStatus.message}
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.5rem'
              }}>
                <span style={{ 
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--brikk-white)'
                }}>
                  {usage.apiCalls.toLocaleString()}
                </span>
                <span style={{ 
                  fontSize: '1rem',
                  color: 'var(--brikk-slate-text)'
                }}>
                  / {usage.apiLimit.toLocaleString()} calls
                </span>
              </div>
              
              <div style={{ 
                width: '100%',
                height: '8px',
                background: 'var(--brikk-dark-bg)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${usagePercentage}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${usageStatus.color} 0%, ${usageStatus.color}aa 100%)`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
              
              <div style={{ 
                fontSize: '0.875rem',
                color: 'var(--brikk-slate-text)',
                marginTop: '0.5rem'
              }}>
                {usagePercentage.toFixed(1)}% used this month
              </div>
            </div>
            
            {usagePercentage > 75 && (
              <div style={{ 
                background: 'rgba(115, 95, 255, 0.05)',
                border: '1px solid rgba(115, 95, 255, 0.2)',
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '0.875rem'
              }}>
                💡 <strong>Tip:</strong> Upgrade to Starter for 10x more API calls ({(usage.apiLimit * 10).toLocaleString()}) and remove Brikk branding.
              </div>
            )}
          </div>

          {/* Agent Usage */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{ 
                  background: 'rgba(0, 240, 181, 0.1)',
                  padding: '0.5rem',
                  borderRadius: '8px'
                }}>
                  <Cpu className="w-5 h-5" style={{ color: 'var(--brikk-teal)' }} />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Active Agents</h3>
              </div>
              <div style={{ 
                fontSize: '0.875rem',
                color: agentUsagePercentage >= 100 ? '#f59e0b' : 'var(--brikk-teal)',
                fontWeight: '500'
              }}>
                {agentUsagePercentage >= 100 ? 'At limit' : 'Available'}
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.5rem'
              }}>
                <span style={{ 
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--brikk-white)'
                }}>
                  {usage.agents}
                </span>
                <span style={{ 
                  fontSize: '1rem',
                  color: 'var(--brikk-slate-text)'
                }}>
                  / {usage.agentLimit} agents
                </span>
              </div>
              
              <div style={{ 
                width: '100%',
                height: '8px',
                background: 'var(--brikk-dark-bg)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${agentUsagePercentage}%`,
                  height: '100%',
                  background: agentUsagePercentage >= 100 
                    ? 'linear-gradient(90deg, #f59e0b 0%, #f59e0baa 100%)'
                    : 'linear-gradient(90deg, var(--brikk-teal) 0%, var(--brikk-teal)aa 100%)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              
              <div style={{ 
                fontSize: '0.875rem',
                color: 'var(--brikk-slate-text)',
                marginTop: '0.5rem'
              }}>
                Languages: Python, Node.js
              </div>
            </div>
            
            {agentUsagePercentage >= 100 && (
              <div style={{ 
                background: 'rgba(245, 158, 11, 0.05)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '0.875rem'
              }}>
                🚀 <strong>Need more agents?</strong> Upgrade to Starter for 5 agents or Professional for 25 agents.
              </div>
            )}
          </div>

          {/* Performance */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div style={{ 
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '0.5rem',
                borderRadius: '8px'
              }}>
                <TrendingUp className="w-5 h-5" style={{ color: '#22c55e' }} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Performance</h3>
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div>
                <div style={{ 
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#22c55e',
                  marginBottom: '0.25rem'
                }}>
                  99.8%
                </div>
                <div style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--brikk-slate-text)'
                }}>
                  Success Rate
                </div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#22c55e',
                  marginBottom: '0.25rem'
                }}>
                  47ms
                </div>
                <div style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--brikk-slate-text)'
                }}>
                  Avg Response
                </div>
              </div>
            </div>
            
            <div style={{ 
              background: 'rgba(34, 197, 94, 0.05)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '8px',
              padding: '0.75rem',
              marginTop: '1rem',
              fontSize: '0.875rem'
            }}>
              ✨ <strong>Excellent performance!</strong> Your agents are coordinating smoothly.
            </div>
          </div>
        </div>

        {/* API Key Management */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{ 
              background: 'rgba(115, 95, 255, 0.1)',
              padding: '0.5rem',
              borderRadius: '8px'
            }}>
              <Key className="w-5 h-5" style={{ color: 'var(--brikk-purple)' }} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>API Key</h3>
          </div>
          
          <div style={{ 
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              flex: 1,
              minWidth: '300px',
              background: 'var(--brikk-dark-bg)',
              border: '1px solid var(--brikk-card-border)',
              borderRadius: '8px',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ flex: 1 }}>
                {showApiKey ? apiKey : '••••••••••••••••••••••••••••••••••••••••'}
              </span>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--brikk-slate-text)',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={copyApiKey}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--brikk-slate-text)',
                  cursor: 'pointer',
                  padding: '0.25rem'
                }}
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            
            <div style={{ 
              fontSize: '0.875rem',
              color: 'var(--brikk-slate-text)'
            }}>
              Keep your API key secure and never share it publicly.
            </div>
          </div>
        </div>

        {/* Quick Start Examples */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              background: 'rgba(0, 240, 181, 0.1)',
              padding: '0.5rem',
              borderRadius: '8px'
            }}>
              <Sparkles className="w-5 h-5" style={{ color: 'var(--brikk-teal)' }} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Quick Start Examples</h3>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}>
            {quickStartExamples.map((example, index) => (
              <div key={index} style={{
                background: 'var(--brikk-dark-bg)',
                border: '1px solid var(--brikk-card-border)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>{example.icon}</span>
                  <div>
                    <h4 style={{ 
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom: '0.25rem'
                    }}>
                      {example.title}
                    </h4>
                    <div style={{ 
                      fontSize: '0.75rem',
                      color: 'var(--brikk-purple)',
                      fontWeight: '500'
                    }}>
                      {example.language}
                    </div>
                  </div>
                </div>
                
                <p style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--brikk-slate-text)',
                  marginBottom: '1rem'
                }}>
                  {example.description}
                </p>
                
                <pre style={{ 
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '6px',
                  padding: '0.75rem',
                  fontSize: '0.75rem',
                  overflow: 'auto',
                  color: 'var(--brikk-white)',
                  fontFamily: 'monospace',
                  lineHeight: '1.4'
                }}>
                  {example.code}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Community & Resources */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              background: 'rgba(115, 95, 255, 0.1)',
              padding: '0.5rem',
              borderRadius: '8px'
            }}>
              <Users className="w-5 h-5" style={{ color: 'var(--brikk-purple)' }} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Developer Community</h3>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {communityLinks.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--brikk-dark-bg)',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '8px',
                  padding: '1rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brikk-purple)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brikk-card-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{ 
                    color: 'var(--brikk-purple)'
                  }}>
                    {link.icon}
                  </div>
                  <h4 style={{ 
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    {link.title}
                  </h4>
                </div>
                
                <p style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--brikk-slate-text)',
                  marginBottom: '0.5rem'
                }}>
                  {link.description}
                </p>
                
                <div style={{ 
                  fontSize: '0.75rem',
                  color: 'var(--brikk-teal)',
                  fontWeight: '500'
                }}>
                  {link.members}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              background: 'rgba(0, 240, 181, 0.1)',
              padding: '0.5rem',
              borderRadius: '8px'
            }}>
              <BarChart3 className="w-5 h-5" style={{ color: 'var(--brikk-teal)' }} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Recent Activity</h3>
          </div>
          
          <div style={{ 
            display: 'grid',
            gap: '0.75rem'
          }}>
            {recentActivity.map((activity) => (
              <div key={activity.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem',
                background: 'var(--brikk-dark-bg)',
                border: '1px solid var(--brikk-card-border)',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: activity.status === 'success' ? '#22c55e' : '#f59e0b',
                  flexShrink: 0
                }} />
                
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '0.875rem',
                    marginBottom: '0.25rem'
                  }}>
                    {activity.message}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem',
                    color: 'var(--brikk-slate-text)'
                  }}>
                    {activity.time}
                  </div>
                </div>
                
                <div style={{
                  fontSize: '0.75rem',
                  color: activity.status === 'success' ? '#22c55e' : '#f59e0b',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}>
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;

