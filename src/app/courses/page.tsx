'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '../components/Header';
import CourseCard from '../components/courses/CourseCard';
import ProtectedRoute from '../components/ProtectedRoute';
import AnimatedDiv from '../components/AnimatedDiv';
import { Layout } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Определение типа для курса
interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  lessonsCount: number;
  progress?: number;
  image?: string;
  rating?: number;
  students?: number;
}

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
        
        
        // Здесь должен быть запрос для получения прогресса, если пользователь авторизован
        // const progressResponse = await axios.get('/api/progress');
        
        // Для демонстрации добавим моковый прогресс к некоторым курсам
        const coursesWithProgress = response.data.map((course: Course, index: number) => {
          // Демо-прогресс для первого и третьего курса
          let progress = 0;
          if (index === 0) progress = 25;
          if (index === 2) progress = 75;
          
          return {
            ...course,
            progress,
            // Дополнительные демо-данные, которые могут отсутствовать в API
            image: ['js', 'python', 'html', 'react'][index % 4],
            rating: 4.5 + (index % 5) / 10,
            students: 500 + index * 200
          };
        });
        
        setCourses(coursesWithProgress);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при получении данных курсов:', err);
        setError('Не удалось загрузить список курсов. Пожалуйста, попробуйте позже.');
        
        // Загружаем моковые данные для демонстрации
        const mockCourses = [
          {
            id: '1',
            title: 'JavaScript основы',
            description: 'Изучите основы JavaScript: переменные, функции, объекты и многое другое.',
            language: 'JavaScript',
            lessonsCount: 12,
            progress: 25,
            image: 'js',
            rating: 4.8,
            students: 1245
          },
          {
            id: '2',
            title: 'Python для начинающих',
            description: 'Введение в Python: синтаксис, типы данных, функции и ООП.',
            language: 'Python',
            lessonsCount: 15,
            progress: 0,
            image: 'python',
            rating: 4.9,
            students: 2100
          },
          {
            id: '3',
            title: 'Основы HTML и CSS',
            description: 'Создание веб-страниц с использованием HTML5 и CSS3.',
            language: 'HTML/CSS',
            lessonsCount: 8,
            progress: 75,
            image: 'html',
            rating: 4.7,
            students: 1830
          },
          {
            id: '4',
            title: 'React для фронтенд разработки',
            description: 'Разработка одностраничных приложений с React.',
            language: 'React',
            lessonsCount: 20,
            progress: 10,
            image: 'react',
            rating: 4.9,
            students: 985
          }
        ];
        
        setCourses(mockCourses);
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);
  
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
            <AnimatedDiv>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden mb-8">
                <div className="p-8 md:p-12 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">Добро пожаловать, {user?.name || 'пользователь'}!</h1>
                  <p className="text-lg md:text-xl mb-6 opacity-90">Готовы продолжить обучение программированию?</p>
                  <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition duration-300">
                    Начать обучение
                  </button>
                </div>
              </div>
            </AnimatedDiv>
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Ваши курсы</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setFilter('all')}
                  className={`${filter === 'all' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'} px-4 py-2 rounded-lg transition-colors font-medium`}
                >
                  Все
                </button>
                <button 
                  onClick={() => setFilter('inProgress')}
                  className={`${filter === 'inProgress' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'} px-4 py-2 rounded-lg transition-colors`}
                >
                  В процессе
                </button>
                <button 
                  onClick={() => setFilter('completed')}
                  className={`${filter === 'completed' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'} px-4 py-2 rounded-lg transition-colors`}
                >
                  Завершенные
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : error && courses.length === 0 ? (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Ошибка</h2>
                <p>{error}</p>
              </div>
            ) : filteredCourses().length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                  <Layout className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {filter === 'all' ? 'У вас пока нет курсов' : 'Курсы не найдены'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {filter === 'all' 
                    ? 'Начните своё обучение, выбрав один из наших популярных курсов программирования' 
                    : 'Попробуйте другие фильтры или вернитесь к просмотру всех курсов'}
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Найти курсы
                </button>
              </div>
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