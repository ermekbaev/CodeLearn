import React from 'react';
import { Book } from 'lucide-react';
import LessonItem from './LessonItem';
import { Lesson } from '@/types/courses';

interface LessonListProps {
  lessons: Lesson[];
  courseId: string;
  title?: string;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  courseId,
  title = 'Уроки курса'
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <Book size={20} className="mr-2" />
        {title}
      </h2>
      
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <LessonItem 
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            order={lesson.order}
            courseId={courseId}
            completed={lesson.completed}
            hasQuiz={lesson.hasQuiz}
            duration={lesson.duration}
            description={lesson.description}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonList;