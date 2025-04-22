'use client';

import { useState, useEffect, JSX } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import AnimatedDiv from '@/app/components/AnimatedDiv';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { Book, FileText, Clock, ChevronRight, ArrowLeft, CheckSquare, Award, User, Star } from 'lucide-react';
import LanguageIcon from '@/app/components/Language/LanguageIcon';

interface Lesson {
  id: string;
  title: string;
  order: number;
  hasQuiz?: boolean;
  completed?: boolean;
  duration?: string;
  description?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  image: string;
  lessonsCount: number;
  lessons: Lesson[];
  duration?: string;
  students: number;
  rating: number;
  author: string;
  updatedAt: string;
  requirements: string[];
  skills: string[];
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  const router = useRouter();
  const { user } = useAuth();
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
        console.log('Course data:', courseResponse.data);
        
        // Запрос уроков курса
        const lessonsResponse = await axios.get(`/api/lessons?courseId=${courseId}`);
        console.log('Lessons data:', lessonsResponse.data);
        
        // Получаем прогресс пользователя по курсу
        let userProgress = null;
        try {
          const progressResponse = await axios.get(`/api/progress?courseId=${courseId}`);
          userProgress = progressResponse.data;
        } catch (err) {
          // console.log('Не удалось загрузить прогресс пользователя', err);
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
  
  // Компонент для отображения прогресса курса
  const CourseProgress = () => {
    const completedLessons = lessons.filter(lesson => lesson.completed).length;
    const totalLessons = lessons.length;
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Прогресс курса</span>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{progressPercentage}% ({completedLessons}/{totalLessons})</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <div className="flex flex-1 justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  
  if (error) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Ошибка</h2>
              <p>{error}</p>
              <button 
                onClick={() => router.push('/courses')}
                className="mt-4 inline-flex items-center text-red-700 dark:text-red-300"
              >
                <ArrowLeft size={16} className="mr-2" />
                Вернуться к списку курсов
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <AnimatedDiv>
              <div className="flex items-center space-x-2 mb-6">
                <button 
                  onClick={() => router.push('/courses')}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center"
                >
                  <ArrowLeft size={18} className="mr-1" />
                  К списку курсов
                </button>
              </div>
            </AnimatedDiv>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Информация о курсе */}
              <div className="md:col-span-2">
                <AnimatedDiv className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="h-3 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="mr-4"> 
                        <LanguageIcon language={course?.image} />
                      </div>
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                          {course?.title || 'Загрузка...'}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          {course && (
                            <>
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
                            </>
                          )}
                        </div>
                        {course && (
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {course.description}
                          </p>
                        )}
                        <CourseProgress />
                      </div>
                    </div>
                  </div>
                </AnimatedDiv>
                
                {/* Список уроков */}
                <AnimatedDiv className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6" delay={200}>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                    <Book size={20} className="mr-2" />
                    Уроки курса
                  </h2>
                  
                  <div className="space-y-4">
                    {lessons.map((lesson, index) => (
                      <div 
                        key={lesson.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow overflow-hidden"
                      >
                        <div className="p-4 flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              lesson.completed
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                            }`}
                            >
                              {lesson.completed ? (
                                <CheckSquare size={18} />
                              ) : (
                                <span className="text-sm font-medium">{index + 1}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <h3 className="font-medium text-gray-800 dark:text-white flex items-center">
                                {lesson.title}
                                {lesson.hasQuiz && (
                                  <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full">
                                    Квиз
                                  </span>
                                )}
                              </h3>
                              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1 md:mt-0">
                                <Clock size={14} className="mr-1" />
                                {lesson.duration || '15 минут'}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{lesson.description || `Урок ${index + 1}`}</p>
                            <div className="mt-3 flex justify-end">
                              <button 
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium flex items-center"
                                onClick={() => router.push(`/courses/${courseId}/lessons/${lesson.id}`)}
                              >
                                {lesson.completed ? 'Повторить урок' : 'Начать урок'}
                                <ChevronRight size={16} className="ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedDiv>
              </div>
              
              {/* Sidebar - Информация о курсе */}
              <div className="md:col-span-1">
                <AnimatedDiv className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sticky top-6" delay={300}>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">О курсе</h3>
                  
                  {course ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Автор</h4>
                        <div className="flex items-center">
                          <div className="bg-indigo-100 dark:bg-indigo-800 w-8 h-8 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mr-2">
                            {course.author?.substring(0, 1)}
                          </div>
                          <span className="text-gray-800 dark:text-white">{course.author}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Обновлен</h4>
                        <div className="text-gray-800 dark:text-white">{course.updatedAt}</div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Уровень</h4>
                        <div className="text-gray-800 dark:text-white flex items-center">
                          <Award size={16} className="mr-2 text-indigo-500" />
                          {course.level}
                        </div>
                      </div>
                      
                      {course.skills && (
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
                      
                      {course.requirements && (
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
                          <button 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                            onClick={() => {
                              // Находим первый незавершенный урок или первый урок, если все завершены
                              const nextLesson = lessons.find(l => !l.completed) || lessons[0];
                              if (nextLesson) {
                                router.push(`/courses/${courseId}/lessons/${nextLesson.id}`);
                              }
                            }}
                          >
                            {lessons.some(l => !l.completed) ? 'Продолжить обучение' : 'Повторить курс'}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-gray-500 dark:text-gray-400">
                      Загрузка информации о курсе...
                    </div>
                  )}
                </AnimatedDiv>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}