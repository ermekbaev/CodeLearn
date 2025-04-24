'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  Coffee, 
  ChevronRight, 
  ArrowRight, 
  CheckSquare 
} from 'lucide-react';

// Импортируем компоненты
import Header from '@/app/components/Header';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import AnimatedDiv from '@/app/components/AnimatedDiv';
import Breadcrumbs from '@/app/components/layout/Breadcrumbs';
import LessonContent from '@/app/components/lessons/LessonContent';
import LessonSidebar from '@/app/components/lessons/LessonSidebar';
import Button from '@/app/components/ui/Button';
import Loading from '@/app/components/ui/Loading';
import ErrorDisplay from '@/app/components/common/ErrorDisplay';
import { Course, Lesson } from '@/types/courses';


export default function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId:string }> }) {
  const resolvedParams = React.use(params);
  const { courseId, lessonId } = resolvedParams;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [showResources, setShowResources] = useState(false);
  
  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);
        
        // Загрузка данных урока
        const lessonResponse = await axios.get(`/api/lessons/${lessonId}`);
        setLesson(lessonResponse.data);
        
        // Получение данных о курсе
        if (lessonResponse.data.course) {
          setCourse(lessonResponse.data.course);
        } else {
          // Если данные о курсе не включены в ответ урока,
          // делаем дополнительный запрос
          const courseResponse = await axios.get(`/api/courses/${courseId}`);
          setCourse(courseResponse.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке урока:', err);
        setError('Не удалось загрузить данные урока. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchLessonData();
  }, [courseId, lessonId]);
  
  // Функция для сохранения прогресса урока
  const handleCompleteLesson = async () => {
    try {
      // Запрос к API для отметки урока как завершенного
      await axios.post('/api/progress', { 
        lessonId: lesson?.id, 
        completed: true 
      });
      
      if (lesson?.hasQuiz) {
        // Если у урока есть квиз, перенаправляем на его страницу
        router.push(`/courses/${courseId}/lessons/${lessonId}/quiz`);
      } else if (lesson?.nextLessonId) {
        // Иначе перенаправляем на следующий урок, если он есть
        router.push(`/courses/${courseId}/lessons/${lesson.nextLessonId}`);
      } else {
        // Или возвращаемся на страницу курса, если это последний урок
        router.push(`/courses/${courseId}`);
      }
    } catch (err) {
      console.error('Ошибка при завершении урока:', err);
      setError('Не удалось отметить урок как завершенный. Пожалуйста, попробуйте снова.');
      
      // Для демо-режима продолжаем навигацию даже при ошибке с API
      if (lesson?.hasQuiz) {
        router.push(`/courses/${courseId}/lessons/${lessonId}/quiz`);
      } else if (lesson?.nextLessonId) {
        router.push(`/courses/${courseId}/lessons/${lesson.nextLessonId}`);
      } else {
        router.push(`/courses/${courseId}`);
      }
    }
  };
  
  // Формируем элементы хлебных крошек для навигации
  const breadcrumbItems = [
    {
      label: 'К списку курсов',
      href: `/courses/${courseId}`,
      icon: <ArrowLeft size={16} />
    },
    { 
      label: course?.title || 'Курс', 
      href: `/courses/${courseId}` 
    },
    { 
      label: `Урок ${lesson?.order || ''}`, 
      active: true 
    }
  ];
  
  // Отображаем загрузку
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <Loading text="Загрузка урока..." />
        </div>
      </ProtectedRoute>
    );
  }
  
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <AnimatedDiv>
              <Breadcrumbs items={breadcrumbItems} />
            </AnimatedDiv>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3">
                {error ? (
                  <ErrorDisplay 
                    message={error} 
                    backAction={() => router.push(`/courses/${courseId}`)} 
                    backLabel="Вернуться к курсу" 
                  />
                ) : (
                  <AnimatedDiv className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg mr-4">
                        <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{lesson?.title}</h1>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock size={16} className="mr-1 text-indigo-500" />
                        <span>15 минут</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Coffee size={16} className="mr-1 text-indigo-500" />
                        <span>Начальный уровень</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                      {lesson && <LessonContent content={lesson.content || ''} />}
                    </div>
                    
                    <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button 
                        variant="ghost"
                        leftIcon={<ArrowLeft size={16} />}
                        className={`${!lesson?.prevLessonId && 'opacity-50 cursor-not-allowed'}`}
                        onClick={() => lesson?.prevLessonId && router.push(`/courses/${courseId}/lessons/${lesson.prevLessonId}`)}
                        disabled={!lesson?.prevLessonId}
                      >
                        Предыдущий урок
                      </Button>
                      
                      <Button 
                        variant="primary"
                        gradient
                        rightIcon={<ArrowRight size={16} />}
                        onClick={handleCompleteLesson}
                      >
                        {lesson?.hasQuiz ? 'Пройти тест' : 
                          (lesson?.nextLessonId ? 'Следующий урок' : 'Завершить курс')}
                      </Button>
                    </div>
                  </AnimatedDiv>
                )}
              </div>
              
              <div className="md:col-span-1">
                {lesson && (
                  <LessonSidebar 
                    lesson={lesson}
                    courseId={courseId}
                    courseName={course?.title || 'Курс'}
                    showResources={showResources}
                    onToggleResources={() => setShowResources(!showResources)}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}