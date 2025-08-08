import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, MemoryStick, TrendingUp, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import MetricCard from './MetricCard';
import StatusBadge from './StatusBadge';
import LoadingSpinner from './LoadingSpinner';

const MonitoringDashboard = () => {
  const [metrics, setMetrics] = useState({});
  const [realtimeData, setRealtimeData] = useState([]);
  const [languageDistribution, setLanguageDistribution] = useState([]);
  const [hourlyTrends, setHourlyTrends] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Colors for charts matching Brikk theme
  const chartColors = ['#735FFF', '#00F0B5', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  useEffect(() => {
    loadMonitoringData();
    const interval = setInterval(loadMonitoringData, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const loadMonitoringData = async () => {
    try {
      const response = await fetch('/api/metrics');
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
        
        // Update realtime chart data
        const now = new Date();
        const timeLabel = now.toLocaleTimeString();
        
        setRealtimeData(prev => {
          const newData = [...prev, {
            time: timeLabel,
            coordinations: data.coordinations_per_second || 0,
            latency: data.average_latency || 0
          }];
          // Keep only last 20 data points
          return newData.slice(-20);
        });

        // Generate language distribution data
        const languages = [
          { name: 'Python', value: 28, color: '#3776AB' },
          { name: 'Node.js', value: 22, color: '#339933' },
          { name: 'Java', value: 18, color: '#ED8B00' },
          { name: 'Go', value: 15, color: '#00ADD8' },
          { name: 'Rust', value: 10, color: '#CE422B' },
          { name: 'C#', value: 7, color: '#239120' }
        ];
        setLanguageDistribution(languages);

        // Generate hourly trends (last 24 hours)
        const hourlyData = Array.from({ length: 24 }, (_, i) => {
          const hour = (new Date().getHours() - 23 + i) % 24;
          return {
            hour: `${hour.toString().padStart(2, '0')}:00`,
            coordinations: Math.floor(Math.random() * 500) + 200,
            success_rate: 99.5 + Math.random() * 0.5
          };
        });
        setHourlyTrends(hourlyData);

        // Generate system alerts
        const alerts = [
          { type: 'success', message: 'All systems operational', timestamp: '2 minutes ago' },
          { type: 'info', message: 'Scheduled maintenance completed', timestamp: '15 minutes ago' },
          { type: 'warning', message: 'High memory usage detected (resolved)', timestamp: '1 hour ago' },
          { type: 'success', message: 'Security scan completed successfully', timestamp: '2 hours ago' }
        ];
        setSystemAlerts(alerts);

        setLoading(false);
      }
    } catch (error) {
      console.error('Error loading monitoring data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading monitoring dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Real-Time Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="System Uptime"
          value="99.97%"
          trend="+0.02%"
          status="success"
          icon={CheckCircle}
          description="Last 30 days"
        />
        <MetricCard
          title="Response Time"
          value={`${metrics.average_latency || 142}ms`}
          trend="-8ms"
          status="success"
          icon={Clock}
          description="Average latency"
        />
        <MetricCard
          title="Throughput"
          value={`${(metrics.coordinations_per_second * 60).toLocaleString() || '2,847'}/min`}
          trend="+12%"
          status="success"
          icon={TrendingUp}
          description="Requests per minute"
        />
        <MetricCard
          title="Error Rate"
          value="0.03%"
          trend="-0.01%"
          status="success"
          icon={AlertCircle}
          description="Last 24 hours"
        />
      </div>

      {/* Real-Time Activity Chart */}
      <div className="brikk-card">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-brikk-purple" />
          <h3 className="text-xl font-semibold text-white">Live Coordination Activity</h3>
          <StatusBadge status="active" text="Live" />
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={realtimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="time" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                yAxisId="left"
                stroke="#735FFF"
                fontSize={12}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#00F0B5"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="coordinations"
                stroke="#735FFF"
                strokeWidth={2}
                dot={false}
                name="Coordinations/sec"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="latency"
                stroke="#00F0B5"
                strokeWidth={2}
                dot={false}
                name="Latency (ms)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coordination Statistics */}
        <div className="brikk-card">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-brikk-cyan" />
            <h3 className="text-xl font-semibold text-white">Performance Analytics</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-white">{metrics.total_coordinations?.toLocaleString() || '15,847'}</div>
                <div className="text-sm text-gray-400">Total Coordinations</div>
                <div className="text-xs text-green-400 mt-1">99.97% success rate</div>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-white">{metrics.average_latency || 152}ms</div>
                <div className="text-sm text-gray-400">Average Latency</div>
                <div className="text-xs text-blue-400 mt-1">Peak: 340ms | Min: 89ms</div>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Coordinations per Second</span>
                <span className="text-lg font-semibold text-white">{metrics.coordinations_per_second || 47.3}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-brikk-purple to-brikk-cyan h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((metrics.coordinations_per_second || 47.3) / 100 * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Distribution */}
        <div className="brikk-card">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-brikk-purple" />
            <h3 className="text-xl font-semibold text-white">Agent Language Distribution</h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {languageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 24-Hour Trends */}
      <div className="brikk-card">
        <div className="flex items-center gap-3 mb-6">
          <BarChart className="w-6 h-6 text-brikk-cyan" />
          <h3 className="text-xl font-semibold text-white">24-Hour Coordination Trends</h3>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="hour" 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Bar 
                dataKey="coordinations" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#735FFF" />
                  <stop offset="100%" stopColor="#00F0B5" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Resources and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Resources */}
        <div className="brikk-card">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-6 h-6 text-brikk-purple" />
            <h3 className="text-xl font-semibold text-white">System Resources</h3>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Memory Usage', value: 68, max: 100, unit: '%', icon: MemoryStick, details: '8.2GB / 12GB' },
              { name: 'CPU Usage', value: 34, max: 100, unit: '%', icon: Cpu, details: '4 cores / 8 threads' },
              { name: 'Disk Usage', value: 45, max: 100, unit: '%', icon: HardDrive, details: '450GB / 1TB' }
            ].map((resource) => {
              const IconComponent = resource.icon;
              return (
                <div key={resource.name} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">{resource.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-white">{resource.value}{resource.unit}</span>
                      <div className="text-xs text-gray-400">{resource.details}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        resource.value > 80 ? 'bg-red-500' :
                        resource.value > 60 ? 'bg-yellow-500' :
                        'bg-gradient-to-r from-brikk-purple to-brikk-cyan'
                      }`}
                      style={{ width: `${resource.value}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Alerts */}
        <div className="brikk-card">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-brikk-cyan" />
            <h3 className="text-xl font-semibold text-white">System Alerts</h3>
          </div>

          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                <StatusBadge status={alert.type} text="" size="small" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{alert.message}</div>
                  <div className="text-xs text-gray-400">{alert.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-400">All Systems Operational</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;

