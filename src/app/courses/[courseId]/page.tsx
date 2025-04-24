'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '@/app/components/Header';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import AnimatedDiv from '@/app/components/AnimatedDiv';
import Breadcrumbs from '@/app/components/layout/Breadcrumbs';
import CourseDetailHeader from '@/app/components/courses/CourseDetailHeader';
import LessonList from '@/app/components/lessons/LessonList';
import CourseDetailSidebar from '@/app/components/courses/CourseDetailSidebar';
import CourseDetailSkeleton from '@/app/components/courses/CourseDetailSkeleton';
import ErrorDisplay from '@/app/components/common/ErrorDisplay';
import { Course, Lesson } from '@/types/courses';

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  // Используем React.use для разрешения Promise параметров
  const resolvedParams = React.use(params);
  const { courseId } = resolvedParams;
  
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<number>(0);
  
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        
        // Запрос данных курса
        const courseResponse = await axios.get(`/api/courses/${courseId}`);
        setCourse(courseResponse.data);
        
        // Запрос уроков курса
        const lessonsResponse = await axios.get(`/api/lessons?courseId=${courseId}`);
        
        // Получаем прогресс пользователя по курсу
        let userProgress = null;
        try {
          const progressResponse = await axios.get(`/api/progress?courseId=${courseId}`);
          userProgress = progressResponse.data;
        } catch (err) {
          console.log('Не удалось загрузить прогресс пользователя', err);
        }
        
        // Объединяем данные уроков с прогрессом
        const lessonsWithProgress = lessonsResponse.data.map((lesson: Lesson) => {
          const progress = userProgress?.find((p: any) => p.lessonId === lesson.id);
          return {
            ...lesson,
            completed: progress?.completed || false,
            // Добавляем демо-данные для отображения
            duration: `${15 + Math.floor(Math.random() * 15)} минут`,
            description: `Урок про ${lesson.title.toLowerCase()}`
          };
        });
        
        setLessons(lessonsWithProgress);
        
        // Расчет общего прогресса
        if (lessonsWithProgress.length > 0) {
          const completedCount = lessonsWithProgress.filter((l: Lesson) => l.completed).length;
          setProgress(Math.round((completedCount / lessonsWithProgress.length) * 100));
        }
        
        setLoading(false);
      } catch (err: any) {
        console.error('Ошибка при загрузке данных курса:', err);
        setError('Не удалось загрузить данные курса. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId]);
  
  const continueToNextLesson = () => {
    // Находим первый незавершенный урок или первый урок, если все завершены
    const nextLesson = lessons.find(l => !l.completed) || lessons[0];
    if (nextLesson) {
      router.push(`/courses/${courseId}/lessons/${nextLesson.id}`);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <Breadcrumbs 
              items={[]}
              showBackButton={true}
              backButtonText="К списку курсов"
              backUrl="/courses"
            />
            
            {loading ? (
              <CourseDetailSkeleton />
            ) : error ? (
              <ErrorDisplay 
                message={error} 
                backAction={() => router.push('/courses')} 
                backLabel="Вернуться к списку курсов" 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Информация о курсе */}
                <div className="md:col-span-2">
                  {course && (
                    <CourseDetailHeader 
                      course={course} 
                      progress={progress} 
                    />
                  )}
                  
                  {/* Список уроков */}
                  {lessons.length > 0 && (
                    <AnimatedDiv className="mt-8" delay={200}>
                      <LessonList 
                        lessons={lessons} 
                        courseId={courseId} 
                      />
                    </AnimatedDiv>
                  )}
                </div>
                
                {/* Sidebar - Информация о курсе */}
                <div className="md:col-span-1">
                  {course && (
                    <CourseDetailSidebar 
                      course={course} 
                      lessons={lessons}
                      progress={progress}
                      onContinueLearning={continueToNextLesson}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}