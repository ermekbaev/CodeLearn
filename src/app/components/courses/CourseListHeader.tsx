import React from 'react';
import { useRouter } from 'next/navigation';
import AnimatedDiv from '../AnimatedDiv';

interface CourseListHeaderProps {
  userName?: string;
}

const CourseListHeader: React.FC<CourseListHeaderProps> = ({ 
  userName = 'пользователь'
}) => {
  const router = useRouter();
  
  return (
    <AnimatedDiv className="mb-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Добро пожаловать, {userName}!
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Готовы продолжить обучение программированию?
          </p>
          <button 
            onClick={() => router.push('/find-courses')}
            className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition duration-300"
          >
            Начать обучение
          </button>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default CourseListHeader;