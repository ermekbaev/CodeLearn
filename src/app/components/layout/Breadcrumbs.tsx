import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export interface BreadcrumbItem {
  /**
   * Label text to display
   */
  label: string;
  /**
   * URL or path for navigation (optional)
   */
  href?: string;
  /**
   * Optional icon to display
   */
  icon?: ReactNode;
  /**
   * Is the current active item
   */
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
  backButtonText?: string;
  backUrl?: string;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showBackButton = true,
  backButtonText = 'Назад',
  backUrl,
  className = ''
}) => {
  const router = useRouter();
  
  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else if (items.length > 1 && items[0].href) {
      router.push(items[0].href);
    } else {
      router.back();
    }
  };
  
  return (
    <div className={`flex items-center space-x-2 mb-6 ${className}`}>
      {showBackButton && (
        <>
          <button 
            onClick={handleBack}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center"
          >
            <ArrowLeft size={18} className="mr-1" />
            {backButtonText}
          </button>
          
          {items.length > 0 && (
            <span className="text-gray-400">/</span>
          )}
        </>
      )}
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400">/</span>}
          
          {item.href && !item.active ? (
            <button
              onClick={() => router.push(item.href!)}
              className={`
                flex items-center 
                ${item.active 
                  ? 'text-gray-900 dark:text-white font-medium' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}
              `}
            >
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </button>
          ) : (
            <span className={`
              flex items-center 
              ${item.active 
                ? 'text-gray-900 dark:text-white font-medium' 
                : 'text-gray-700 dark:text-gray-300'}
            `}>
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;