'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Если пользователь авторизован, перенаправляем на страницу курсов
        router.push('/courses');
      } else {
        // Если пользователь не авторизован, перенаправляем на страницу входа
        router.push('/auth');
      }
    }
  }, [user, loading, router]);

  // Отображаем загрузку, пока проверяем аутентификацию
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300">Загрузка приложения...</p>
    </div>
  );
}