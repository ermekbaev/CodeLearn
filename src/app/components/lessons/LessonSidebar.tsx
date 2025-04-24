import React from 'react';
import { CheckSquare } from 'lucide-react';
import AnimatedDiv from '../AnimatedDiv';
import { Lesson } from '@/types/courses';
import ProgressBar from '../ui/ProgressBar';
import Card from '../ui/Card';

interface LessonSidebarProps {
  lesson: Lesson;
  courseId: string;
  courseName: string;
  courseProgress?: number;
  showResources: boolean;
  onToggleResources: () => void;
}

const LessonSidebar: React.FC<LessonSidebarProps> = ({
  lesson,
  courseId,
  courseName = 'Курс',
  courseProgress = 25, // Демо значение прогресса
  showResources,
  onToggleResources
}) => {
  // Генерируем список разделов содержимого урока из его контента
  const generateTOC = (content: string | undefined) => {
    if (!content) return [];
    
    const toc: {title: string; level: number; anchor: string}[] = [];
    const lines = content.split('\n');
    
    lines.forEach(line => {
      if (line.startsWith('## ')) {
        const title = line.replace('## ', '');
        toc.push({
          title,
          level: 1,
          anchor: title.toLowerCase().replace(/\s+/g, '-')
        });
      } else if (line.startsWith('### ')) {
        const title = line.replace('### ', '');
        toc.push({
          title,
          level: 2,
          anchor: title.toLowerCase().replace(/\s+/g, '-')
        });
      }
    });
    
    return toc;
  };
  
  const tableOfContents = generateTOC(lesson.content);
  
  // Дополнительные материалы (демо)
  const resources = [
    { title: 'MDN Web Docs - JavaScript Variables', url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements' },
    { title: 'MDN Web Docs - JavaScript Data Types', url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures' },
    { title: 'JavaScript.info - Variables', url: 'https://javascript.info/variables' }
  ];
  
  return (
    <AnimatedDiv delay={200}>
      <Card className="p-5 sticky top-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white">Навигация по уроку</h3>
          <button 
            onClick={onToggleResources}
            className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
          >
            {showResources ? 'Скрыть ресурсы' : 'Ресурсы'}
          </button>
        </div>
        
        <div className="space-y-3 mb-6">
          {tableOfContents.map((item, index) => (
            <div key={index} className={`flex items-center ${item.level === 2 ? 'pl-5' : ''}`}>
              <div className={`${
                item.level === 1 
                  ? 'w-2 h-8 bg-indigo-600 rounded-r-md mr-3' 
                  : 'w-1.5 h-6 bg-indigo-400 rounded-r-md mr-3'
              }`}></div>
              <a href={`#${item.anchor}`} className={`${
                item.level === 1 
                  ? 'text-gray-800 dark:text-white font-medium' 
                  : 'text-gray-700 dark:text-gray-300'
              } hover:text-indigo-600 dark:hover:text-indigo-400`}>
                {item.title}
              </a>
            </div>
          ))}
        </div>
        
        {showResources && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h4 className="font-medium text-gray-800 dark:text-white mb-3">Дополнительные материалы</h4>
            <div className="pl-2 space-y-2 text-sm">
              {resources.map((resource, index) => (
                <a 
                  key={index} 
                  href={resource.url}
                  className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {resource.title}
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-800 dark:text-white mb-3">Ваш прогресс</h4>
          <ProgressBar
            progress={courseProgress}
            label={`Курс ${courseName}`}
            showPercentage={true}
            className="mb-4"
          />
          
          <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm mt-4">
            <CheckSquare size={16} className="text-green-500 mr-2" />
            <span>Урок {lesson.order || '?'} из 12</span>
          </div>
        </div>
      </Card>
    </AnimatedDiv>
  );
};

export default LessonSidebar;
