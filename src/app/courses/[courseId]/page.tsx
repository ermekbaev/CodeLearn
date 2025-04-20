'use client';

import { useState, useEffect, JSX } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import AnimatedDiv from '@/app/components/AnimatedDiv';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { Book, FileText, Clock, ChevronRight, ArrowLeft, CheckSquare, Award, User, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  image: string;
  lessons: number;
  duration: string;
  students: number;
  rating: number;
  author: string;
  updatedAt: string;
  requirements: string[];
  skills: string[];
}

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content?: string;  // Содержимое урока (может быть опциональным на странице списка)
  order: number;     // Порядок урока в курсе
  duration: string;  // Примерная длительность прохождения
  completed: boolean; // Статус завершения урока
  hasQuiz: boolean;  // Имеет ли урок квиз для проверки знаний
  nextLessonId?: string | null; // ID следующего урока (опционально)
  prevLessonId?: string | null; // ID предыдущего урока (опционально)
  level?: string;     // Уровень сложности (опционально)
  resources?: {       // Дополнительные материалы (опционально)
    title: string;
    url: string;
  }[];
}

interface IconsMap {
  [key: string]: JSX.Element;
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  
  // Мок данных курса для демонстрации
  const mockCourse: Course = {
    id: courseId,
    title: 'JavaScript основы',
    description: 'Полный курс по основам JavaScript для начинающих разработчиков. Вы изучите синтаксис языка, основные концепции, работу с DOM и многое другое.',
    language: 'JavaScript',
    level: 'Начинающий',
    image: 'js',
    lessons: 12,
    duration: '10 часов',
    students: 1245,
    rating: 4.8,
    author: 'Адилет Эрмекбаев',
    updatedAt: '10.03.2025',
    requirements: [
      'Базовые знания HTML и CSS',
      'Любой текстовый редактор (VS Code, Sublime Text и т.д.)',
      'Желание учиться программированию'
    ],
    skills: [
      'Основы JavaScript',
      'Работа с переменными и типами данных',
      'Функции, условия и циклы',
      'Работа с DOM и событиями',
      'Асинхронность и промисы'
    ]
  };
  
  // Моковые данные уроков
  const mockLessons: Lesson[] = [
    {
      id: '1',
      courseId: courseId,
      title: 'Введение в JavaScript',
      description: 'Обзор JavaScript, история языка и его место в веб-разработке',
      order: 1,
      duration: '20 минут',
      completed: true,
      hasQuiz: true,
      nextLessonId: '2',
      prevLessonId: null, 
    },
    {
      id: '2',
      courseId: courseId,
      title: 'Переменные и типы данных',
      description: 'Изучение различных типов данных и работа с переменными',
      order: 2,
      duration: '45 минут',
      completed: true,
      hasQuiz: true,
      nextLessonId: '3',
      prevLessonId: '1',
    },
    {
      id: '3',
      courseId: courseId,
      title: 'Операторы и выражения',
      description: 'Основные операторы JavaScript и составление выражений',
      order: 3,
      duration: '35 минут',
      completed: false,
      hasQuiz: true,
      prevLessonId: '2',
    },
  ];
  
  useEffect(() => {
    // Здесь должен быть запрос к API для получения данных курса
    // const fetchCourseData = async () => {...}
    
    // Пока используем моковые данные
    setTimeout(() => {
      setCourse(mockCourse);
      setLessons(mockLessons);
      setLoading(false);
    }, 1000);
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
  
  // Компонент для отображения иконки языка
  const LanguageIcon = () => {
    // Иконки языков программирования
    const icons: IconsMap = {
      js: (
        <svg className="w-12 h-12" fill="#F7DF1E" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      ),
      // Другие иконки языков можно добавить по аналогии
    };
    
    return (course && course.image) ? icons[course.image.toLowerCase()] || null : null;
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
                        <LanguageIcon />
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
                                {course.duration}
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
                                {lesson.duration}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{lesson.description}</p>
                            <div className="mt-3 flex justify-end">
                              <button 
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium flex items-center"
                                onClick={() => router.push(`/courses/${course?.id || courseId}/lessons/${lesson.id}`)}
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