'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  ArrowLeft, 
  LightbulbIcon, 
  CheckCircle, 
  ArrowRight,
  Award 
} from 'lucide-react';

// Импортируем компоненты
import Header from '@/app/components/Header';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import AnimatedDiv from '@/app/components/AnimatedDiv';
import Breadcrumbs from '@/app/components/layout/Breadcrumbs';
import QuizOption from '@/app/components/quiz/QuizOption';
import Button from '@/app/components/ui/Button';
import Loading from '@/app/components/ui/Loading';
import Badge from '@/app/components/ui/Badge';
import StatCard from '@/app/components/ui/StatCard';

interface QuizData {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: string;
  hint?: string;
}

interface LessonData {
  id: string;
  title: string;
  order: number;
  courseId: string;
  nextLessonId?: string;
}

export default function QuizPage({ params }: { params: Promise<{ courseId: string; lessonId:string }> }) {
  const resolvedParams = React.use(params);
  const { courseId, lessonId } = resolvedParams;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [course, setCourse] = useState<any>(null);
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  
  // Отладочные логи
  useEffect(() => {
    if (quiz) {
      console.log("Данные квиза:", {
        question: quiz.question,
        options: quiz.options,
        correctAnswer: quiz.correctAnswer
      });
    }
  }, [quiz]);
  
  useEffect(() => {
    if (isSubmitted) {
      console.log("Состояние после отправки:", {
        selectedOption,
        correctAnswer: quiz?.correctAnswer,
        isCorrect
      });
    }
  }, [isSubmitted, selectedOption, quiz?.correctAnswer, isCorrect]);
  
  // Загружаем данные при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Получаем данные теста
        const quizResponse = await axios.get(`/api/quiz/${lessonId}`);
        setQuiz(quizResponse.data);
        
        // Получаем данные урока
        const lessonResponse = await axios.get(`/api/lessons/${lessonId}`);
        setLesson(lessonResponse.data);
        
        // Получаем данные курса
        const courseResponse = await axios.get(`/api/courses/${courseId}`);
        setCourse(courseResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError('Не удалось загрузить данные теста. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [courseId, lessonId]);
  
  // Обработчик отправки ответа
  const handleSubmit = async () => {
    if (selectedOption === null) return;
    
    try {
      // Отправляем ответ на сервер
      const response = await axios.post(`/api/quiz/${quiz?.id}`, { 
        answer: selectedOption 
      });
      
      // Получаем результат
      const { isCorrect: responseIsCorrect, correctAnswer: responseCorrectAnswer } = response.data;
      
      // Устанавливаем состояние
      setIsCorrect(responseIsCorrect);
      
      // Если ответ неправильный, запоминаем правильный ответ
      if (!responseIsCorrect) {
        setCorrectAnswer(responseCorrectAnswer);
      }
      
      // Отмечаем урок как пройденный, если ответ правильный
      if (responseIsCorrect) {
        await axios.post('/api/progress', { 
          lessonId: lesson?.id, 
          completed: true 
        });
      }
      
      setIsSubmitted(true);
    } catch (err) {
      console.error('Ошибка при проверке ответа:', err);
      setError('Не удалось проверить ответ. Пожалуйста, попробуйте снова.');
      
      // Для демонстрации без API
      const isAnswerCorrect = selectedOption === quiz?.correctAnswer;
      setIsCorrect(isAnswerCorrect);
      
      if (!isAnswerCorrect) {
        setCorrectAnswer(quiz?.correctAnswer || null);
      }
      
      setIsSubmitted(true);
    }
  };
  
  // Обработчик навигации
  const handleNavigation = () => {
    if (isCorrect && lesson?.nextLessonId) {
      router.push(`/courses/${courseId}/lessons/${lesson.nextLessonId}`);
    } else {
      router.push(`/courses/${courseId}/lessons/${lessonId}`);
    }
  };
  
  // Формируем элементы хлебных крошек для навигации
  const breadcrumbItems = [
    {
      label: 'К уроку',
      href: `/courses/${courseId}/lessons/${lessonId}`,
      icon: <ArrowLeft size={16} />
    },
    { label: course?.title || 'Курс', href: `/courses/${courseId}` },
    { label: `Урок ${lesson?.order || ''}`, href: `/courses/${courseId}/lessons/${lessonId}` },
    { label: 'Тест', active: true }
  ];
  
  // Отображаем загрузку
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <Loading fullScreen text="Загрузка теста..." />
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
            
            {error && !quiz ? (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Ошибка</h2>
                <p>{error}</p>
                <Button 
                  variant="outline"
                  leftIcon={<ArrowLeft size={16} />}
                  onClick={() => router.push(`/courses/${courseId}/lessons/${lessonId}`)}
                  className="mt-4"
                >
                  Вернуться к уроку
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Основная секция */}
                <div className="md:col-span-2">
                  <AnimatedDiv className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {/* Заголовок квиза */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg mr-4">
                          <LightbulbIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Проверьте свои знания</h1>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        Выберите правильный ответ на вопрос, чтобы перейти к следующему уроку.
                      </div>
                    </div>
                    
                    {/* Содержимое квиза */}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">{quiz?.question}</h2>
                      
                      {/* Варианты ответов с корректной передачей параметров */}
                      <div className="space-y-4">
                        {quiz?.options.map((option, index) => (
                          <QuizOption 
                            key={index}
                            text={option}
                            isSelected={selectedOption === option}
                            isSubmitted={isSubmitted}
                            userAnsweredCorrectly={isCorrect}
                            isCorrectOption={option === quiz.correctAnswer}
                            onClick={() => setSelectedOption(option)}
                            className="mb-3"
                          />
                        ))}
                      </div>
                      
                      {/* Результат ответа */}
                      {isSubmitted ? (
                        <div className="mt-8">
                          {isCorrect ? (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg p-4 flex items-start">
                              <CheckCircle size={20} className="mr-3 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-bold">Отлично!</p>
                                <p>Вы правильно ответили на вопрос. Теперь вы можете перейти к следующему уроку.</p>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg p-4 flex items-start">
                              <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <p className="font-bold">Упс, это неправильный ответ</p>
                                <p>Правильный ответ: <span className="font-medium">{correctAnswer}</span>.</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button 
                              variant="ghost"
                              leftIcon={<ArrowLeft size={16} />}
                              onClick={() => router.push(`/courses/${courseId}/lessons/${lessonId}`)}
                            >
                              Вернуться к уроку
                            </Button>
                            
                            {isCorrect && (
                              <Button 
                                variant="primary"
                                gradient
                                rightIcon={<ArrowRight size={16} />}
                                onClick={handleNavigation}
                              >
                                Следующий урок
                              </Button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                          <Button 
                            variant="primary"
                            gradient
                            fullWidth
                            disabled={selectedOption === null}
                            onClick={handleSubmit}
                          >
                            Проверить ответ
                          </Button>
                          
                          <Button 
                            variant="outline"
                            onClick={() => setShowHint(!showHint)}
                          >
                            {showHint ? 'Скрыть подсказку' : 'Подсказка'}
                          </Button>
                        </div>
                      )}
                      
                      {/* Подсказка */}
                      {showHint && !isSubmitted && quiz?.hint && (
                        <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 rounded-lg p-4">
                          <div className="font-medium mb-1">Подсказка:</div>
                          <p>{quiz.hint}</p>
                        </div>
                      )}
                    </div>
                  </AnimatedDiv>
                </div>
                
                {/* Боковая панель */}
                <div className="md:col-span-1">
                  <AnimatedDiv delay={200} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sticky top-6">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Ваш прогресс</h3>
                    
                    {/* Визуализация прогресса */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                        25%
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">Курс завершен</span>
                    </div>
                    
                    {/* Навигация по урокам */}
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle size={18} className="text-green-500 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">Урок 1 - Введение</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full border-2 border-indigo-500 flex items-center justify-center mr-3">
                          <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium">Урок {lesson?.order} - {lesson?.title?.substring(0, 15)}...</span>
                      </div>
                      <div className="flex items-center opacity-60">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3"></div>
                        <span className="text-gray-700 dark:text-gray-300">Урок 3 - Функции</span>
                      </div>
                    </div>
                    
                    {/* Статистика тестов */}
                    <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-800 dark:text-white">Успехи в тестах</h4>
                        <Badge variant="primary" size="sm">50%</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <StatCard 
                          value="1"
                          label="Попытка"
                          variant="neutral"
                          icon={<span className="text-indigo-500">A</span>}
                          className="p-2"
                        />
                        <StatCard 
                          value="3/6"
                          label="Правильно"
                          variant="success"
                          icon={<span className="text-green-500">✓</span>}
                          className="p-2"
                        />
                      </div>
                      
                      <Button 
                        variant="ghost"
                        leftIcon={<Award size={16} className="text-indigo-500" />}
                        className="mt-4 w-full"
                      >
                        Посмотреть все достижения
                      </Button>
                    </div>
                  </AnimatedDiv>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}