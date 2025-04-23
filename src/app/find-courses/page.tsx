'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '@/app/components/Header';
import CourseCard from '@/app/components/courses/CourseCard';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import AnimatedDiv from '@/app/components/AnimatedDiv';
import { Search, Filter, Code, BookOpen, Server } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  lessons: number;
  students: number;
  rating: number;
}

export default function FindCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const languages = [
    { value: 'all', label: 'Все языки', icon: <BookOpen /> },
    { value: 'JavaScript', label: 'JavaScript', icon: <Code /> },
    { value: 'Python', label: 'Python', icon: <Server /> },
    { value: 'HTML/CSS', label: 'HTML/CSS', icon: <Code /> },
    { value: 'React', label: 'React', icon: <Code /> }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        
        // Добавляем демо-данные
        const coursesWithDetails = response.data.map((course: any, index: number) => ({
          ...course,
          students: 500 + index * 200,
          rating: 4.5 + (index % 5) / 10,
          lessons: course.lessonsCount
        }));

        setCourses(coursesWithDetails);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке курсов:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => 
    (selectedLanguage === 'all' || course.language === selectedLanguage) &&
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <AnimatedDiv>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Найдите свой идеальный курс</h1>
              <p className="text-indigo-100 mb-6">Исследуйте курсы по программированию от начального до продвинутого уровня</p>
              
              <div className="flex space-x-4">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Найти курс..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <Search className="absolute right-4 top-3.5 text-white" />
                </div>
                <div className="relative">
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="appearance-none w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    {languages.map(lang => (
                      <option key={lang.value} value={lang.value} className="text-gray-800">
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-4 top-3.5 text-white" />
                </div>
              </div>
            </div>
          </AnimatedDiv>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Курсы не найдены
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Попробуйте изменить фильтры или поисковый запрос
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  language={course.language}
                  lessons={course.lessons}
                  students={course.students}
                  rating={course.rating}
                  image={course.language.toLowerCase()}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}