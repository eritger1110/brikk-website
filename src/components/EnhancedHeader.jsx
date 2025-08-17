import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Crown, 
  Zap,
  BarChart3,
  Shield,
  Users,
  BookOpen,
  MessageCircle,
  Github,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import BrikkLogo from '../assets/BrikkLogo.webp';

const EnhancedHeader = ({ 
  user, 
  isAuthenticated, 
  onLogin, 
  onLogout, 
  onSignup, 
  currentPage, 
  onNavigate 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  // Click-away functionality
  useEffect(() => {
    const handleClickAway = (event) => {
      // Close dropdowns when clicking outside
      if (!event.target.closest('[data-dropdown]')) {
        setIsResourcesOpen(false);
        setIsUserMenuOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickAway);
    return () => document.removeEventListener('click', handleClickAway);
  }, []);

  const navigationItems = [
    { id: 'home', label: 'Home', action: () => { onNavigate('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { id: 'features', label: 'Features', action: () => { onNavigate('features'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { id: 'pricing', label: 'Pricing', action: () => { onNavigate('pricing'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { id: 'use-cases', label: 'Use Cases', action: () => { onNavigate('use-cases'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { 
      id: 'resources', 
      label: 'Resources', 
      action: () => { onNavigate('resources'); window.scrollTo({ top: 0, behavior: 'smooth' }); },
      dropdown: [
        { 
          label: 'Documentation', 
          href: 'https://docs.getbrikk.com',
          icon: <BookOpen className="w-4 h-4" />,
          external: true
        },
        { 
          label: 'Discord Community', 
          href: 'https://discord.gg/brikk',
          icon: <MessageCircle className="w-4 h-4" />,
          external: true
        },
        { 
          label: 'GitHub Examples', 
          href: 'https://github.com/brikk-ai/examples',
          icon: <Github className="w-4 h-4" />,
          external: true
        },
        { 
          label: 'API Reference', 
          href: 'https://docs.getbrikk.com/api',
          icon: <BarChart3 className="w-4 h-4" />,
          external: true
        }
      ]
    }
  ];

  const userMenuItems = [
    { 
      label: 'Dashboard', 
      icon: <BarChart3 className="w-4 h-4" />, 
      action: () => onNavigate('dashboard') 
    },
    { 
      label: 'Account Settings', 
      icon: <Settings className="w-4 h-4" />, 
      action: () => onNavigate('settings') 
    },
    { 
      label: 'Upgrade Plan', 
      icon: <Crown className="w-4 h-4" />, 
      action: () => onNavigate('upgrade'),
      highlight: true
    },
    { 
      label: 'Logout', 
      icon: <LogOut className="w-4 h-4" />, 
      action: onLogout,
      separator: true
    }
  ];

  const getUserTier = () => {
    if (!user) return null;
    return user.tier || 'Free';
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Free': return 'var(--brikk-teal)';
      case 'Starter': return 'var(--brikk-purple)';
      case 'Professional': return '#f59e0b';
      case 'Enterprise': return '#ef4444';
      default: return 'var(--brikk-teal)';
    }
  };

  const handleNavClick = (item) => {
    if (item.dropdown) {
      setIsResourcesOpen(!isResourcesOpen);
      return;
    }
    
    if (item.action) {
      item.action();
    } else if (item.href && item.href.startsWith('#')) {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.href) {
      window.open(item.href, '_blank');
    }
    
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
  };

  return (
    <header style={{
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--brikk-card-border)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '1rem 0'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div 
          onClick={() => {
            onNavigate('home');
            // Scroll to top of page
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <img 
            src={BrikkLogo} 
            alt="Brikk Logo" 
            style={{
              height: '72px',
              width: 'auto'
            }}
          />
        </div>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          '@media (max-width: 768px)': {
            display: 'none'
          }
        }}>
          {navigationItems.map((item) => (
            <div key={item.id} style={{ position: 'relative' }} data-dropdown>
              <button
                onClick={() => handleNavClick(item)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentPage === item.id ? 'var(--brikk-white)' : 'var(--brikk-slate-text)',
                  fontSize: '1rem',
                  fontWeight: currentPage === item.id ? '600' : '500',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.color = 'var(--brikk-white)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.id) {
                    e.target.style.color = 'var(--brikk-slate-text)';
                  }
                }}
              >
                {item.label}
                {item.dropdown && <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Resources Dropdown */}
              {item.dropdown && isResourcesOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'rgba(15, 23, 42, 0.98)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  minWidth: '200px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  zIndex: 1001
                }}>
                  {item.dropdown.map((dropdownItem, index) => (
                    <a
                      key={index}
                      href={dropdownItem.href}
                      target={dropdownItem.external ? '_blank' : '_self'}
                      rel={dropdownItem.external ? 'noopener noreferrer' : ''}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem',
                        color: 'var(--brikk-slate-text)',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'var(--brikk-dark-bg)';
                        e.target.style.color = 'var(--brikk-white)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--brikk-slate-text)';
                      }}
                    >
                      {dropdownItem.icon}
                      {dropdownItem.label}
                      {dropdownItem.external && <ExternalLink className="w-3 h-3 ml-auto" />}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {isAuthenticated ? (
            <div style={{ position: 'relative' }} data-dropdown>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  background: 'var(--brikk-card-bg)',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  color: 'var(--brikk-white)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--brikk-purple)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--brikk-card-border)';
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--brikk-gradient)',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: '500' }}>
                    {user?.name || 'Developer'}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem',
                    color: getTierColor(getUserTier()),
                    fontWeight: '500'
                  }}>
                    {getUserTier()} Tier
                  </div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'rgba(15, 23, 42, 0.98)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--brikk-card-border)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  minWidth: '200px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                  zIndex: 1001,
                  marginTop: '0.5rem'
                }}>
                  {userMenuItems.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.separator && (
                        <div style={{
                          height: '1px',
                          background: 'var(--brikk-card-border)',
                          margin: '0.5rem 0'
                        }} />
                      )}
                      <button
                        onClick={item.action}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          background: item.highlight ? 'rgba(115, 95, 255, 0.1)' : 'transparent',
                          border: item.highlight ? '1px solid rgba(115, 95, 255, 0.3)' : 'none',
                          color: item.highlight ? 'var(--brikk-purple)' : 'var(--brikk-slate-text)',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          if (!item.highlight) {
                            e.target.style.background = 'var(--brikk-dark-bg)';
                            e.target.style.color = 'var(--brikk-white)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!item.highlight) {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'var(--brikk-slate-text)';
                          }
                        }}
                      >
                        {item.icon}
                        {item.label}
                        {item.highlight && <Crown className="w-4 h-4 ml-auto" />}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <button
                onClick={onLogin}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--brikk-card-border)',
                  color: 'var(--brikk-slate-text)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--brikk-purple)';
                  e.target.style.color = 'var(--brikk-white)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--brikk-card-border)';
                  e.target.style.color = 'var(--brikk-slate-text)';
                }}
              >
                Login
              </button>
              <button
                onClick={onSignup}
                style={{
                  background: 'var(--brikk-gradient)',
                  border: 'none',
                  color: 'var(--brikk-white)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(115, 95, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <Zap className="w-4 h-4" />
                Start Free
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--brikk-white)',
              cursor: 'pointer',
              padding: '0.5rem',
              '@media (max-width: 768px)': {
                display: 'block'
              }
            }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--brikk-card-bg)',
          border: '1px solid var(--brikk-card-border)',
          borderTop: 'none',
          padding: '1rem',
          display: 'none',
          '@media (max-width: 768px)': {
            display: 'block'
          }
        }}>
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {navigationItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleNavClick(item)}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'var(--brikk-slate-text)',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    padding: '0.75rem',
                    textAlign: 'left',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--brikk-dark-bg)';
                    e.target.style.color = 'var(--brikk-white)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--brikk-slate-text)';
                  }}
                >
                  {item.label}
                </button>
                
                {/* Mobile Resources Dropdown */}
                {item.dropdown && isResourcesOpen && (
                  <div style={{
                    paddingLeft: '1rem',
                    marginTop: '0.5rem'
                  }}>
                    {item.dropdown.map((dropdownItem, index) => (
                      <a
                        key={index}
                        href={dropdownItem.href}
                        target={dropdownItem.external ? '_blank' : '_self'}
                        rel={dropdownItem.external ? 'noopener noreferrer' : ''}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.5rem',
                          color: 'var(--brikk-slate-text)',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'var(--brikk-dark-bg)';
                          e.target.style.color = 'var(--brikk-white)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = 'var(--brikk-slate-text)';
                        }}
                      >
                        {dropdownItem.icon}
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* Click outside handlers */}
      {(isUserMenuOpen || isResourcesOpen) && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsResourcesOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default EnhancedHeader;

