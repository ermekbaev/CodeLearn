import React from 'react';
import { Award } from 'lucide-react';
import AnimatedDiv from '../AnimatedDiv';
import { Course, Lesson } from '@/types/courses';
import Button from '../ui/Button';

interface CourseDetailSidebarProps {
  course: Course;
  lessons: Lesson[];
  progress: number;
  onContinueLearning: () => void;
}

const CourseDetailSidebar: React.FC<CourseDetailSidebarProps> = ({
  course,
  lessons,
  progress,
  onContinueLearning
}) => {
  const hasStartedCourse = progress > 0;
  const nextLessonText = hasStartedCourse ? 'Продолжить обучение' : 'Начать обучение';
  
  return (
    <AnimatedDiv delay={300} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sticky top-6">
      <h3 className="font-semibold text-gray-800 dark:text-white mb-4">О курсе</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Автор</h4>
          <div className="flex items-center">
            <div className="bg-indigo-100 dark:bg-indigo-800 w-8 h-8 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-2">
              {course.author?.substring(0, 1) || 'A'}
            </div>
            <span className="text-gray-800 dark:text-white">{course.author || 'Администратор'}</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Обновлен</h4>
          <div className="text-gray-800 dark:text-white">{course.updatedAt || new Date().toLocaleDateString()}</div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Уровень</h4>
          <div className="text-gray-800 dark:text-white flex items-center">
            <Award size={16} className="mr-2 text-indigo-500" />
            {course.level || 'Начинающий'}
          </div>
        </div>
        
        {course.skills && course.skills.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Что вы изучите</h4>
            <ul className="space-y-2">
              {course.skills.map((skill, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {course.requirements && course.requirements.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Требования</h4>
            <ul className="space-y-2">
              {course.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {lessons && lessons.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <Button 
              onClick={onContinueLearning}
              variant="primary"
              fullWidth={true}
              gradient={true}
            >
              {nextLessonText}
            </Button>
          </div>
        )}
      </div>
    </AnimatedDiv>
  );
};

export default CourseDetailSidebar;