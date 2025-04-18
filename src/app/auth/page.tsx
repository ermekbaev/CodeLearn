'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Code, User, Eye, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedDiv from '../components/AnimatedDiv';

export default function AuthPage() {
  const router = useRouter();
  const { login, register, loading, error, clearError } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  
  
  // Состояния форм
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const tabs = [
    { id: 'login', label: 'Вход' },
    { id: 'register', label: 'Регистрация' }
  ];
  
  // Обработчики изменения полей формы
  const handleLoginChange = (e:any) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    clearError();
  };
  
  const handleRegisterChange = (e:any) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
    clearError();
  };
  
  // Обработчик входа
  const handleLogin = async (e:any) => {
    e.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
      // При успешном входе перенаправление будет выполнено внутри контекста
    } catch (err) {
      // Ошибка будет обработана в контексте
    }
  };
  
  // Обработчик регистрации
  const handleRegister = async (e:any) => {
    e.preventDefault();
    try {
      await register(registerForm.name, registerForm.email, registerForm.password);
      // При успешной регистрации перенаправление будет выполнено внутри контекста
    } catch (err) {
      // Ошибка будет обработана в контексте
    }
  };
  
  // Демо-вход (для упрощения тестирования)
  const handleDemoLogin = () => {
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('user', JSON.stringify({ id: 'demo', name: 'Демо Пользователь', email: 'demo@example.com' }));
    router.push('/courses');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 dark:text-white flex flex-col justify-center items-center px-4 py-12">
      <AnimatedDiv className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl shadow-md">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            CodeLearn
          </h1>
        </div>
        
        {/* Вкладки */}
        <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`flex-1 py-2 text-center rounded-md transition-all ${
                activeTab === tab.id 
                  ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 font-medium shadow-sm' 
                  : 'text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
              onClick={() => {
                setActiveTab(tab.id);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Форма входа */}
        {activeTab === 'login' && (
          <AnimatedDiv>
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="email@example.com"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required
                  />
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Пароль</label>
                <div className="relative">
                  <input 
                    type="password" 
                    name="password"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <Eye className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md flex items-center justify-center disabled:opacity-70"
                disabled={loading}
              >
                <span>{loading ? 'Входим...' : 'Войти'}</span>
                <ArrowRight size={18} className="ml-2" />
              </button>
            </form>
          </AnimatedDiv>
        )}
        
        {/* Форма регистрации */}
        {activeTab === 'register' && (
          <AnimatedDiv>
            <form className="space-y-5" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Имя</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="Ваше имя"
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    required
                  />
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="email@example.com"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required
                  />
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Пароль</label>
                <div className="relative">
                  <input 
                    type="password" 
                    name="password"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="••••••••"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                    minLength={6}
                  />
                  <Eye className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md flex items-center justify-center disabled:opacity-70"
                disabled={loading}
              >
                <span>{loading ? 'Регистрируем...' : 'Создать аккаунт'}</span>
                <ArrowRight size={18} className="ml-2" />
              </button>
            </form>
          </AnimatedDiv>
        )}
        
        <div className="mt-6 flex items-center justify-center">
          <button onClick={handleDemoLogin} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium">
            Демо: Войти без регистрации
          </button>
        </div>
      </AnimatedDiv>
      
      <div className="mt-6 text-gray-600 dark:text-gray-400">
        {activeTab === 'login' ? (
          <p>
            Нет аккаунта? <button onClick={() => setActiveTab('register')} className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300">Зарегистрироваться</button>
          </p>
        ) : (
          <p>
            Уже есть аккаунт? <button onClick={() => setActiveTab('login')} className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300">Войти</button>
          </p>
        )}
      </div>
    </div>
  );
}