import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CoordinationDashboard from './components/CoordinationDashboard';
import SecurityDashboard from './components/SecurityDashboard';
import MonitoringDashboard from './components/MonitoringDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('coordination');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize the application
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  if (loading) {
    return (
      <div className="app" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh' 
      }}>
        <LoadingSpinner message="Initializing Brikk Enterprise Platform..." />
      </div>
    );
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'coordination':
        return <CoordinationDashboard />;
      case 'security':
        return <SecurityDashboard />;
      case 'monitoring':
        return <MonitoringDashboard />;
      default:
        return <CoordinationDashboard />;
    }
  };

  return (
    <div className="app">
      {/* Enhanced Header with Prominent Branding */}
      <Header 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <div className="hero">
          <h1 className="hero-title">Welcome to Brikk</h1>
          <p className="hero-subtitle">The Economic Infrastructure for AI Agents</p>
          <div className="hero-features">
            <div className="hero-feature">
              <div className="status-indicator"></div>
              <span>Enterprise-Grade Security</span>
            </div>
            <div className="hero-feature">
              <div className="status-indicator"></div>
              <span>Multi-Language Coordination</span>
            </div>
            <div className="hero-feature">
              <div className="status-indicator"></div>
              <span>HIPAA Compliant</span>
            </div>
            <div className="hero-feature">
              <div className="status-indicator"></div>
              <span>Real-Time Monitoring</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="fade-in">
          {renderActiveComponent()}
        </div>
      </main>

      {/* Professional Footer */}
      <footer style={{ 
        background: 'rgba(15, 15, 17, 0.95)', 
        borderTop: '1px solid var(--brikk-card-border)', 
        padding: '3rem 0', 
        marginTop: '4rem',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 2rem' 
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem' 
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'var(--brikk-gradient)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: 'var(--brikk-shadow)'
              }}>
                <span style={{ 
                  color: 'var(--brikk-white)', 
                  fontWeight: '800', 
                  fontSize: '1.25rem' 
                }}>
                  B
                </span>
              </div>
              <div>
                <div style={{ 
                  color: 'var(--brikk-white)', 
                  fontWeight: '700',
                  fontSize: '1.125rem',
                  marginBottom: '0.25rem'
                }}>
                  Brikk Enterprise Platform
                </div>
                <div style={{ 
                  color: 'var(--brikk-slate-text)', 
                  fontSize: '0.875rem',
                  opacity: 0.8
                }}>
                  The Economic Infrastructure for AI Agents
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '2rem', 
              fontSize: '0.875rem', 
              color: 'var(--brikk-slate-text)',
              flexWrap: 'wrap'
            }}>
              <div style={{ 
                background: 'rgba(115, 95, 255, 0.1)',
                border: '1px solid rgba(115, 95, 255, 0.3)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                color: 'var(--brikk-purple)',
                fontWeight: '500'
              }}>
                Version 1.0.0
              </div>
              <div style={{ 
                background: 'rgba(0, 240, 181, 0.1)',
                border: '1px solid rgba(0, 240, 181, 0.3)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                color: 'var(--brikk-teal)',
                fontWeight: '500'
              }}>
                Enterprise Edition
              </div>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--brikk-card-border)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                color: 'var(--brikk-white)',
                fontWeight: '500'
              }}>
                HIPAA Ready
              </div>
            </div>
          </div>
          
          <div style={{ 
            paddingTop: '2rem', 
            borderTop: '1px solid var(--brikk-card-border)', 
            textAlign: 'center', 
            fontSize: '0.875rem', 
            color: 'var(--brikk-slate-text)', 
            opacity: 0.7 
          }}>
            <p style={{ marginBottom: '0.5rem' }}>
              © 2025 Brikk. All rights reserved. Built for Fortune 500 enterprises.
            </p>
            <p>
              Secure AI agent coordination • HIPAA compliant • Enterprise-grade infrastructure
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

