import React from 'react';
import '../App.css';

const LoadingSpinner = ({ 
  size = 'default', 
  message = 'Loading...', 
  overlay = false,
  className = ''
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-6 h-6 border-2';
      case 'large':
        return 'w-16 h-16 border-4';
      default:
        return 'w-10 h-10 border-3';
    }
  };

  const getMessageSize = () => {
    switch (size) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Dual-ring spinner with Brikk gradient */}
      <div className="relative">
        <div className={`
          ${getSizeClasses()}
          border-white/20 border-t-transparent rounded-full animate-spin
        `}></div>
        <div className={`
          absolute inset-0 ${getSizeClasses()}
          border-transparent border-t-purple-500 rounded-full animate-spin
        `} style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        <div className={`
          absolute inset-1 ${getSizeClasses().replace('w-10 h-10', 'w-8 h-8').replace('w-6 h-6', 'w-4 h-4').replace('w-16 h-16', 'w-12 h-12')}
          border-transparent border-t-cyan-400 rounded-full animate-spin
        `} style={{ animationDuration: '1.2s' }}></div>
      </div>
      
      {message && (
        <p className={`text-muted-foreground font-medium ${getMessageSize()}`}>
          {message}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;

