import React from 'react';
import { Clock, User, Star } from 'lucide-react';
import AnimatedDiv from '../AnimatedDiv';
import LanguageIcon from '../Language/LanguageIcon';
import { Course } from '@/types/courses';
import ProgressBar from '../ui/ProgressBar';

interface CourseDetailHeaderProps {
  course: Course;
  progress?: number;
}

const CourseDetailHeader: React.FC<CourseDetailHeaderProps> = ({
  course,
  progress = 0
}) => {
  return (
    <AnimatedDiv className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="h-3 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
      <div className="p-6">
        <div className="flex items-start">
          <div className="mr-4"> 
            <LanguageIcon language={course.image || course.language} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {course.title || 'Загрузка...'}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs rounded-full font-medium">
                {course.language}
              </span>
              <span className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                <Clock size={14} className="mr-1" />
                {course.lessonsCount} уроков
              </span>
              <span className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                <User size={14} className="mr-1" />
                {course.students} учеников
              </span>
              <span className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                <Star size={14} className="mr-1 text-yellow-500" />
                {course.rating}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {course.description}
            </p>
            
            {progress > 0 && (
              <ProgressBar 
                progress={progress}
                label="Прогресс курса"
                showPercentage={true}
              />
            )}
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default CourseDetailHeader;