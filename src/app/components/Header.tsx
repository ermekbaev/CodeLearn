'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Code, Layout, User, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const handleLogout = () => {
    logout();
    router.push('/auth');
  };
  
  return (
    <>
      {/* Хедер */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/courses" className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <Code className="h-6 w-6 text-indigo-600" />
            </div>
            <h1 className="text-xl font-bold">CodeLearn</h1>
          </Link>
          
          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/courses"
              className="flex items-center space-x-2 hover:text-indigo-200 transition-colors px-3 py-2 rounded-md"
            >
              <Layout size={18} />
              <span>Курсы</span>
            </Link>
            <Link 
              href="/profile"
              className="flex items-center space-x-2 hover:text-indigo-200 transition-colors px-3 py-2 rounded-md"
            >
              <User size={18} />
              <span>Профиль</span>
            </Link>
            <button 
              onClick={handleLogout}
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
              <Link 
                href="/courses"
                className="flex items-center space-x-2 py-3 px-4 hover:bg-indigo-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Layout size={18} />
                <span>Курсы</span>
              </Link>
              <Link 
                href="/profile"
                className="flex items-center space-x-2 py-3 px-4 hover:bg-indigo-700 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} />
                <span>Профиль</span>
              </Link>
              <div className="border-t border-indigo-500 my-2"></div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 py-3 px-4 text-white"
              >
                <LogIn size={18} />
                <span>Выйти</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}