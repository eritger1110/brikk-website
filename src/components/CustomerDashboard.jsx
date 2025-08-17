import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Zap, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Activity,
  CreditCard,
  Settings,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Calendar,
  Filter
} from 'lucide-react';

const CustomerDashboard = ({ user, onNavigate }) => {
  const [usageData, setUsageData] = useState({
    currentPeriod: {
      apiCalls: 2847,
      limit: 10000,
      agents: 3,
      agentLimit: 5,
      uptime: 99.94,
      avgResponseTime: 47,
      successRate: 99.89,
      lastUpdated: new Date()
    },
    billing: {
      currentPlan: 'Starter',
      nextBilling: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      amount: 99,
      overage: 0,
      marketplaceFee: 2.9
    },
    recentActivity: [
      { id: 1, type: 'api_call', agent: 'python-agent-1', status: 'success', timestamp: new Date(Date.now() - 5 * 60 * 1000), responseTime: 42 },
      { id: 2, type: 'agent_deploy', agent: 'node-agent-2', status: 'success', timestamp: new Date(Date.now() - 12 * 60 * 1000), responseTime: null },
      { id: 3, type: 'api_call', agent: 'java-agent-1', status: 'success', timestamp: new Date(Date.now() - 18 * 60 * 1000), responseTime: 38 },
      { id: 4, type: 'coordination', agent: 'multi-agent', status: 'success', timestamp: new Date(Date.now() - 25 * 60 * 1000), responseTime: 51 },
      { id: 5, type: 'api_call', agent: 'python-agent-2', status: 'error', timestamp: new Date(Date.now() - 32 * 60 * 1000), responseTime: null }
    ]
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production Key', key: 'bk_live_1234567890abcdef', created: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), lastUsed: new Date(Date.now() - 5 * 60 * 1000), visible: false },
    { id: 2, name: 'Development Key', key: 'bk_test_abcdef1234567890', created: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000), visible: false }
  ]);

  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUsageData(prev => ({
        ...prev,
        currentPeriod: {
          ...prev.currentPeriod,
          apiCalls: prev.currentPeriod.apiCalls + Math.floor(Math.random() * 3),
          avgResponseTime: 45 + Math.floor(Math.random() * 10),
          lastUpdated: new Date()
        }
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUsageData(prev => ({
      ...prev,
      currentPeriod: {
        ...prev.currentPeriod,
        lastUpdated: new Date()
      }
    }));
    setIsRefreshing(false);
  };

  const toggleApiKeyVisibility = (id) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, visible: !key.visible } : key
    ));
  };

  const copyApiKey = (key) => {
    navigator.clipboard.writeText(key);
    // You could add a toast notification here
  };

  const getUsagePercentage = () => {
    return (usageData.currentPeriod.apiCalls / usageData.currentPeriod.limit) * 100;
  };

  const getUsageColor = () => {
    const percentage = getUsagePercentage();
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 75) return '#f59e0b';
    return 'var(--brikk-teal)';
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--brikk-dark-bg)',
      color: 'var(--brikk-white)',
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
              Dashboard
            </h1>
            <p style={{
              color: 'var(--brikk-slate-text)',
              fontSize: '1rem'
            }}>
              Welcome back, {user?.name || 'Developer'}! Here's your real-time usage overview.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              style={{
                background: 'var(--brikk-card-bg)',
                border: '1px solid var(--brikk-card-border)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: 'var(--brikk-white)',
                fontSize: '0.875rem'
              }}
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              style={{
                background: 'var(--brikk-gradient)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                color: 'var(--brikk-white)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Zap className="w-5 h-5" style={{ color: getUsageColor() }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>API Usage</h3>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: '700', color: getUsageColor() }}>
                  {formatNumber(usageData.currentPeriod.apiCalls)}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
                  of {formatNumber(usageData.currentPeriod.limit)}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${Math.min(getUsagePercentage(), 100)}%`,
                  height: '100%',
                  background: getUsageColor(),
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
              {getUsagePercentage().toFixed(1)}% of monthly limit used
            </div>
          </div>

          {/* Active Agents */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Users className="w-5 h-5" style={{ color: 'var(--brikk-purple)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Active Agents</h3>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--brikk-purple)' }}>
                {usageData.currentPeriod.agents}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginLeft: '0.5rem' }}>
                of {usageData.currentPeriod.agentLimit} max
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
              All agents running smoothly
            </div>
          </div>

          {/* Uptime */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Activity className="w-5 h-5" style={{ color: 'var(--brikk-teal)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Uptime</h3>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--brikk-teal)' }}>
                {usageData.currentPeriod.uptime}%
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
              Last 30 days average
            </div>
          </div>

          {/* Response Time */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Clock className="w-5 h-5" style={{ color: 'var(--brikk-yellow)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Avg Response Time</h3>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--brikk-yellow)' }}>
                {usageData.currentPeriod.avgResponseTime}ms
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
              Updated {formatTime(usageData.currentPeriod.lastUpdated)}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Recent Activity */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent Activity</h3>
              <button
                onClick={() => onNavigate('activity')}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '6px',
                  padding: '0.5rem 1rem',
                  color: 'var(--brikk-white)',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                View All
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {usageData.recentActivity.map((activity) => (
                <div key={activity.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: activity.status === 'success' ? '#22c55e' : '#ef4444'
                    }} />
                    <div>
                      <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>
                        {activity.agent}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--brikk-slate-text)' }}>
                        {activity.type.replace('_', ' ')} • {formatTime(activity.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {activity.responseTime && (
                      <div style={{ fontSize: '0.875rem', color: 'var(--brikk-teal)' }}>
                        {activity.responseTime}ms
                      </div>
                    )}
                    <div style={{
                      fontSize: '0.75rem',
                      color: activity.status === 'success' ? '#22c55e' : '#ef4444'
                    }}>
                      {activity.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing & Plan */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <CreditCard className="w-5 h-5" style={{ color: 'var(--brikk-purple)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Billing & Plan</h3>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>Current Plan</span>
                <span style={{ fontWeight: '600' }}>{usageData.billing.currentPlan}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>Monthly Cost</span>
                <span style={{ fontWeight: '600' }}>${usageData.billing.amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>Overage Charges</span>
                <span style={{ fontWeight: '600' }}>${usageData.billing.overage}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>Next Billing</span>
                <span style={{ fontWeight: '600' }}>{formatDate(usageData.billing.nextBilling)}</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('billing')}
              style={{
                width: '100%',
                background: 'var(--brikk-gradient)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem',
                color: 'var(--brikk-white)',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Manage Billing
            </button>
          </div>
        </div>

        {/* API Keys Management */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>API Keys</h3>
            <button
              onClick={() => onNavigate('api-keys')}
              style={{
                background: 'var(--brikk-gradient)',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                color: 'var(--brikk-white)',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Create New Key
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                    {apiKey.name}
                  </div>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    color: 'var(--brikk-slate-text)',
                    marginBottom: '0.25rem'
                  }}>
                    {apiKey.visible ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brikk-slate-text)' }}>
                    Created {formatDate(apiKey.created)} • Last used {formatTime(apiKey.lastUsed)}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => toggleApiKeyVisibility(apiKey.id)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--brikk-card-border)',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      color: 'var(--brikk-white)',
                      cursor: 'pointer'
                    }}
                  >
                    {apiKey.visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => copyApiKey(apiKey.key)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--brikk-card-border)',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      color: 'var(--brikk-white)',
                      cursor: 'pointer'
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

