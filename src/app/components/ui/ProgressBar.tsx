import React from 'react';

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  label?: string;
  info?: string;
  className?: string;
  height?: 'xs' | 'sm' | 'md';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showPercentage = true,
  label,
  info,
  className = '',
  height = 'sm'
}) => {
  const safeProgress = Math.min(Math.max(0, progress), 100);
  
  const heightClasses = {
    xs: 'h-1.5',
    sm: 'h-2.5',
    md: 'h-4'
  };
  
  return (
    <div className={`w-full ${className}`}>
      {(showPercentage || label || info) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          )}
          <div className="flex items-center">
            {info && (
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">{info}</span>
            )}
            {showPercentage && (
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{safeProgress}%</span>
            )}
          </div>
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`bg-gradient-to-r from-indigo-600 to-purple-600 ${heightClasses[height]} rounded-full transition-all duration-500`} 
          style={{ width: `${safeProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;