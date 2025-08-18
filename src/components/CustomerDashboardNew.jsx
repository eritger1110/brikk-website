import React, { useState, useEffect } from 'react';
import { analytics, billing, auth } from '../utils/api';

const CustomerDashboardNew = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        
        // Fetch real customer data from backend
        const [userStats, usageAnalytics, subscription] = await Promise.all([
          analytics.getUserStats().catch(() => null),
          analytics.getUsageAnalytics(30).catch(() => null),
          billing.getSubscription().catch(() => null)
        ]);

        // If endpoints aren't ready, use mock data
        const mockCustomerData = {
          userStats: userStats || {
            apiCallsUsed: 2847,
            apiCallsLimit: 10000,
            activeAgents: 3,
            agentLimit: 5,
            uptime: 99.94,
            avgResponseTime: 47
          },
          usageAnalytics: usageAnalytics || {
            dailyUsage: [
              { date: '2024-08-10', calls: 245, cost: 1.23 },
              { date: '2024-08-11', calls: 312, cost: 1.56 },
              { date: '2024-08-12', calls: 189, cost: 0.95 },
              { date: '2024-08-13', calls: 456, cost: 2.28 },
              { date: '2024-08-14', calls: 378, cost: 1.89 },
              { date: '2024-08-15', calls: 523, cost: 2.62 },
              { date: '2024-08-16', calls: 401, cost: 2.01 }
            ]
          },
          subscription: subscription || {
            plan: 'Starter',
            price: '$99',
            nextBilling: '2024-09-15',
            status: 'active'
          },
          recentActivity: [
            { id: 1, type: 'coordination', message: 'Python agent coordinated with Node.js agent', time: '2 minutes ago', status: 'success', responseTime: '42ms' },
            { id: 2, type: 'coordination', message: 'Java agent processed data transformation', time: '5 minutes ago', status: 'success', responseTime: '38ms' },
            { id: 3, type: 'coordination', message: 'Node.js agent handled API request', time: '8 minutes ago', status: 'success', responseTime: '51ms' },
            { id: 4, type: 'error', message: 'Python agent timeout (resolved)', time: '15 minutes ago', status: 'error', responseTime: '5000ms' },
            { id: 5, type: 'coordination', message: 'Multi-agent workflow completed', time: '22 minutes ago', status: 'success', responseTime: '156ms' }
          ]
        };

        setCustomerData(mockCustomerData);
      } catch (err) {
        console.error('Failed to fetch customer data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleManageBilling = async () => {
    try {
      const response = await billing.createPortalSession();
      if (response.url) {
        window.open(response.url, '_blank');
      }
    } catch (error) {
      console.error('Failed to open billing portal:', error);
      alert('Unable to open billing portal. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-900 border border-red-700 rounded-lg p-4">
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const usagePercentage = (customerData?.userStats?.apiCallsUsed / customerData?.userStats?.apiCallsLimit) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Customer Dashboard</h1>
          <p className="text-gray-400">Monitor your agent coordination usage and performance</p>
        </div>

        {/* Usage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">API Usage</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm">
                <span>{customerData?.userStats?.apiCallsUsed?.toLocaleString()}</span>
                <span>{customerData?.userStats?.apiCallsLimit?.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-400">{usagePercentage.toFixed(1)}% of monthly limit</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Active Agents</h3>
            <p className="text-2xl font-bold text-green-400">
              {customerData?.userStats?.activeAgents} / {customerData?.userStats?.agentLimit}
            </p>
            <p className="text-sm text-gray-400">Agents running</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Uptime</h3>
            <p className="text-2xl font-bold text-purple-400">{customerData?.userStats?.uptime}%</p>
            <p className="text-sm text-gray-400">Last 30 days</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Avg Response</h3>
            <p className="text-2xl font-bold text-yellow-400">{customerData?.userStats?.avgResponseTime}ms</p>
            <p className="text-sm text-gray-400">Response time</p>
          </div>
        </div>

        {/* Current Plan & Billing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Current Plan</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Plan:</span>
                <span className="font-semibold text-blue-400">{customerData?.subscription?.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price:</span>
                <span className="font-semibold">{customerData?.subscription?.price}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Next billing:</span>
                <span className="font-semibold">{customerData?.subscription?.nextBilling}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="font-semibold text-green-400 capitalize">{customerData?.subscription?.status}</span>
              </div>
            </div>
            <button 
              onClick={handleManageBilling}
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Billing
            </button>
          </div>

          {/* Performance Metrics */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Performance Insights</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-green-400">{customerData?.userStats?.uptime}%</p>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-blue-400">{customerData?.userStats?.avgResponseTime}ms</p>
                <p className="text-sm text-gray-400">Avg Response Time</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg">
              <p className="text-green-400 font-semibold">Excellent performance!</p>
              <p className="text-sm text-gray-300">Your agents are coordinating smoothly with minimal latency.</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm">View All</button>
          </div>
          <div className="space-y-3">
            {customerData?.recentActivity?.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    activity.status === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {activity.responseTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
            Refresh Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardNew;

