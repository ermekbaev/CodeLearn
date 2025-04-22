'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Book, CheckSquare, Award, User, ChartBar, Cog, Edit, Code, Star } from 'lucide-react';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';
import AnimatedDiv from '../components/AnimatedDiv';
import { useAuth } from '@/contexts/AuthContext';
import LanguageIcon from '../components/Language/LanguageIcon';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('progress');
  
  // Моковые данные для демонстрации
  const userProgress = [
    {
      id: 1,
      course: 'JavaScript основы',
      language: 'JavaScript',
      progress: 60,
      lastActivity: '2 дня назад',
      image: 'js'
    },
    {
      id: 2,
      course: 'HTML и CSS',
      language: 'HTML/CSS',
      progress: 85,
      lastActivity: 'вчера',
      image: 'html'
    }
  ];
  
  const achievements = [
    { id: 1, name: 'Первый шаг', description: 'Завершите первый урок', icon: 'rocket', earned: true },
    { id: 2, name: 'Настойчивость', description: 'Учитесь 7 дней подряд', icon: 'calendar', earned: true },
    { id: 3, name: 'Кодер', description: 'Решите 10 практических заданий', icon: 'code', earned: false }
  ];

  
  const tabs = [
    { id: 'progress', label: 'Прогресс', icon: <ChartBar className="h-5 w-5" /> },
    { id: 'achievements', label: 'Достижения', icon: <Award className="h-5 w-5" /> },
    { id: 'settings', label: 'Настройки', icon: <Cog className="h-5 w-5" /> }
  ];
  
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <AnimatedDiv className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 md:h-48"></div>
              <div className="px-6 py-6 md:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:-mt-16">
                  <div className="bg-white dark:bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-3xl border-4 border-white dark:border-gray-800 shadow-xl">
                    {user?.name?.substring(0, 2).toUpperCase() || 'ДП'}
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.name || 'Демо Пользователь'}</h1>
                    <div className="flex flex-col md:flex-row md:items-center mt-1">
                      <p className="text-gray-600 dark:text-gray-300">{user?.email || 'demo@example.com'}</p>
                      <span className="hidden md:block mx-2 text-gray-400">•</span>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">С нами с {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-auto">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md flex items-center">
                      <Edit className="h-4 w-4 mr-2" />
                      Редактировать профиль
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 dark:bg-indigo-800 p-3 rounded-lg mr-4">
                        <Book className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">12</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Пройдено уроков</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                    <div className="flex items-center">
                      <div className="bg-green-100 dark:bg-green-800 p-3 rounded-lg mr-4">
                        <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">2</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Активных курсов</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                    <div className="flex items-center">
                      <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-lg mr-4">
                        <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">2</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Заработано достижений</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 border-b border-gray-200 dark:border-gray-700">
                  <ul className="flex flex-wrap -mb-px">
                    {tabs.map(tab => (
                      <li key={tab.id} className="mr-2">
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`inline-flex items-center py-4 px-4 border-b-2 font-medium text-sm ${
                            activeTab === tab.id
                              ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                          }`}
                        >
                          <span className="mr-2">{tab.icon}</span>
                          {tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedDiv>
            
            {activeTab === 'progress' && (
              <AnimatedDiv className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Ваш прогресс обучения</h2>
                
                <div className="space-y-5">
                  {userProgress.map(item => (
                    <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <LanguageIcon language={item.image} />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-800 dark:text-white">{item.course}</h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.language}</p>
                            </div>
                            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {item.progress}%
                            </span>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Прогресс</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">Активность: {item.lastActivity}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full" 
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <button 
                              onClick={() => router.push('/courses')}
                              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium flex items-center"
                            >
                              Продолжить обучение
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-8">
                  <button 
                    onClick={() => router.push('/courses')}
                    className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium border-2 border-indigo-600 dark:border-indigo-400 px-5 py-2 rounded-lg"
                  >
                    Найти новые курсы
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </AnimatedDiv>
            )}
            
            {activeTab === 'achievements' && (
              <AnimatedDiv className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Ваши достижения</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {achievements.map(achievement => (
                    <div 
                      key={achievement.id} 
                      className={`border rounded-xl p-5 flex flex-col items-center text-center ${
                        achievement.earned 
                          ? 'border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20' 
                          : 'border-gray-200 dark:border-gray-700 opacity-60'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                        achievement.earned 
                          ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-400' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      }`}>
                        {achievement.icon === 'rocket' && <Code className="h-8 w-8" />}
                        {achievement.icon === 'calendar' && <CheckSquare className="h-8 w-8" />}
                        {achievement.icon === 'code' && <Code className="h-8 w-8" />}
                      </div>
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{achievement.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{achievement.description}</p>
                      {achievement.earned ? (
                        <span className="text-green-600 dark:text-green-400 text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Получено
                        </span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400 text-xs">В процессе</span>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedDiv>
            )}
            
            {activeTab === 'settings' && (
              <AnimatedDiv className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Настройки аккаунта</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Персональные данные</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Имя</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                          defaultValue={user?.name || 'Демо Пользователь'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                          defaultValue={user?.email || 'demo@example.com'}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Изменить пароль</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Текущий пароль</label>
                        <input 
                          type="password" 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Новый пароль</label>
                        <input 
                          type="password" 
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-between">
                    <button className="px-5 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Отмена
                    </button>
                    <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Сохранить изменения
                    </button>
                  </div>
                </div>
              </AnimatedDiv>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}