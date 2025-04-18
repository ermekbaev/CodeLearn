'use client';

import { useState, useEffect } from 'react';
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
import AnimatedDiv from '@/app/components/AnimatedDiv';

export default function LessonPage({ 
  params 
}: { 
  params: { courseId: string; lessonId: string } 
}) {
  const { courseId, lessonId } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lesson, setLesson] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [showResources, setShowResources] = useState(false);
  
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        // В реальном приложении заменить на запрос к API
        const lessonResponse = await axios.get(`/api/lessons/${lessonId}`);
        setLesson(lessonResponse.data);
        
        // Получаем данные о курсе
        const courseResponse = await axios.get(`/api/courses/${courseId}`);
        setCourse(courseResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке урока:', err);
        setError('Не удалось загрузить данные урока. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };

    // Для демонстрации используем моковые данные
    const mockData = async () => {
      try {
        // Имитируем задержку сети
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Примеры данных
        const mockCourse = {
          id: courseId,
          title: 'JavaScript основы',
        };
        
        const mockLesson = {
          id: lessonId,
          courseId: courseId,
          title: 'Переменные и типы данных в JavaScript',
          content: `
## Переменные в JavaScript

В JavaScript для объявления переменных используются ключевые слова \`let\`, \`const\` и устаревшее \`var\`.

### let

\`let\` позволяет объявить переменную, значение которой может быть изменено:

\`\`\`javascript
let name = "John";
name = "Jane"; // Можно изменить значение
\`\`\`

### const

\`const\` используется для объявления констант, значения которых нельзя изменить после присвоения:

\`\`\`javascript
const PI = 3.14159;
// PI = 3.14; // Вызовет ошибку
\`\`\`

## Типы данных

JavaScript имеет следующие основные типы данных:

1. **String** - строки
2. **Number** - числа
3. **Boolean** - логические значения (true/false)
4. **Object** - объекты
5. **Array** - массивы (тоже объекты)
6. **null** - специальное значение "ничего"
7. **undefined** - значение неопределенной переменной

### Пример использования разных типов данных:

\`\`\`javascript
let name = "Alice"; // String
let age = 25; // Number
let isStudent = true; // Boolean
let person = { name: "Bob", age: 30 }; // Object
let colors = ["red", "green", "blue"]; // Array
\`\`\`
          `,
          order: 2,
          level: 'Начальный',
          duration: '15 минут',
          resources: [
            { title: 'MDN Web Docs - JavaScript Variables', url: '#' },
            { title: 'MDN Web Docs - JavaScript Data Types', url: '#' },
            { title: 'JavaScript.info - Variables', url: '#' }
          ],
          nextLessonId: '3',
          prevLessonId: '1',
          hasQuiz: true
        };
        
        setCourse(mockCourse);
        setLesson(mockLesson);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке моковых данных:', err);
        setError('Произошла ошибка при загрузке данных.');
        setLoading(false);
      }
    };
    
    // Используем моковые данные для демонстрации
    mockData();
    // В продакшене будет:
    // fetchLessonData();
  }, [courseId, lessonId]);
  
  // Функция для рендера markdown (улучшенная версия)
  const renderMarkdown = (content:any) => {
    if (!content) return null;
    
    const parts = content.split('```');
    
    return (
      <div>
        {parts.map((part:any, index:any) => {
          if (index % 2 === 0) {
            // Обычный текст (не код)
            return (
              <div key={index} className="prose prose-indigo dark:prose-invert max-w-none">
                {part.split('\n').map((line:any, lineIndex:any) => {
                  if (line.startsWith('## ')) {
                    return <h2 key={lineIndex} className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-white">{line.replace('## ', '')}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={lineIndex} className="text-xl font-semibold mt-6 mb-3 text-gray-700 dark:text-gray-200">{line.replace('### ', '')}</h3>;
                  } else if (line.match(/^\d+\.\s+\*\*.+\*\*\s+-\s+.+$/)) {
                    // Форматированные элементы списка
                    const match = line.match(/^(\d+)\.\s+\*\*(.+)\*\*\s+-\s+(.+)$/);
                    if (match) {
                      const [, num, term, desc] = match;
                      return (
                        <div key={lineIndex} className="flex items-start space-x-3 mb-2">
                          <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                            {num}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-800 dark:text-white">{term}</span>
                            <span className="text-gray-600 dark:text-gray-300"> - {desc}</span>
                          </div>
                        </div>
                      );
                    }
                    return <p key={lineIndex} className="mb-3 text-gray-700 dark:text-gray-300">{line}</p>;
                  } else if (line.trim() === '') {
                    return <div key={lineIndex} className="h-2"></div>;
                  } else if (line.includes('`')) {
                    // Строка с inline-кодом
                    const segments = line.split('`');
                    return (
                      <p key={lineIndex} className="mb-3 text-gray-700 dark:text-gray-300">
                        {segments.map((segment:any, segIndex:any) => {
                          return segIndex % 2 === 0 ? 
                            segment : 
                            <code key={segIndex} className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                              {segment}
                            </code>;
                        })}
                      </p>
                    );
                  } else {
                    return <p key={lineIndex} className="mb-3 text-gray-700 dark:text-gray-300">{line}</p>;
                  }
                })}
              </div>
            );
          } else {
            // Код
            const language = part.split('\n')[0];
            const code = part.split('\n').slice(1).join('\n');
            
            return (
              <div key={index} className="relative group mb-6">
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="bg-indigo-600 text-white p-1.5 rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(code);
                      // Можно добавить уведомление о копировании
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                    </svg>
                  </button>
                </div>
                <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {language}
                    </div>
                  </div>
                  <pre className="font-mono">
                    <code>{code}</code>
                  </pre>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };
  
  const handleCompleteLesson = async () => {
    try {
      // Здесь должен быть запрос к API для отметки урока как завершенного
      await axios.post('/api/progress', { 
        lessonId: lesson.id, 
        completed: true 
      });
      
      if (lesson.hasQuiz) {
        // Если у урока есть квиз, перенаправляем на страницу квиза
        router.push(`/courses/${courseId}/lessons/${lessonId}/quiz`);
      } else if (lesson.nextLessonId) {
        // Иначе перенаправляем на следующий урок, если он есть
        router.push(`/courses/${courseId}/lessons/${lesson.nextLessonId}`);
      } else {
        // Или возвращаемся на страницу курса, если это последний урок
        router.push(`/courses/${courseId}`);
      }
    } catch (err) {
      console.error('Ошибка при завершении урока:', err);
      setError('Не удалось отметить урок как завершенный. Пожалуйста, попробуйте снова.');
    }
  };
  
  // Для состояния загрузки показываем спиннер
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-1 justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  // При ошибке показываем сообщение
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Ошибка</h2>
            <p>{error}</p>
            <button 
              onClick={() => router.push(`/courses/${courseId}`)}
              className="mt-4 inline-flex items-center text-red-700 dark:text-red-300"
            >
              <ArrowLeft size={16} className="mr-2" />
              Вернуться к курсу
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-6">
          <AnimatedDiv>
            <div className="flex items-center space-x-2 mb-6">
              <button 
                onClick={() => router.push(`/courses/${courseId}`)}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center"
              >
                <ArrowLeft size={18} className="mr-1" />
                К списку курсов
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-700 dark:text-gray-300">{course?.title}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white font-medium">Урок {lesson?.order}</span>
            </div>
          </AnimatedDiv>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
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
                    <span>{lesson?.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Coffee size={16} className="mr-1 text-indigo-500" />
                    <span>{lesson?.level}</span>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                  {lesson && renderMarkdown(lesson.content)}
                </div>
                
                <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    className={`text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center ${!lesson?.prevLessonId && 'opacity-50 cursor-not-allowed'}`}
                    onClick={() => lesson?.prevLessonId && router.push(`/courses/${courseId}/lessons/${lesson.prevLessonId}`)}
                    disabled={!lesson?.prevLessonId}
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Предыдущий урок
                  </button>
                  
                  <button 
                    onClick={handleCompleteLesson}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-6 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center"
                  >
                    {lesson?.hasQuiz ? 'Пройти тест' : (lesson?.nextLessonId ? 'Следующий урок' : 'Завершить курс')}
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </AnimatedDiv>
            </div>
            
            <div className="md:col-span-1">
              <AnimatedDiv delay={200} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sticky top-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white">Навигация по уроку</h3>
                  <button 
                    onClick={() => setShowResources(!showResources)}
                    className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
                  >
                    {showResources ? 'Скрыть ресурсы' : 'Ресурсы'}
                  </button>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-8 bg-indigo-600 rounded-r-md mr-3"></div>
                    <a href="#" className="text-gray-800 dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400">
                      Переменные в JavaScript
                    </a>
                  </div>
                  <div className="flex items-center pl-5">
                    <div className="w-1.5 h-6 bg-indigo-400 rounded-r-md mr-3"></div>
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                      let
                    </a>
                  </div>
                  <div className="flex items-center pl-5">
                    <div className="w-1.5 h-6 bg-indigo-400 rounded-r-md mr-3"></div>
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                      const
                    </a>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-8 bg-indigo-600 rounded-r-md mr-3"></div>
                    <a href="#" className="text-gray-800 dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400">
                      Типы данных
                    </a>
                  </div>
                </div>
                
                {showResources && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h4 className="font-medium text-gray-800 dark:text-white mb-3">Дополнительные материалы</h4>
                    <div className="pl-2 space-y-2 text-sm">
                      {lesson?.resources.map((resource:any, index:any) => (
                        <a 
                          key={index} 
                          href={resource.url}
                          className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-3">Ваш прогресс</h4>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Курс {course?.title}</span>
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  
                  <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm mt-4">
                    <CheckSquare size={16} className="text-green-500 mr-2" />
                    <span>Урок {lesson?.order || '?'} из 12</span>
                  </div>
                </div>
              </AnimatedDiv>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}