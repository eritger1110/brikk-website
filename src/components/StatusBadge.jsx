import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Shield 
} from 'lucide-react';
import '../App.css';

const StatusBadge = ({ 
  status, 
  text, 
  size = 'default',
  showIcon = true,
  className = ''
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-500/10',
          textColor: 'text-green-400',
          borderColor: 'border-green-500/30'
        };
      case 'error':
        return {
          icon: XCircle,
          bgColor: 'bg-red-500/10',
          textColor: 'text-red-400',
          borderColor: 'border-red-500/30'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-500/10',
          textColor: 'text-yellow-400',
          borderColor: 'border-yellow-500/30'
        };
      case 'pending':
        return {
          icon: Clock,
          bgColor: 'bg-blue-500/10',
          textColor: 'text-blue-400',
          borderColor: 'border-blue-500/30'
        };
      case 'active':
        return {
          icon: Activity,
          bgColor: 'bg-green-500/10',
          textColor: 'text-green-400',
          borderColor: 'border-green-500/30'
        };
      case 'secure':
        return {
          icon: Shield,
          bgColor: 'bg-purple-500/10',
          textColor: 'text-purple-400',
          borderColor: 'border-purple-500/30'
        };
      default:
        return {
          icon: Activity,
          bgColor: 'bg-gray-500/10',
          textColor: 'text-gray-400',
          borderColor: 'border-gray-500/30'
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-xs';
      case 'large':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small': return 12;
      case 'large': return 18;
      default: return 14;
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`
      inline-flex items-center space-x-1.5 rounded-full font-medium
      border transition-all duration-200 hover:scale-105
      ${config.bgColor} ${config.textColor} ${config.borderColor}
      ${getSizeClasses()}
      ${className}
    `}>
      {showIcon && (
        <Icon 
          size={getIconSize()} 
          className={`${config.textColor} ${status === 'active' ? 'animate-pulse' : ''}`} 
        />
      )}
      <span>{text}</span>
    </span>
  );
};

export default StatusBadge;

