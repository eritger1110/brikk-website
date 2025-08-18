import React, { useState, useEffect } from 'react';
import './App.css';

// Import enhanced components
import LandingPage from './components/LandingPage';
import FreeTierSignup from './components/FreeTierSignupNew';
import DeveloperDashboard from './components/DeveloperDashboard';
import AdminDashboard from './components/AdminDashboardNew';
import CustomerDashboard from './components/CustomerDashboardNew';
import EnhancedHeader from './components/EnhancedHeader';
import FeaturesPage from './components/FeaturesPage';
import PricingPage from './components/PricingPage';
import UseCasesPage from './components/UseCasesPage';
import ResourcesPage from './components/ResourcesPage';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('brikk_token');
    const userData = localStorage.getItem('brikk_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setCurrentPage('dashboard');
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('brikk_token');
        localStorage.removeItem('brikk_user');
      }
    }
    
    // Simulate loading for smooth UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSignup = () => {
    setCurrentPage('signup');
  };

  const handleLogin = () => {
    setCurrentPage('login');
  };

  const handleAuthSuccess = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('brikk_token', token);
    localStorage.setItem('brikk_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('brikk_token');
    localStorage.removeItem('brikk_user');
    setCurrentPage('landing');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleUpgrade = () => {
    setCurrentPage('upgrade');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'features':
        return (
          <FeaturesPage 
            onBackToHome={() => setCurrentPage('landing')}
            onNavigate={handleNavigate}
          />
        );
      case 'pricing':
        return (
          <PricingPage 
            onBackToHome={() => setCurrentPage('landing')}
            onNavigate={handleNavigate}
          />
        );
      case 'use-cases':
        return (
          <UseCasesPage 
            onBackToHome={() => setCurrentPage('landing')}
            onNavigate={handleNavigate}
          />
        );
      case 'resources':
        return (
          <ResourcesPage 
            onBackToHome={() => setCurrentPage('landing')}
            onNavigate={handleNavigate}
          />
        );
      case 'terms':
        return (
          <TermsOfService 
            onBackToHome={() => setCurrentPage('landing')}
          />
        );
      case 'privacy':
        return (
          <PrivacyPolicy 
            onBackToHome={() => setCurrentPage('landing')}
          />
        );
      case 'signup':
        return (
          <FreeTierSignup 
            onSuccess={handleAuthSuccess}
            onBack={() => setCurrentPage('landing')}
          />
        );
      case 'login':
        return (
          <div style={{
            minHeight: '100vh',
            background: 'var(--brikk-dark-bg)',
            color: 'var(--brikk-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              background: 'var(--brikk-card-bg)',
              border: '1px solid var(--brikk-card-border)',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center'
            }}>
              <h2 style={{ marginBottom: '1rem' }}>🔐 Login Coming Soon</h2>
              <p style={{ color: 'var(--brikk-slate-text)', marginBottom: '1.5rem' }}>
                Login functionality will be available in the next update. For now, you can sign up for a free account to get started.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setCurrentPage('signup')}
                  style={{
                    background: 'var(--brikk-gradient)',
                    color: 'var(--brikk-white)',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Sign Up Free
                </button>
                <button
                  onClick={() => setCurrentPage('landing')}
                  style={{
                    background: 'transparent',
                    color: 'var(--brikk-slate-text)',
                    border: '1px solid var(--brikk-card-border)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <DeveloperDashboard 
            user={user}
            onUpgrade={handleUpgrade}
            onLogout={handleLogout}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard 
            onBackToHome={() => setCurrentPage('landing')}
          />
        );
      case 'customer-dashboard':
        return (
          <CustomerDashboard 
            onBackToHome={() => setCurrentPage('landing')}
          />
        );
      case 'upgrade':
        return (
          <div style={{
            minHeight: '100vh',
            background: 'var(--brikk-dark-bg)',
            color: 'var(--brikk-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              background: 'var(--brikk-card-bg)',
              border: '1px solid var(--brikk-card-border)',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '800px',
              width: '100%'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>🚀 Upgrade Your Plan</h2>
                <p style={{ color: 'var(--brikk-slate-text)' }}>
                  Choose the perfect plan for your agent coordination needs.
                </p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                {/* Starter Plan */}
                <div style={{
                  background: 'var(--brikk-dark-bg)',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: 'var(--brikk-purple)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Starter</h3>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>$99</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '1.5rem' }}>per month</div>
                  <ul style={{ 
                    textAlign: 'left', 
                    fontSize: '0.875rem', 
                    color: 'var(--brikk-slate-text)',
                    listStyle: 'none',
                    padding: 0,
                    marginBottom: '1.5rem'
                  }}>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> 10,000 API calls/month
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> 5 agents maximum
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> Remove Brikk branding
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> Email support
                    </li>
                  </ul>
                  <button style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid var(--brikk-purple)',
                    color: 'var(--brikk-purple)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Choose Starter
                  </button>
                </div>
                
                {/* Professional Plan */}
                <div style={{
                  background: 'var(--brikk-dark-bg)',
                  border: '2px solid var(--brikk-purple)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--brikk-purple)',
                    color: 'var(--brikk-white)',
                    padding: '0.25rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    MOST POPULAR
                  </div>
                  <h3 style={{ color: 'var(--brikk-purple)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Professional</h3>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>$299</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '1.5rem' }}>per month</div>
                  <ul style={{ 
                    textAlign: 'left', 
                    fontSize: '0.875rem', 
                    color: 'var(--brikk-slate-text)',
                    listStyle: 'none',
                    padding: 0,
                    marginBottom: '1.5rem'
                  }}>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> 100,000 API calls/month
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> 25 agents maximum
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> Priority support
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> Advanced analytics
                    </li>
                  </ul>
                  <button style={{
                    width: '100%',
                    background: 'var(--brikk-gradient)',
                    border: 'none',
                    color: 'var(--brikk-white)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Choose Professional
                  </button>
                </div>

                {/* Enterprise Plan */}
                <div style={{
                  background: 'var(--brikk-dark-bg)',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Enterprise</h3>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Custom</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--brikk-slate-text)', marginBottom: '1.5rem' }}>contact sales</div>
                  <ul style={{ 
                    textAlign: 'left', 
                    fontSize: '0.875rem', 
                    color: 'var(--brikk-slate-text)',
                    listStyle: 'none',
                    padding: 0,
                    marginBottom: '1.5rem'
                  }}>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> Unlimited API calls
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> Unlimited agents
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> HIPAA compliance
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--brikk-teal)' }}>✓</span> Dedicated support
                    </li>
                  </ul>
                  <button style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid #f59e0b',
                    color: '#f59e0b',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    Contact Sales
                  </button>
                </div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  style={{
                    background: 'transparent',
                    color: 'var(--brikk-slate-text)',
                    border: '1px solid var(--brikk-card-border)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div style={{
            minHeight: '100vh',
            background: 'var(--brikk-dark-bg)',
            color: 'var(--brikk-white)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              background: 'var(--brikk-card-bg)',
              border: '1px solid var(--brikk-card-border)',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center'
            }}>
              <h2 style={{ marginBottom: '1rem' }}>⚙️ Account Settings</h2>
              <p style={{ color: 'var(--brikk-slate-text)', marginBottom: '1.5rem' }}>
                Account settings will be available in the next update.
              </p>
              <button
                onClick={() => setCurrentPage('dashboard')}
                style={{
                  background: 'var(--brikk-gradient)',
                  color: 'var(--brikk-white)',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      default:
        return (
          <LandingPage 
            onSignup={handleSignup}
            onLogin={handleLogin}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--brikk-dark-bg)',
        color: 'var(--brikk-white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '1.125rem'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '3px solid var(--brikk-purple)',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          Loading Brikk - The Economic Infrastructure for AI Agents...
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Show enhanced header on all pages except signup */}
      {currentPage !== 'signup' && (
        <EnhancedHeader
          user={user}
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onSignup={handleSignup}
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}
      
      {renderCurrentPage()}
    </div>
  );
}

export default App;

