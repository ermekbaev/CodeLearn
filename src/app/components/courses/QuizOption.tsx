import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface QuizOptionProps {
  /**
   * Option text
   */
  text: string;
  /**
   * Is this option selected
   */
  isSelected: boolean;
  /**
   * Has the quiz been submitted
   */
  isSubmitted?: boolean;
  /**
   * Is this the correct answer (regardless of selection)
   */
  isCorrect?: boolean;
  /**
   * Feedback message to show when selected
   */
  feedbackMessage?: string;
  /**
   * Click handler
   */
  onClick: () => void;
  /**
   * Optional CSS classes
   */
  className?: string;
}

/**
 * Quiz option component for displaying multiple-choice options
 */
const QuizOption: React.FC<QuizOptionProps> = ({
  text,
  isSelected,
  isSubmitted = false,
  isCorrect = false,
  feedbackMessage,
  onClick,
  className = ''
}) => {
  // Determine the state-based styling
  const getBorderStyle = () => {
    if (!isSubmitted) {
      // Not submitted yet - just show selection
      return isSelected 
        ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 dark:border-indigo-400'
        : 'hover:border-gray-400 dark:hover:border-gray-500 border-gray-200 dark:border-gray-700';
    }
    
    // After submission
    if (isCorrect) {
      // This is the correct answer
      return 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600';
    } else if (isSelected) {
      // Selected but incorrect
      return 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600';
    } else {
      // Not selected, not correct
      return 'border-gray-200 dark:border-gray-700';
    }
  };

  const getRadioStyle = () => {
    if (!isSubmitted) {
      // Not submitted yet - just show selection
      return isSelected
        ? 'border-indigo-500 bg-indigo-500 dark:border-indigo-400 dark:bg-indigo-400'
        : 'border-gray-400 dark:border-gray-500';
    }
    
    // After submission
    if (isCorrect) {
      // This is the correct answer
      return 'border-green-500 bg-green-500 dark:border-green-600 dark:bg-green-600';
    } else if (isSelected) {
      // Selected but incorrect
      return 'border-red-500 bg-red-500 dark:border-red-600 dark:bg-red-600';
    } else {
      // Not selected, not correct
      return 'border-gray-400 dark:border-gray-500';
    }
  };

  // Icon to show in the radio button
  const getIcon = () => {
    if (!isSubmitted || !isSelected && !isCorrect) {
      return isSelected ? <div className="w-3 h-3 bg-white rounded-full"></div> : null;
    }
    
    if (isCorrect) {
      return <CheckCircle className="w-4 h-4 text-white" />;
    } else if (isSelected) {
      return <X className="w-4 h-4 text-white" />;
    }
    
    return null;
  };

  return (
    <div 
      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${getBorderStyle()} ${className} ${isSubmitted ? 'cursor-default' : 'hover:shadow-sm'}`}
      onClick={() => !isSubmitted && onClick()}
    >
      <div className="flex items-center">
        <div className={`w-6 h-6 rounded-full border-2 ${getRadioStyle()} flex items-center justify-center mr-3 flex-shrink-0`}>
          {getIcon()}
        </div>
        <div>
          <div className="font-medium text-gray-800 dark:text-white">{text}</div>
          {isSubmitted && (
            <>
              {isCorrect && (
                <div className="text-sm mt-1 text-green-600 dark:text-green-400">
                  {feedbackMessage || 'Правильный ответ!'}
                </div>
              )}
              {isSelected && !isCorrect && (
                <div className="text-sm mt-1 text-red-600 dark:text-red-400">
                  Неправильный ответ
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizOption;