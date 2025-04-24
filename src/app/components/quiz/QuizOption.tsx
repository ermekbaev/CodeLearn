import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import Card from '../ui/Card';

interface QuizOptionProps {
  text: string;
  isSelected: boolean;
  isSubmitted: boolean;
  userAnsweredCorrectly: boolean;
  isCorrectOption: boolean;
  onClick: () => void;
  className?: string;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  text,
  isSelected,
  isSubmitted,
  userAnsweredCorrectly,
  isCorrectOption,
  onClick,
  className = ''
}) => {
  // Определяем стили в зависимости от состояния
  const getContainerStyle = () => {
    // Если форма не отправлена
    if (!isSubmitted) {
      return isSelected 
        ? 'bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-500 dark:border-indigo-400' 
        : 'hover:border-gray-400 dark:hover:border-gray-500 border-2 border-gray-200 dark:border-gray-700';
    }
    
    // Если форма отправлена и это выбранный пользователем вариант
    if (isSelected) {
      return userAnsweredCorrectly 
        ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-600' 
        : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500 dark:border-red-600';
    }
    
    // Если форма отправлена, но это не выбранный вариант
    // Показываем правильный ответ только если пользователь ответил неправильно
    if (isCorrectOption && !userAnsweredCorrectly) {
      return 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-600';
    }
    
    // Для всех остальных случаев
    return 'border-2 border-gray-200 dark:border-gray-700';
  };
  
  return (
    <Card 
      className={`${getContainerStyle()} shadow-none ${className} ${!isSubmitted ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={() => !isSubmitted && onClick()}
    >
      <div className="p-4">
        <div className="flex items-center">
          <div className={`w-6 h-6 rounded-full border-2 ${
            isSelected 
              ? isSubmitted 
                ? userAnsweredCorrectly 
                  ? 'border-green-500 bg-green-500 dark:border-green-600 dark:bg-green-600' 
                  : 'border-red-500 bg-red-500 dark:border-red-600 dark:bg-red-600'
                : 'border-indigo-500 bg-indigo-500 dark:border-indigo-400 dark:bg-indigo-400' 
              : 'border-gray-400 dark:border-gray-500'
          } flex items-center justify-center mr-3`}>
            {isSelected && (
              isSubmitted && !userAnsweredCorrectly 
                ? <X className="w-4 h-4 text-white" />
                : <CheckCircle className="w-4 h-4 text-white" />
            )}
            {!isSelected && isSubmitted && isCorrectOption && !userAnsweredCorrectly && (
              <CheckCircle className="w-4 h-4 text-white" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-800 dark:text-white">{text}</div>
            {isSubmitted && isSelected && userAnsweredCorrectly && (
              <div className="text-green-600 dark:text-green-400 text-sm mt-1">Правильный ответ!</div>
            )}
            {isSubmitted && isSelected && !userAnsweredCorrectly && (
              <div className="text-red-600 dark:text-red-400 text-sm mt-1">Неправильный ответ</div>
            )}
            {isSubmitted && !isSelected && isCorrectOption && !userAnsweredCorrectly && (
              <div className="text-green-600 dark:text-green-400 text-sm mt-1">Правильный ответ</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuizOption;