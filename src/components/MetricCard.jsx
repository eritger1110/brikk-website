import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import '../App.css';

const MetricCard = ({ 
  title, 
  value, 
  unit = '', 
  trend = null, 
  trendValue = null,
  icon: Icon,
  status = 'default',
  size = 'default',
  className = ''
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'border-green-500/30 bg-green-500/5';
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'error': return 'border-red-500/30 bg-red-500/5';
      case 'info': return 'border-blue-500/30 bg-blue-500/5';
      default: return 'border-white/10 bg-card';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'p-4';
      case 'large': return 'p-8';
      default: return 'p-6';
    }
  };

  const TrendIcon = getTrendIcon();

  return (
    <div className={`
      brikk-metric-card ${getStatusColor()} ${getSizeClasses()}
      transition-all duration-300 hover:scale-105 hover:shadow-xl
      ${className}
    `}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {Icon && (
              <Icon 
                size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
                className="text-primary" 
              />
            )}
            <h3 className={`
              font-medium text-muted-foreground
              ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'}
            `}>
              {title}
            </h3>
          </div>
          
          <div className="flex items-baseline space-x-2">
            <span className={`
              font-bold text-foreground
              ${size === 'small' ? 'text-xl' : size === 'large' ? 'text-4xl' : 'text-2xl'}
            `}>
              {value}
            </span>
            {unit && (
              <span className={`
                text-muted-foreground
                ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'}
              `}>
                {unit}
              </span>
            )}
          </div>
        </div>
        
        {trend && trendValue && (
          <div className={`
            flex items-center space-x-1 px-2 py-1 rounded-full
            ${getTrendColor()} bg-current/10
          `}>
            <TrendIcon size={14} className="current" />
            <span className={`
              text-xs font-medium current
            `}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
      
      {/* Animated progress bar for certain metrics */}
      {status === 'success' && (
        <div className="mt-4">
          <div className="brikk-progress-bar">
            <div 
              className="brikk-progress-fill"
              style={{ width: `${Math.min(100, (parseFloat(value) / 100) * 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;

