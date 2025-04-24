import React from 'react';
import { useRouter } from 'next/navigation';
import { Clock, CheckSquare, ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

interface LessonItemProps {
  id: string;
  title: string;
  order: number;
  courseId: string;
  completed?: boolean;
  hasQuiz?: boolean;
  duration?: string;
  description?: string;
  className?: string;
}

const LessonItem: React.FC<LessonItemProps> = ({
  id,
  title,
  order,
  courseId,
  completed = false,
  hasQuiz = false,
  duration = '15 минут',
  description,
  className = ''
}) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/courses/${courseId}/lessons/${id}`);
  };
  
  return (
    <Card 
      className={`border border-gray-200 dark:border-gray-700 ${className}`}
      onClick={handleClick}
      hover={true}
    >
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
            completed
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
              : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
          }`}>
            {completed ? (
              <CheckSquare size={18} />
            ) : (
              <span className="text-sm font-medium">{order}</span>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h3 className="font-medium text-gray-800 dark:text-white flex items-center">
              {title}
              {hasQuiz && (
                <Badge 
                  variant="primary" 
                  size="sm" 
                  className="ml-2"
                >
                  Квиз
                </Badge>
              )}
            </h3>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1 md:mt-0">
              <Clock size={14} className="mr-1" />
              {duration}
            </div>
          </div>
          
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
          )}
          
          <div className="mt-3 flex justify-end">
            <button 
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium flex items-center"
            >
              {completed ? 'Повторить урок' : 'Начать урок'}
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LessonItem;