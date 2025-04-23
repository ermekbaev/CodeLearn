import React, { ReactNode } from 'react';
import Header from '@/app/components/Header';
import AnimatedDiv from '@/app/components/AnimatedDiv';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  showHeading?: boolean;
  headerActions?: ReactNode;
  headerBgImage?: string;
  description?: string;
  fullWidth?: boolean;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  showHeading = false,
  headerActions,
  headerBgImage,
  description,
  fullWidth = false,
  className = ''
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="flex-1">
        {showHeading && (
          <AnimatedDiv>
            <div className={`${
              headerBgImage 
                ? `bg-cover bg-center` 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600'
              } rounded-2xl shadow-xl overflow-hidden mb-8 ${fullWidth ? '' : 'container mx-auto px-4'}`}
              style={headerBgImage ? { backgroundImage: `url(${headerBgImage})` } : {}}
            >
              <div className="p-8 md:p-12 text-white">
                {title && <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>}
                {description && <p className="text-lg md:text-xl mb-6 opacity-90">{description}</p>}
                {headerActions && <div className="mt-6">{headerActions}</div>}
              </div>
            </div>
          </AnimatedDiv>
        )}
        
        <div className={`${fullWidth ? 'w-full px-4' : 'container mx-auto px-4'} py-8 ${className}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageContainer;