import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface QuizOptionProps {
  /**
   * Текст варианта ответа
   */
  text: string;
  /**
   * Выбран ли этот вариант пользователем
   */
  isSelected: boolean;
  /**
   * Была ли форма отправлена
   */
  isSubmitted: boolean;
  /**
   * Правильно ли пользователь ответил на вопрос (в целом)
   */
  userAnsweredCorrectly: boolean;
  /**
   * Является ли данный вариант правильным ответом
   */
  isCorrectOption: boolean;
  /**
   * Обработчик клика
   */
  onClick: () => void;
  /**
   * Дополнительные классы
   */
  className?: string;
}

/**
 * Компонент варианта ответа для квиза
 */
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
        ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 dark:border-indigo-400' 
        : 'hover:border-gray-400 dark:hover:border-gray-500 border-gray-200 dark:border-gray-700';
    }
    
    // Если форма отправлена и это выбранный пользователем вариант
    if (isSelected) {
      return userAnsweredCorrectly 
        ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600' 
        : 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600';
    }
    
    // Если форма отправлена, но это не выбранный вариант
    // Показываем правильный ответ только если пользователь ответил неправильно
    if (isCorrectOption && !userAnsweredCorrectly) {
      return 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600';
    }
    
    // Для всех остальных случаев
    return 'border-gray-200 dark:border-gray-700';
  };
  
  // Стиль для индикатора (кружок слева)
  const getRadioStyle = () => {
    // Если форма не отправлена
    if (!isSubmitted) {
      return isSelected 
        ? 'border-indigo-500 bg-indigo-500 dark:border-indigo-400 dark:bg-indigo-400' 
        : 'border-gray-400 dark:border-gray-500';
    }
    
    // Если форма отправлена и это выбранный пользователем вариант
    if (isSelected) {
      return userAnsweredCorrectly 
        ? 'border-green-500 bg-green-500 dark:border-green-600 dark:bg-green-600' 
        : 'border-red-500 bg-red-500 dark:border-red-600 dark:bg-red-600';
    }
    
    // Если форма отправлена, это правильный ответ, но пользователь выбрал другой вариант
    if (isCorrectOption && !userAnsweredCorrectly) {
      return 'border-green-500 bg-green-500 dark:border-green-600 dark:bg-green-600';
    }
    
    // Для всех остальных случаев
    return 'border-gray-400 dark:border-gray-500';
  };
  
  // Определяем иконку для индикатора
  const getIcon = () => {
    // Если форма не отправлена
    if (!isSubmitted) {
      return isSelected ? <div className="w-3 h-3 bg-white rounded-full"></div> : null;
    }
    
    // Если это выбранный пользователем вариант
    if (isSelected) {
      return userAnsweredCorrectly 
        ? <CheckCircle className="w-4 h-4 text-white" /> 
        : <X className="w-4 h-4 text-white" />;
    }
    
    // Если это правильный ответ, но пользователь выбрал другой вариант
    if (isCorrectOption && !userAnsweredCorrectly) {
      return <CheckCircle className="w-4 h-4 text-white" />;
    }
    
    return null;
  };
  
  // Определяем текст обратной связи
  const getFeedbackText = () => {
    if (!isSubmitted) return null;
    
    if (isSelected && userAnsweredCorrectly) {
      return <div className="text-green-600 dark:text-green-400 text-sm mt-1">Правильный ответ!</div>;
    }
    
    if (isSelected && !userAnsweredCorrectly) {
      return <div className="text-red-600 dark:text-red-400 text-sm mt-1">Неправильный ответ</div>;
    }
    
    if (isCorrectOption && !userAnsweredCorrectly) {
      return <div className="text-green-600 dark:text-green-400 text-sm mt-1">Правильный ответ</div>;
    }
    
    return null;
  };
  
  return (
    <div 
      className={`p-4 border-2 rounded-lg transition-all ${getContainerStyle()} ${className} ${!isSubmitted ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={() => !isSubmitted && onClick()}
    >
      <div className="flex items-center">
        <div className={`w-6 h-6 rounded-full border-2 ${getRadioStyle()} flex items-center justify-center mr-3`}>
          {getIcon()}
        </div>
        <div>
          <div className="font-medium text-gray-800 dark:text-white">{text}</div>
          {getFeedbackText()}
        </div>
      </div>
    </div>
  );
};

export default QuizOption;