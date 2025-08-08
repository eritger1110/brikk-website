import React from 'react';
import { Activity, Clock, Zap, Database, Shield, Code } from 'lucide-react';
import StatusBadge from './StatusBadge';
import '../App.css';

const AgentCard = ({ 
  language, 
  status = 'active', 
  capabilities = [], 
  performance = 95,
  lastSeen = 'Just now',
  specialization = '',
  className = ''
}) => {
  const getLanguageConfig = () => {
    const configs = {
      python: {
        color: '#3776ab',
        bgGradient: 'from-blue-500/20 to-yellow-500/20',
        icon: '🐍',
        description: 'AI & Data Processing'
      },
      nodejs: {
        color: '#339933',
        bgGradient: 'from-green-500/20 to-yellow-500/20',
        icon: '⚡',
        description: 'Real-time APIs'
      },
      java: {
        color: '#ed8b00',
        bgGradient: 'from-orange-500/20 to-red-500/20',
        icon: '☕',
        description: 'Enterprise Integration'
      },
      go: {
        color: '#00add8',
        bgGradient: 'from-cyan-500/20 to-blue-500/20',
        icon: '🚀',
        description: 'High Performance'
      },
      rust: {
        color: '#ce422b',
        bgGradient: 'from-red-500/20 to-orange-500/20',
        icon: '🦀',
        description: 'Systems Programming'
      },
      csharp: {
        color: '#239120',
        bgGradient: 'from-purple-500/20 to-blue-500/20',
        icon: '#️⃣',
        description: 'Business Logic'
      }
    };
    
    return configs[language.toLowerCase()] || {
      color: '#6b7280',
      bgGradient: 'from-gray-500/20 to-gray-400/20',
      icon: '💻',
      description: 'General Purpose'
    };
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'active': return Activity;
      case 'busy': return Zap;
      case 'inactive': return Clock;
      default: return Activity;
    }
  };

  const config = getLanguageConfig();
  const StatusIcon = getStatusIcon();

  return (
    <div className={`
      brikk-agent-card group cursor-pointer
      bg-gradient-to-br ${config.bgGradient}
      ${className}
    `}>
      {/* Header with language and status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold text-white shadow-lg"
            style={{ backgroundColor: config.color }}
          >
            {config.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground capitalize">
              {language}
            </h3>
            <p className="text-sm text-muted-foreground">
              {config.description}
            </p>
          </div>
        </div>
        
        <StatusBadge 
          status={status} 
          text={status.charAt(0).toUpperCase() + status.slice(1)}
          size="small"
        />
      </div>
      
      {/* Performance metrics */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Performance</span>
          <span className="text-sm font-bold text-foreground">{performance}%</span>
        </div>
        <div className="brikk-progress-bar">
          <div 
            className="brikk-progress-fill"
            style={{ width: `${performance}%` }}
          ></div>
        </div>
      </div>
      
      {/* Capabilities */}
      {capabilities.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Capabilities</h4>
          <div className="flex flex-wrap gap-1">
            {capabilities.slice(0, 3).map((capability, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
              >
                {capability}
              </span>
            ))}
            {capabilities.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{capabilities.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      
      {/* Specialization */}
      {specialization && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Specialization</h4>
          <p className="text-sm text-foreground">{specialization}</p>
        </div>
      )}
      
      {/* Footer with last seen and quick actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Clock size={12} />
          <span>{lastSeen}</span>
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="p-1 hover:bg-primary/10 rounded text-primary transition-colors">
            <Code size={14} />
          </button>
          <button className="p-1 hover:bg-primary/10 rounded text-primary transition-colors">
            <Database size={14} />
          </button>
          <button className="p-1 hover:bg-primary/10 rounded text-primary transition-colors">
            <Shield size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;

