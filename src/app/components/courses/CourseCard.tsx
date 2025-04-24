'use client';

import { useRouter } from 'next/navigation';
import { FileText, User, Star, ArrowRight } from 'lucide-react';
import AnimatedDiv from '../AnimatedDiv';
import Card from '../ui/Card';
import LanguageIcon from '../Language/LanguageIcon';

interface CourseProps {
  id: string;
  title: string;
  description: string;
  language: string;
  progress?: number;
  image: string;
  lessons: number;
  students: number;
  rating: number;
  index: number;
}

export default function CourseCard({
  id,
  title,
  description,
  language,
  progress = 0,
  image,
  lessons,
  students,
  rating,
  index
}: CourseProps) {
  const router = useRouter();

  return (
    <AnimatedDiv delay={index * 150}>
      <Card 
        hover={true} 
        elevated={true}
        onClick={() => router.push(`/courses/${id}`)}
      >
        <div className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            <LanguageIcon language={language} />
            <div>
              <div className="flex items-center">
                <h2 className="font-bold text-xl text-gray-800 dark:text-white">{title}</h2>
              </div>
              <div className="flex items-center mt-1 space-x-2">
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs rounded-full font-medium">
                  {language}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                  <Star size={14} className="inline text-yellow-500 mr-1" /> 
                  {rating}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 overflow-hidden">{description}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <FileText size={16} className="text-indigo-500 mr-1" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">{lessons} уроков</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                <User size={16} className="text-indigo-500 mr-1" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">{students}+ учеников</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              {progress > 0 ? (
                <>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ваш прогресс</span>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{progress}%</span>
                </>
              ) : (
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Начните курс</span>
              )}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <button 
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {progress > 0 ? 'Продолжить обучение' : 'Начать обучение'}
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </Card>
    </AnimatedDiv>
  );
}