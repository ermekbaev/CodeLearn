import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Card from '../ui/Card';

interface ErrorDisplayProps {
  message: string;
  title?: string;
  backAction?: () => void;
  backLabel?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  title = 'Ошибка',
  backAction,
  backLabel = 'Назад'
}) => {
  return (
    <Card className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 shadow-none">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>{message}</p>
      
      {backAction && (
        <button 
          onClick={backAction}
          className="mt-4 inline-flex items-center text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          {backLabel}
        </button>
      )}
    </Card>
  );
};

export default ErrorDisplay;