import React from 'react';
import { Layout } from 'lucide-react';

interface EmptyCoursesStateProps {
  filter: string;
  onFindCourses: () => void;
}

const EmptyCoursesState: React.FC<EmptyCoursesStateProps> = ({ 
  filter,
  onFindCourses
}) => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
        <Layout className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
        {filter === 'all' ? 'У вас пока нет курсов' : 'Курсы не найдены'}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {filter === 'all' 
          ? 'Начните своё обучение, выбрав один из наших популярных курсов программирования' 
          : 'Попробуйте другие фильтры или вернитесь к просмотру всех курсов'}
      </p>
      <button 
        onClick={onFindCourses} 
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Найти курсы
      </button>
    </div>
  );
};

export default EmptyCoursesState;