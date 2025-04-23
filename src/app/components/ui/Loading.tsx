import React from 'react';

type LoadingSize = 'sm' | 'md' | 'lg';

interface LoadingProps {
  size?: LoadingSize;
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  fullScreen = false,
  text,
  className = ''
}) => {
  // Spinner size classes
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-t-2 border-b-2',
    lg: 'h-16 w-16 border-4'
  };
  
  const spinner = (
    <div 
      className={`animate-spin rounded-full ${sizeClasses[size]} border-indigo-500 ${className}`}
      aria-label="Loading"
    ></div>
  );
  
  if (fullScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        {spinner}
        {text && <p className="text-gray-600 dark:text-gray-300 mt-4">{text}</p>}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {spinner}
      {text && <p className="text-gray-600 dark:text-gray-300 mt-4">{text}</p>}
    </div>
  );
};

export default Loading;