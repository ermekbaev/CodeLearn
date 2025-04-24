import React from 'react';

interface CourseListSkeletonProps {
  count?: number;
}

const CourseListSkeleton: React.FC<CourseListSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse"
        >
          <div className="p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            </div>
            
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-6"></div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"></div>
            </div>
            
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseListSkeleton;