import React from 'react';
import '../App.css';

const Header = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'coordination',
      title: 'Agent Coordination',
      description: 'Multi-language agent coordination and workflows',
      icon: 'AC'
    },
    {
      id: 'security',
      title: 'Enterprise Security',
      description: 'HIPAA compliance and role-based access control',
      icon: 'ES'
    },
    {
      id: 'monitoring',
      title: 'Real-Time Monitoring',
      description: 'Performance analytics and system monitoring',
      icon: 'RM'
    }
  ];

  return (
    <header className="header">
      <div className="header-content">
        {/* Prominent Brikk Branding */}
        <div className="brand-section">
          <div className="brand-logo">
            <span className="brand-logo-text">B</span>
          </div>
          <div className="brand-info">
            <h1 className="brand-title">Brikk Enterprise Platform</h1>
            <p className="brand-subtitle">The Economic Infrastructure for AI Agents</p>
          </div>
        </div>

        {/* Professional Navigation */}
        <nav className="nav-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="nav-tab-icon">{tab.icon}</span>
              <div className="nav-tab-content">
                <div className="nav-tab-title">{tab.title}</div>
                <div className="nav-tab-desc">{tab.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

