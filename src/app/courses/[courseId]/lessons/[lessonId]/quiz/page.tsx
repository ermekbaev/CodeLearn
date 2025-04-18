'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  ArrowLeft, 
  LightbulbIcon, 
  CheckCircle, 
  X, 
  ArrowRight,
  Award 
} from 'lucide-react';
import Header from '@/app/components/Header';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import AnimatedDiv from '@/app/components/AnimatedDiv';

export default function QuizPage({ 
  params 
}: { 
  params: { courseId: string; lessonId: string } 
}) {
  const { courseId, lessonId } = params;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quiz, setQuiz] = useState<any>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  
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
        
        // Загружаем моковые данные для демонстрации
        const mockQuiz = {
          id: '1',
          lessonId: lessonId,
          question: 'Какое ключевое слово используется для объявления константы в JavaScript?',
          options: ['var', 'let', 'const', 'fixed'],
          correctAnswer: 'const',
          hint: 'Вспомните, какое ключевое слово используется, когда вы хотите, чтобы значение переменной не изменялось после его первоначального присвоения.'
        };
        
        const mockLesson = {
          id: lessonId,
          title: 'Переменные и типы данных в JavaScript',
          order: 2,
          courseId: courseId,
          nextLessonId: '3'
        };
        
        const mockCourse = {
          id: courseId,
          title: 'JavaScript основы'
        };
        
        setQuiz(mockQuiz);
        setLesson(mockLesson);
        setCourse(mockCourse);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [courseId, lessonId]);
  
  const handleSubmit = async () => {
    if (selectedOption === null) return;
    
    try {
      // Отправляем ответ на сервер
      const response = await axios.post(`/api/quiz/${quiz.id}`, { 
        answer: selectedOption 
      });
      
      // Получаем результат
      const { isCorrect, correctAnswer: answer } = response.data;
      
      setIsCorrect(isCorrect);
      if (!isCorrect) {
        setCorrectAnswer(answer);
      }
      
      // Отмечаем урок как пройденный, если ответ правильный
      if (isCorrect) {
        await axios.post('/api/progress', { 
          lessonId: lesson.id, 
          completed: true 
        });
      }
      
      setIsSubmitted(true);
    } catch (err) {
      console.error('Ошибка при проверке ответа:', err);
      setError('Не удалось проверить ответ. Пожалуйста, попробуйте снова.');
      
      // Для демонстрации без API
      const isAnswerCorrect = selectedOption === quiz.correctAnswer;
      setIsCorrect(isAnswerCorrect);
      if (!isAnswerCorrect) {
        setCorrectAnswer(quiz.correctAnswer);
      }
      setIsSubmitted(true);
    }
  };
  
  const handleNavigation = () => {
    if (isCorrect && lesson?.nextLessonId) {
      router.push(`/courses/${courseId}/lessons/${lesson.nextLessonId}`);
    } else {
      router.push(`/courses/${courseId}/lessons/${lessonId}`);
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <AnimatedDiv>
              <div className="flex items-center space-x-2 mb-6">
                <button 
                  onClick={() => router.push(`/courses/${courseId}/lessons/${lessonId}`)}
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center"
                >
                  <ArrowLeft size={18} className="mr-1" />
                  К уроку
                </button>
                <span className="text-gray-400">/</span>
                <span className="text-gray-700 dark:text-gray-300">{course?.title}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-700 dark:text-gray-300">Урок {lesson?.order}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 dark:text-white font-medium">Тест</span>
              </div>
            </AnimatedDiv>
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Ошибка</h2>
                <p>{error}</p>
                <button 
                  onClick={() => router.push(`/courses/${courseId}/lessons/${lessonId}`)}
                  className="mt-4 inline-flex items-center text-red-700 dark:text-red-300"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Вернуться к уроку
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <AnimatedDiv className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
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
                    
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">{quiz?.question}</h2>
                      
                      <div className="space-y-4">
                        {quiz?.options.map((option: string, index: number) => (
                          <div 
                            key={index}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedOption === option 
                                ? isSubmitted 
                                  ? option === quiz.correctAnswer 
                                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600' 
                                    : 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-600'
                                  : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 dark:border-indigo-400' 
                                : 'hover:border-gray-400 dark:hover:border-gray-500 border-gray-200 dark:border-gray-700'
                            }`}
                            onClick={() => !isSubmitted && setSelectedOption(option)}
                          >
                            <div className="flex items-center">
                              <div className={`w-6 h-6 rounded-full border-2 ${
                                selectedOption === option 
                                  ? isSubmitted 
                                    ? option === quiz.correctAnswer 
                                      ? 'border-green-500 bg-green-500 dark:border-green-600 dark:bg-green-600' 
                                      : 'border-red-500 bg-red-500 dark:border-red-600 dark:bg-red-600'
                                    : 'border-indigo-500 bg-indigo-500 dark:border-indigo-400 dark:bg-indigo-400' 
                                  : 'border-gray-400 dark:border-gray-500'
                              } flex items-center justify-center mr-3`}>
                                {selectedOption === option && (
                                  isSubmitted ? (
                                    option === quiz.correctAnswer ? (
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    ) : (
                                      <X className="w-4 h-4 text-white" />
                                    )
                                  ) : (
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                  )
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-800 dark:text-white">{option}</div>
                                {isSubmitted && selectedOption === option && option === quiz.correctAnswer && (
                                  <div className="text-green-600 dark:text-green-400 text-sm mt-1">Правильный ответ!</div>
                                )}
                                {isSubmitted && selectedOption === option && option !== quiz.correctAnswer && (
                                  <div className="text-red-600 dark:text-red-400 text-sm mt-1">Неправильный ответ</div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
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
                                <p>Правильный ответ: <span className="font-medium">{correctAnswer}</span>. Для объявления константы в JavaScript используется ключевое слово 'const'.</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button 
                              onClick={() => router.push(`/courses/${courseId}/lessons/${lessonId}`)}
                              className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                            >
                              <ArrowLeft size={16} className="mr-2" />
                              Вернуться к уроку
                            </button>
                            
                            {isCorrect && (
                              <button 
                                onClick={handleNavigation}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
                              >
                                Следующий урок
                                <ArrowRight size={16} className="ml-2" />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-8 flex space-x-4">
                          <button 
                            onClick={handleSubmit}
                            disabled={selectedOption === null}
                            className={`flex-1 py-3 px-4 rounded-lg text-white transition-all ${
                              selectedOption === null 
                                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg'
                            }`}
                          >
                            Проверить ответ
                          </button>
                          
                          <button 
                            onClick={() => setShowHint(!showHint)}
                            className="border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 py-3 px-4 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors"
                          >
                            Подсказка
                          </button>
                        </div>
                      )}
                      
                      {showHint && !isSubmitted && (
                        <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 rounded-lg p-4">
                          <div className="font-medium mb-1">Подсказка:</div>
                          <p>{quiz?.hint}</p>
                        </div>
                      )}
                    </div>
                  </AnimatedDiv>
                </div>
                
                <div className="md:col-span-1">
                  <AnimatedDiv delay={200} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sticky top-6">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Ваш прогресс</h3>
                    
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                        25%
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">Курс завершен</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle size={18} className="text-green-500 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">Урок 1 - Введение</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full border-2 border-indigo-500 flex items-center justify-center mr-3">
                          <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-900 dark:text-white font-medium">Урок 2 - Переменные</span>
                      </div>
                      <div className="flex items-center opacity-60">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3"></div>
                        <span className="text-gray-700 dark:text-gray-300">Урок 3 - Функции</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-800 dark:text-white">Успехи в тестах</h4>
                        <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          50%
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                          <div className="text-2xl font-bold text-gray-800 dark:text-white">1</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Попытка</div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">3/6</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Правильно</div>
                        </div>
                      </div>
                      
                      <button className="mt-4 w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center">
                        <Award size={16} className="mr-2 text-indigo-500" />
                        <span>Посмотреть все достижения</span>
                      </button>
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