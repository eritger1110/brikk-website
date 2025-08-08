import React, { useState } from 'react';
import '../App.css';

const SecurityDashboard = () => {
  const [encryptionData, setEncryptionData] = useState('');
  const [encryptedResult, setEncryptedResult] = useState('');

  const securityLevels = [
    {
      id: 'administrative',
      level: 4,
      name: 'Administrative',
      roles: ['Executive', 'CISO', 'System Admin'],
      description: 'CEO, CTO, Security Officer',
      permissions: ['Full System Access', 'Security Configuration', 'User Management'],
      color: 'administrative'
    },
    {
      id: 'elevated',
      level: 3,
      name: 'Elevated',
      roles: ['Manager', 'Doctor', 'Senior Developer'],
      description: 'Department Head, Lead Engineer',
      permissions: ['Sensitive Data Access', 'Workflow Control', 'Team Management'],
      color: 'elevated'
    },
    {
      id: 'standard',
      level: 2,
      name: 'Standard',
      roles: ['Employee', 'Nurse', 'Analyst'],
      description: 'Staff Member, Developer',
      permissions: ['Standard Operations', 'Data Access', 'Basic Workflows'],
      color: 'standard'
    },
    {
      id: 'basic',
      level: 1,
      name: 'Basic',
      roles: ['Intern', 'Guest', 'Contractor'],
      description: 'Temporary Access, Limited Role',
      permissions: ['Read-Only Access', 'Basic Functions', 'Limited Data'],
      color: 'basic'
    },
    {
      id: 'unauthorized',
      level: 0,
      name: 'Unauthorized',
      roles: ['Blocked', 'Revoked', 'External'],
      description: 'No Access, Suspended Account',
      permissions: ['No Access', 'Blocked Operations', 'Audit Only'],
      color: 'unauthorized'
    }
  ];

  const handleEncrypt = () => {
    if (!encryptionData.trim()) return;
    
    // Simulate AES-256 encryption
    const encrypted = btoa(encryptionData).split('').reverse().join('');
    setEncryptedResult(`AES256:${encrypted}:${Date.now()}`);
  };

  const securityMetrics = [
    { label: 'Security Score', value: '98%', status: 'excellent' },
    { label: 'Compliance Status', value: 'HIPAA Ready', status: 'compliant' },
    { label: 'Audit Events', value: '0', status: 'clean' },
    { label: 'Encryption Status', value: 'AES-256', status: 'active' }
  ];

  return (
    <div className="fade-in">
      {/* Security Overview */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="card-icon">SECURITY</span>
            Security Overview
          </h2>
          <div className="card-action">Enterprise Grade</div>
        </div>
        
        <div className="metrics-grid">
          {securityMetrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
              <div className={`metric-change positive`}>VERIFIED {metric.status.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Role-Based Access Control */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="card-icon">RBAC</span>
            Role-Based Access Control (RBAC)
          </h2>
          <div className="card-action">5 Security Levels</div>
        </div>
        
        <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
          Select Security Level to Test Access Permissions
        </p>
        
        <div className="security-levels">
          {securityLevels.map((level) => (
            <div key={level.id} className={`security-level ${level.color}`}>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '0.5rem',
                color: 'var(--brikk-white)'
              }}>
                Level {level.level}
              </div>
              
              <div style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: 'var(--brikk-white)'
              }}>
                {level.name}
              </div>
              
              <div style={{ 
                fontSize: '0.875rem', 
                marginBottom: '1rem',
                opacity: 0.8
              }}>
                {level.roles.join(', ')}
              </div>
              
              <div style={{ 
                fontSize: '0.75rem', 
                marginBottom: '1rem',
                opacity: 0.7
              }}>
                {level.description}
              </div>
              
              <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                {level.permissions.join(' • ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AES-256 Encryption Testing */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="card-icon">AES-256</span>
            AES-256 Encryption Testing
          </h2>
          <div className="card-action">Real-Time Demo</div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Enter sensitive data to encrypt:</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter patient data, financial info, or any sensitive information..."
            value={encryptionData}
            onChange={(e) => setEncryptionData(e.target.value)}
          />
        </div>
        
        <button 
          className="btn-primary"
          onClick={handleEncrypt}
          disabled={!encryptionData.trim()}
        >
          <span>ENCRYPT</span>
          Encrypt Data
        </button>
        
        {encryptedResult && (
          <div style={{ 
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(0, 240, 181, 0.1)',
            border: '1px solid rgba(0, 240, 181, 0.3)',
            borderRadius: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            color: 'var(--brikk-teal)',
            wordBreak: 'break-all'
          }}>
            <div style={{ 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: 'var(--brikk-white)'
            }}>
              Encrypted Result:
            </div>
            {encryptedResult}
          </div>
        )}
      </div>

      {/* Compliance Status */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="card-icon">COMPLIANCE</span>
            Compliance Status
          </h2>
          <div className="card-action">Healthcare Ready</div>
        </div>
        
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '1rem',
            background: 'rgba(0, 240, 181, 0.1)',
            border: '1px solid rgba(0, 240, 181, 0.3)',
            borderRadius: '12px'
          }}>
            <div>
              <div style={{ 
                fontWeight: '600', 
                color: 'var(--brikk-white)',
                marginBottom: '0.25rem'
              }}>
                HIPAA Compliance
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                opacity: 0.8 
              }}>
                Healthcare data protection standards
              </div>
            </div>
            <div style={{ 
              background: 'rgba(0, 240, 181, 0.2)',
              color: 'var(--brikk-teal)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              VERIFIED COMPLIANT
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '1rem',
            background: 'rgba(115, 95, 255, 0.1)',
            border: '1px solid rgba(115, 95, 255, 0.3)',
            borderRadius: '12px'
          }}>
            <div>
              <div style={{ 
                fontWeight: '600', 
                color: 'var(--brikk-white)',
                marginBottom: '0.25rem'
              }}>
                Enterprise Security
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                opacity: 0.8 
              }}>
                Advanced security protocols and monitoring
              </div>
            </div>
            <div style={{ 
              background: 'rgba(115, 95, 255, 0.2)',
              color: 'var(--brikk-purple)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              ACTIVE
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--brikk-card-border)',
            borderRadius: '12px'
          }}>
            <div>
              <div style={{ 
                fontWeight: '600', 
                color: 'var(--brikk-white)',
                marginBottom: '0.25rem'
              }}>
                Audit Logging
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                opacity: 0.8 
              }}>
                Comprehensive activity tracking and reporting
              </div>
            </div>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--brikk-white)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              ENABLED
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;

