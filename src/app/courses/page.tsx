'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Layout, User, LogIn, Menu, X } from 'lucide-react';

export default function CoursesPage() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Хедер */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg shadow-md">
                <Layout className="h-6 w-6 text-indigo-600" />
              </div>
              <h1 className="text-xl font-bold">CodeLearn</h1>
            </div>
            
            {/* Десктопное меню */}
            <nav className="hidden md:flex items-center space-x-6">
              <button className="flex items-center space-x-2 bg-white bg-opacity-20 font-medium hover:text-indigo-200 transition-colors px-3 py-2 rounded-md">
                <Layout size={18} />
                <span>Курсы</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-indigo-200 transition-colors px-3 py-2 rounded-md">
                <User size={18} />
                <span>Профиль</span>
              </button>
              <button 
                onClick={logout}
                className="ml-4 bg-white text-indigo-600 px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
              >
                <LogIn size={18} className="inline mr-1" />
                Выйти
              </button>
            </nav>
            
            {/* Мобильная кнопка меню */}
            <button 
              className="md:hidden text-white bg-white bg-opacity-20 p-2 rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>
        
        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div className="bg-indigo-600 text-white md:hidden animate-fadeIn">
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-2">
                <button className="flex items-center space-x-2 py-3 px-4 hover:bg-indigo-700 rounded-md transition-colors">
                  <User size={18} />
                  <span>Профиль</span>
                </button>
                <div className="border-t border-indigo-500 my-2"></div>
                <button 
                  onClick={logout}
                  className="flex items-center space-x-2 py-3 px-4 text-white"
                >
                  <LogIn size={18} />
                  <span>Выйти</span>
                </button>
              </nav>
            </div>
          </div>
        )}
        
        {/* Основной контент */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 md:p-12 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">Добро пожаловать, {user?.name || 'пользователь'}!</h1>
                  <p className="text-lg md:text-xl mb-6 opacity-90">Готовы продолжить обучение программированию?</p>
                  <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition duration-300">
                    Начать обучение
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Ваши курсы</h2>
              <div className="flex space-x-2">
                <button className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-lg font-medium">
                  Все
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors">
                  В процессе
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors">
                  Завершенные
                </button>
              </div>
            </div>
            
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                <Layout className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">У вас пока нет курсов</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Начните своё обучение, выбрав один из наших популярных курсов программирования
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Найти курсы
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}//<Layout size={18} />
//                   <span>Курсы</span>
//                 </button>
//                 <button className="flex items-center space-x-2 py-3 px-4 hover:bg-indigo-700 rounded-md transition-colors">