import React from 'react';

type FilterType = 'all' | 'inProgress' | 'completed' | 'notStarted';

interface CourseFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: FilterType) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  activeFilter,
  onFilterChange
}) => {
  const filters = [
    { id: 'all', label: 'Все' },
    { id: 'inProgress', label: 'В процессе' },
    { id: 'completed', label: 'Завершенные' },
    { id: 'notStarted', label: 'Не начатые' }
  ];
  
  return (
    <div className="flex space-x-2">
      {filters.map(filter => (
        <button 
          key={filter.id}
          onClick={() => onFilterChange(filter.id as FilterType)}
          className={`${
            activeFilter === filter.id 
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          } px-4 py-2 rounded-lg transition-colors ${
            filter.id === 'all' ? 'font-medium' : ''
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default CourseFilters;