import React, { ReactNode } from 'react';
import { CheckCircle } from 'lucide-react';

interface AchievementCardProps {
  name: string;
  description: string;
  icon: ReactNode;
  earned: boolean;
  className?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  name,
  description,
  icon,
  earned = false,
  className = ''
}) => {
  return (
    <div 
      className={`border rounded-xl p-5 flex flex-col items-center text-center ${
        earned 
          ? 'border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20' 
          : 'border-gray-200 dark:border-gray-700 opacity-60'
      } ${className}`}
    >
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
        earned 
          ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-400' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
      }`}>
        {icon}
      </div>
      
      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{name}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{description}</p>
      
      {earned ? (
        <span className="text-green-600 dark:text-green-400 text-xs flex items-center">
          <CheckCircle size={14} className="mr-1" />
          Получено
        </span>
      ) : (
        <span className="text-gray-500 dark:text-gray-400 text-xs">В процессе</span>
      )}
    </div>
  );
};

export default AchievementCard;