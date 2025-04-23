'use client';

import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <ShieldAlert className="h-24 w-24 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Доступ запрещен
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          У вас недостаточно прав для просмотра этой страницы.
        </p>
        <button 
          onClick={() => router.push('/')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
}