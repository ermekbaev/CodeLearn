import React from 'react';

const CourseDetailSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Основной блок с информацией о курсе (Скелетон) */}
      <div className="md:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
          <div className="h-3 bg-gray-200 dark:bg-gray-700"></div>
          <div className="p-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mr-4"></div>
              <div className="flex-1">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mb-4"></div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Уроки курса (Скелетон) */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
          <div className="flex items-center mb-6">
            <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
          </div>
          
          {/* Скелетон элементов списка уроков */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2 md:mb-0"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mt-2"></div>
                  <div className="mt-3 flex justify-end">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Сайдбар (Скелетон) */}
      <div className="md:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
          
          <div className="space-y-4">
            {/* Автор */}
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
            </div>
            
            {/* Обновлен */}
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
            
            {/* Уровень */}
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
            </div>
            
            {/* Что вы изучите */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-start">
                    <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Кнопка */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailSkeleton;