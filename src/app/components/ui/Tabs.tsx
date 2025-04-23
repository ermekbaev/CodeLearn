import React, { ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'light' | 'pills' | 'underline';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'light',
  className = ''
}) => {
  const getTabStyles = (tab: TabItem) => {
    const isActive = tab.id === activeTab;
    const isDisabled = tab.disabled;
    
    const baseClasses = 'flex items-center transition-all';
    const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    
    if (variant === 'light') {
      return `${baseClasses} ${disabledClasses} py-2 px-4 rounded-md ${
        isActive 
          ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-medium' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`;
    } else if (variant === 'pills') {
      return `${baseClasses} ${disabledClasses} py-2 px-3 rounded-full ${
        isActive 
          ? 'bg-indigo-600 text-white font-medium' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
      }`;
    } else if (variant === 'underline') {
      return `${baseClasses} ${disabledClasses} py-4 px-4 border-b-2 ${
        isActive 
          ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-medium' 
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      }`;
    }
    
    return baseClasses;
  };
  
  const getContainerStyles = () => {
    if (variant === 'light') {
      return 'flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg';
    } else if (variant === 'pills') {
      return 'flex space-x-2';
    } else if (variant === 'underline') {
      return 'flex -mb-px border-b border-gray-200 dark:border-gray-700';
    }
    
    return 'flex';
  };
  
  return (
    <div className={`${getContainerStyles()} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={getTabStyles(tab)}
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;