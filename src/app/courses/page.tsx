'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Layout } from 'lucide-react';

// Компоненты
import Header from '../components/Header';
import CourseCard from '../components/courses/CourseCard';
import ProtectedRoute from '../components/ProtectedRoute';
import AnimatedDiv from '../components/AnimatedDiv';
import CourseListHeader from '../components/courses/CourseListHeader';
import CourseFilters from '../components/courses/CourseFilters';
import EmptyCoursesState from '../components/courses/EmptyCoursesState';
import CourseListSkeleton from '../components/courses/CourseListSkeleton';
import { useAuth } from '@/contexts/AuthContext';

// Типы
import { Course } from '@/types/courses';

export default function CoursesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Получаем данные курсов с API
        const response = await axios.get('/api/courses');
        
        // Объявляем переменную для прогресса
        let progressData = [];
        try {
          const progressResponse = await axios.get('/api/progress');
          progressData = progressResponse.data;
        } catch (progressErr) {
          console.error('Не удалось загрузить прогресс курсов', progressErr);
        }
        
        const coursesWithProgress = response.data.map((course: Course) => {
          // Находим все завершенные уроки для данного курса по данным из API прогресса
          const completedLessons = progressData.filter((progress: { lesson: { courseId: string; }; completed: any; }) => {
            return progress.lesson && progress.lesson.courseId === course.id && progress.completed;
          });
          
          // Расчет процента завершения
          const progressPercentage = course.lessonsCount > 0 
            ? Math.round((completedLessons.length / course.lessonsCount) * 100) 
            : 0;
          
          return {
            ...course,
            progress: progressPercentage,
            // Дополнительные демо-данные
            image: course.language.toLowerCase().replace(/[^a-z]/g, ''),
            rating: 4.5 + (Math.random() * 0.5), // Случайный рейтинг
            students: 500 + Math.floor(Math.random() * 1000),
            lessonsCount: course.lessonsCount
          };
        });
        
        setCourses(coursesWithProgress);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при получении данных курсов:', err);
        setError('Не удалось загрузить список курсов. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
  const handleFindCourses = () => {
    router.push("/find-courses");
  };
  
  const filteredCourses = () => {
    switch (filter) {
      case 'inProgress':
        return courses.filter(course => course.progress && course.progress > 0 && course.progress < 100);
      case 'completed':
        return courses.filter(course => course.progress === 100);
      case 'notStarted':
        return courses.filter(course => !course.progress || course.progress === 0);
      default:
        return courses;
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            {/* Заголовок страницы */}
            <CourseListHeader 
              userName={user?.name || 'пользователь'}
            />
            
            {/* Фильтры курсов */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Ваши курсы</h2>
              <CourseFilters activeFilter={filter} onFilterChange={setFilter} />
            </div>
            
            {/* Контент */}
            {loading ? (
              <CourseListSkeleton count={3} />
            ) : error && courses.length === 0 ? (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Ошибка</h2>
                <p>{error}</p>
              </div>
            ) : filteredCourses().length === 0 ? (
              <EmptyCoursesState 
                filter={filter} 
                onFindCourses={handleFindCourses} 
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses().map((course, index) => (
                  <CourseCard 
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    language={course.language}
                    progress={course.progress}
                    image={course.image || 'js'}
                    lessons={course.lessonsCount}
                    students={course.students || 0}
                    rating={course.rating || 4.5}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}