import React, { ReactNode } from 'react';

type StatCardVariant = 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'neutral';

interface StatCardProps {
  value: string | number;
  label: string;
  icon: ReactNode;
  variant?: StatCardVariant;
  className?: string;
}


const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  variant = 'primary',
  className = ''
}) => {
  const variantClasses = {
    primary: {
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      iconBg: 'bg-indigo-100 dark:bg-indigo-800',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      iconBg: 'bg-green-100 dark:bg-green-800',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      iconBg: 'bg-yellow-100 dark:bg-yellow-800',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    danger: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      iconBg: 'bg-red-100 dark:bg-red-800',
      iconColor: 'text-red-600 dark:text-red-400'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      iconBg: 'bg-purple-100 dark:bg-purple-800',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    neutral: {
      bg: 'bg-gray-50 dark:bg-gray-800/50',
      iconBg: 'bg-gray-100 dark:bg-gray-700',
      iconColor: 'text-gray-600 dark:text-gray-400'
    }
  };
  
  const { bg, iconBg, iconColor } = variantClasses[variant];
  
  return (
    <div className={`${bg} p-4 rounded-xl ${className}`}>
      <div className="flex items-center">
        <div className={`${iconBg} p-3 rounded-lg mr-4`}>
          <div className={`h-6 w-6 ${iconColor}`}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className="font-medium text-gray-800 dark:text-white">{value}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;