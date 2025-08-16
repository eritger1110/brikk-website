import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Server,
  Database,
  Bell,
  Settings,
  Download,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  Eye,
  UserPlus,
  CreditCard,
  Zap,
  Globe,
  Shield,
  Clock,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react';

const AdminDashboard = ({ onNavigate }) => {
  const [systemData, setSystemData] = useState({
    overview: {
      totalUsers: 1247,
      newUsersToday: 23,
      totalRevenue: 127450,
      monthlyRecurring: 89320,
      systemUptime: 99.97,
      totalApiCalls: 2847392,
      activeAgents: 4821,
      errorRate: 0.03
    },
    usersByPlan: {
      free: 892,
      hacker: 187,
      starter: 134,
      professional: 28,
      enterprise: 6
    },
    revenueProjection: {
      next30Days: 94280,
      currentMonth: 89320,
      lastMonth: 82150,
      growth: 8.7
    },
    systemHealth: {
      apiLatency: 47,
      databaseConnections: 245,
      queueSize: 12,
      memoryUsage: 68,
      cpuUsage: 34,
      diskUsage: 42
    },
    recentUsers: [
      { id: 1, name: 'Sarah Johnson', email: 'sarah@techcorp.com', plan: 'Professional', joined: new Date(Date.now() - 2 * 60 * 60 * 1000), status: 'active' },
      { id: 2, name: 'Mike Chen', email: 'mike@startup.io', plan: 'Starter', joined: new Date(Date.now() - 4 * 60 * 60 * 1000), status: 'active' },
      { id: 3, name: 'Emily Rodriguez', email: 'emily@devteam.com', plan: 'Hacker', joined: new Date(Date.now() - 6 * 60 * 60 * 1000), status: 'active' },
      { id: 4, name: 'David Park', email: 'david@enterprise.com', plan: 'Enterprise', joined: new Date(Date.now() - 8 * 60 * 60 * 1000), status: 'pending' },
      { id: 5, name: 'Lisa Wang', email: 'lisa@agency.com', plan: 'Professional', joined: new Date(Date.now() - 12 * 60 * 60 * 1000), status: 'active' }
    ],
    systemAlerts: [
      { id: 1, type: 'warning', message: 'API response time increased by 15% in last hour', timestamp: new Date(Date.now() - 30 * 60 * 1000), severity: 'medium' },
      { id: 2, type: 'info', message: 'New Enterprise customer signed up', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), severity: 'low' },
      { id: 3, type: 'success', message: 'System backup completed successfully', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), severity: 'low' },
      { id: 4, type: 'error', message: 'Payment processing failed for 2 customers', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), severity: 'high' }
    ],
    topCustomers: [
      { id: 1, name: 'TechCorp Inc.', plan: 'Enterprise', revenue: 2400, apiCalls: 89234, agents: 25 },
      { id: 2, name: 'StartupAI', plan: 'Professional', revenue: 299, apiCalls: 45123, agents: 12 },
      { id: 3, name: 'DevTeam Solutions', plan: 'Professional', revenue: 299, apiCalls: 38901, agents: 8 },
      { id: 4, name: 'Innovation Labs', plan: 'Starter', revenue: 99, apiCalls: 12456, agents: 5 },
      { id: 5, name: 'AI Research Co.', plan: 'Enterprise', revenue: 3200, apiCalls: 156789, agents: 45 }
    ]
  });

  const [timeRange, setTimeRange] = useState('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemData(prev => ({
        ...prev,
        overview: {
          ...prev.overview,
          totalApiCalls: prev.overview.totalApiCalls + Math.floor(Math.random() * 50) + 10,
          apiLatency: 45 + Math.floor(Math.random() * 10),
          newUsersToday: prev.overview.newUsersToday + (Math.random() > 0.8 ? 1 : 0)
        },
        systemHealth: {
          ...prev.systemHealth,
          apiLatency: 45 + Math.floor(Math.random() * 10),
          queueSize: Math.max(0, prev.systemHealth.queueSize + Math.floor(Math.random() * 6) - 3),
          memoryUsage: Math.max(50, Math.min(85, prev.systemHealth.memoryUsage + Math.floor(Math.random() * 6) - 3)),
          cpuUsage: Math.max(20, Math.min(70, prev.systemHealth.cpuUsage + Math.floor(Math.random() * 6) - 3))
        }
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'success': return '#22c55e';
      default: return 'var(--brikk-teal)';
    }
  };

  const getHealthColor = (value, type) => {
    if (type === 'latency') {
      if (value > 100) return '#ef4444';
      if (value > 75) return '#f59e0b';
      return '#22c55e';
    }
    if (value > 80) return '#ef4444';
    if (value > 60) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--brikk-dark-bg)',
      color: 'var(--brikk-white)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
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
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '0.5rem',
              background: 'var(--brikk-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Admin Dashboard
            </h1>
            <p style={{
              color: 'var(--brikk-slate-text)',
              fontSize: '1rem'
            }}>
              Complete oversight of your Brikk platform - users, revenue, performance, and system health.
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Total Users */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Users className="w-5 h-5" style={{ color: 'var(--brikk-purple)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Total Users</h3>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--brikk-purple)' }}>
                {formatNumber(systemData.overview.totalUsers)}
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
              +{systemData.overview.newUsersToday} today
            </div>
          </div>

          {/* Monthly Revenue */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <DollarSign className="w-5 h-5" style={{ color: 'var(--brikk-teal)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Monthly Revenue</h3>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--brikk-teal)' }}>
                {formatCurrency(systemData.overview.monthlyRecurring)}
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
              +{systemData.revenueProjection.growth}% vs last month
            </div>
          </div>

          {/* System Uptime */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Activity className="w-5 h-5" style={{ color: '#22c55e' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>System Uptime</h3>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '700', color: '#22c55e' }}>
                {systemData.overview.systemUptime}%
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
              Last 30 days
            </div>
          </div>

          {/* API Calls */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Zap className="w-5 h-5" style={{ color: 'var(--brikk-yellow)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>Total API Calls</h3>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--brikk-yellow)' }}>
                {formatNumber(systemData.overview.totalApiCalls)}
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
              All time
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* User Distribution */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              Users by Plan
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(systemData.usersByPlan).map(([plan, count]) => (
                <div key={plan} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                      {plan}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)' }}>
                      {((count / systemData.overview.totalUsers) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--brikk-teal)' }}>
                    {formatNumber(count)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
              System Health
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>API Latency</span>
                <span style={{ color: getHealthColor(systemData.systemHealth.apiLatency, 'latency') }}>
                  {systemData.systemHealth.apiLatency}ms
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Memory Usage</span>
                <span style={{ color: getHealthColor(systemData.systemHealth.memoryUsage) }}>
                  {systemData.systemHealth.memoryUsage}%
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>CPU Usage</span>
                <span style={{ color: getHealthColor(systemData.systemHealth.cpuUsage) }}>
                  {systemData.systemHealth.cpuUsage}%
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Queue Size</span>
                <span style={{ color: 'var(--brikk-white)' }}>
                  {systemData.systemHealth.queueSize}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>DB Connections</span>
                <span style={{ color: 'var(--brikk-white)' }}>
                  {systemData.systemHealth.databaseConnections}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users & Alerts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Recent Users */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent Users</h3>
              <button
                onClick={() => onNavigate('users')}
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
                View All Users
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {systemData.recentUsers.map((user) => (
                <div key={user.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '0.25rem' }}>
                      {user.email}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--brikk-slate-text)' }}>
                      Joined {formatTime(user.joined)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '500',
                      color: 'var(--brikk-purple)',
                      marginBottom: '0.25rem'
                    }}>
                      {user.plan}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: user.status === 'active' ? '#22c55e' : '#f59e0b',
                      textTransform: 'capitalize'
                    }}>
                      {user.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div style={{
            background: 'var(--brikk-card-bg)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Bell className="w-5 h-5" style={{ color: 'var(--brikk-yellow)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>System Alerts</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {systemData.systemAlerts.map((alert) => (
                <div key={alert.id} style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  borderLeft: `4px solid ${getAlertColor(alert.type)}`
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: getAlertColor(alert.type)
                    }} />
                    <span style={{ 
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      color: getAlertColor(alert.type),
                      fontWeight: '600'
                    }}>
                      {alert.type}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {alert.message}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brikk-slate-text)' }}>
                    {formatTime(alert.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '12px',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Top Customers</h3>
            <button
              onClick={() => onNavigate('customers')}
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
              View All Customers
            </button>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {systemData.topCustomers.map((customer) => (
              <div key={customer.id} style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                      {customer.name}
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: 'var(--brikk-purple)',
                      fontWeight: '500'
                    }}>
                      {customer.plan}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--brikk-teal)' }}>
                      {formatCurrency(customer.revenue)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--brikk-slate-text)' }}>
                      /month
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <div>
                    <div style={{ color: 'var(--brikk-slate-text)' }}>API Calls</div>
                    <div style={{ fontWeight: '500' }}>{formatNumber(customer.apiCalls)}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--brikk-slate-text)' }}>Agents</div>
                    <div style={{ fontWeight: '500' }}>{customer.agents}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Projection */}
        <div style={{
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            Revenue Projection
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '0.5rem' }}>
                Next 30 Days
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--brikk-teal)' }}>
                {formatCurrency(systemData.revenueProjection.next30Days)}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '0.5rem' }}>
                Current Month
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--brikk-purple)' }}>
                {formatCurrency(systemData.revenueProjection.currentMonth)}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '0.5rem' }}>
                Last Month
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--brikk-white)' }}>
                {formatCurrency(systemData.revenueProjection.lastMonth)}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '0.5rem' }}>
                Growth Rate
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#22c55e' }}>
                +{systemData.revenueProjection.growth}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

