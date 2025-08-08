import React, { useState, useEffect } from 'react';
import '../App.css';

const CoordinationDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalCoordinations: 15847,
    successRate: 99.97,
    avgLatency: 152,
    activeAgents: 6,
    coordPerSecond: 47.3,
    languages: 6
  });

  const [agents] = useState([
    {
      id: 'python',
      name: 'Python',
      type: 'AI & Data Processing',
      icon: 'PY',
      status: 'active',
      performance: 97,
      capabilities: ['data_processing', 'analytics', 'machine_learning'],
      specialization: 'AI model training and data transformation',
      lastSeen: 'Just now',
      color: 'python'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      type: 'Real-time APIs',
      icon: 'JS',
      status: 'active',
      performance: 94,
      capabilities: ['data_ingestion', 'api_integration', 'real_time'],
      specialization: 'Real-time data ingestion and API coordination',
      lastSeen: '2 minutes ago',
      color: 'nodejs'
    },
    {
      id: 'java',
      name: 'Java',
      type: 'Enterprise Integration',
      icon: 'JV',
      status: 'active',
      performance: 96,
      capabilities: ['enterprise_integration', 'security', 'reporting'],
      specialization: 'Enterprise systems integration and reporting',
      lastSeen: '1 minute ago',
      color: 'java'
    },
    {
      id: 'go',
      name: 'Go',
      type: 'High Performance',
      icon: 'GO',
      status: 'active',
      performance: 99,
      capabilities: ['high_performance', 'concurrent_processing', 'optimization'],
      specialization: 'High-performance concurrent processing',
      lastSeen: 'Just now',
      color: 'go'
    },
    {
      id: 'rust',
      name: 'Rust',
      type: 'Systems Programming',
      icon: 'RS',
      status: 'active',
      performance: 98,
      capabilities: ['systems_programming', 'memory_safety', 'performance'],
      specialization: 'Memory-safe systems programming',
      lastSeen: '30 seconds ago',
      color: 'rust'
    },
    {
      id: 'csharp',
      name: 'C#',
      type: 'Business Logic',
      icon: 'C#',
      status: 'active',
      performance: 95,
      capabilities: ['business_logic', 'database_operations', 'workflows'],
      specialization: 'Business logic and database operations',
      lastSeen: '1 minute ago',
      color: 'csharp'
    }
  ]);

  const [workflows] = useState([
    {
      id: 'data_pipeline',
      title: 'Data Processing Pipeline',
      description: 'Ingestion → Transformation → Analysis → Reporting',
      agents: 'Python AI + Node.js API + Go Performance + Java Enterprise',
      timing: '~600ms',
      icon: 'DP'
    },
    {
      id: 'financial_analysis',
      title: 'Financial Analysis',
      description: 'Market Data → Risk Assessment → Optimization → Compliance',
      agents: 'Node.js Data + Python Analytics + Java Security + C# Reporting',
      timing: '~800ms',
      icon: 'FA'
    },
    {
      id: 'customer_service',
      title: 'Customer Service',
      description: 'Intent Recognition → Knowledge Retrieval → Response → QA',
      agents: 'Python NLP + Node.js API + Java Integration + Go Performance',
      timing: '~450ms',
      icon: 'CS'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalCoordinations: prev.totalCoordinations + Math.floor(Math.random() * 3),
        coordPerSecond: 45 + Math.random() * 10,
        avgLatency: 140 + Math.random() * 30
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fade-in">
      {/* Performance Metrics */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="card-icon">METRICS</span>
            Performance Metrics
          </h2>
          <div className="card-action">Live Updates</div>
        </div>
        
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">{metrics.totalCoordinations.toLocaleString()}</div>
            <div className="metric-label">Total Coordinations</div>
            <div className="metric-change positive">+12.3%</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">{metrics.successRate}%</div>
            <div className="metric-label">Success Rate</div>
            <div className="metric-change positive">+0.02%</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">{Math.round(metrics.avgLatency)}ms</div>
            <div className="metric-label">Avg Latency</div>
            <div className="metric-change positive">-8ms</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">{metrics.activeAgents}</div>
            <div className="metric-label">Active Agents</div>
            <div className="metric-change positive">+0</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">{metrics.coordPerSecond.toFixed(1)}</div>
            <div className="metric-label">Coord/Second</div>
            <div className="metric-change positive">+5.2</div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">{metrics.languages}</div>
            <div className="metric-label">Languages</div>
            <div className="metric-change positive">+0</div>
          </div>
        </div>
      </div>

      {/* Agent Registry */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="card-icon">AGENTS</span>
            Agent Registry
          </h2>
          <button className="card-action">Refresh</button>
        </div>
        
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
          Live agents available for coordination across programming languages
        </p>
        
        <div className="agents-grid">
          {agents.map((agent) => (
            <div key={agent.id} className={`agent-card ${agent.color}`}>
              <div className="agent-header">
                <div className="agent-emoji">{agent.icon}</div>
                <div className="agent-info">
                  <div className="agent-name">{agent.name}</div>
                  <div className="agent-type">{agent.type}</div>
                </div>
                <div className={`agent-status ${agent.status}`}>
                  {agent.status.toUpperCase()}
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Performance</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--brikk-teal)' }}>
                    {agent.performance}%
                  </span>
                </div>
                <div className="performance-bar">
                  <div 
                    className="performance-fill" 
                    style={{ width: `${agent.performance}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="agent-capabilities">
                {agent.capabilities.map((capability) => (
                  <span key={capability} className="capability-tag">
                    {capability.replace('_', ' ')}
                  </span>
                ))}
              </div>
              
              <div style={{ 
                fontSize: '0.875rem', 
                color: 'var(--brikk-slate-text)', 
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Specialization
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: 'var(--brikk-slate-text)', 
                opacity: 0.8,
                marginBottom: '1rem'
              }}>
                {agent.specialization}
              </div>
              
              <div style={{ 
                fontSize: '0.75rem', 
                color: 'var(--brikk-slate-text)', 
                opacity: 0.6,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span className="status-indicator"></span>
                Last seen: {agent.lastSeen}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Agent Workflow Coordination */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="card-icon">WORKFLOWS</span>
            Multi-Agent Workflow Coordination
          </h2>
          <div className="card-action">Demo Mode</div>
        </div>
        
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
          Select a workflow to demonstrate cross-language agent coordination
        </p>
        
        <div className="workflow-grid">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="workflow-card">
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700',
                marginBottom: '1rem',
                textAlign: 'center',
                color: 'var(--brikk-purple)',
                background: 'rgba(115, 95, 255, 0.1)',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid rgba(115, 95, 255, 0.3)'
              }}>
                {workflow.icon}
              </div>
              
              <div className="workflow-title">{workflow.title}</div>
              <div className="workflow-description">{workflow.description}</div>
              <div className="workflow-agents">{workflow.agents}</div>
              
              <div className="workflow-timing">
                <span>TIMING:</span>
                <span>{workflow.timing}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoordinationDashboard;

