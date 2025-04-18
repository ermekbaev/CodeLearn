'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialCheckDone, setInitialCheckDone] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const clearError = () => setError(null);

  // Проверка наличия токена при загрузке
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Получаем данные из localStorage
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (storedToken && storedUser) {
          // Настраиваем заголовок для будущих запросов
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Ошибка проверки аутентификации:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
        setInitialCheckDone(true);
      }
    };

    checkAuth();
  }, []);

  // Функция для входа
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Сохраняем в localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Настраиваем заголовок для будущих запросов
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
      
      // Перенаправляем на главную страницу
      router.push('/courses');
      
    } catch (err: any) {
      console.error('Ошибка входа:', err);
      setError(err.response?.data?.error || 'Произошла ошибка при входе');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Функция для регистрации
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      // Сохраняем в localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Настраиваем заголовок для будущих запросов
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setToken(token);
      setUser(user);
      
      // Перенаправляем на главную страницу
      router.push('/courses');
      
    } catch (err: any) {
      console.error('Ошибка регистрации:', err);
      setError(err.response?.data?.error || 'Произошла ошибка при регистрации');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Функция для выхода
  const logout = () => {
    // Удаляем данные из localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Удаляем заголовок авторизации
    delete axios.defaults.headers.common['Authorization'];
    
    setToken(null);
    setUser(null);
    
    // Перенаправляем на страницу входа
    router.push('/auth');
  };

  // Предоставляем контекст
  const contextValue: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {initialCheckDone ? children : <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}