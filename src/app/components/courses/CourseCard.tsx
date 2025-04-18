'use client';

import { useRouter } from 'next/navigation';
import { FileText, User, Star, ArrowRight } from 'lucide-react';
import AnimatedDiv from '../AnimatedDiv';
import { JSX } from 'react';

// Определения типов
interface CourseProps {
  id: string;
  title: string;
  description: string;
  language: string;
  progress?: number;
  image: string;
  lessons: number;
  students: number;
  rating: number;
  index: number;
}

export default function CourseCard({
  id,
  title,
  description,
  language,
  progress = 0,
  image,
  lessons,
  students,
  rating,
  index
}: CourseProps) {
  const router = useRouter();
  
  // Компонент иконки языка программирования
  const LanguageIcon = () => {
    // Иконки языков программирования
    const icons: {[key: string]: JSX.Element} = {
      js: (
        <svg className="w-12 h-12" fill="#F7DF1E" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      ),
      python: (
        <svg className="w-12 h-12" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="pygrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#366B9A" />
              <stop offset="100%" stopColor="#FFD43B" />
            </linearGradient>
          </defs>
          <path fill="url(#pygrad)" d="M12.04 3c-4.616.004-4.52.205-4.52 1.575V5.85h4.6v.57H5.3a1.878 1.878 0 0 0-1.88 1.575c-.043.095-.065.196-.065.3v2.863c0 .73.614 1.32 1.371 1.32h.916v-1.27a1.9 1.9 0 0 1 1.876-1.85l4.615-.021a1.873 1.873 0 0 0 1.867-1.572l.001-.074V4.573c0-.732-.619-1.339-1.37-1.339h-.214c-.038-.238-.09-.43-.435-.49C12.52 2.672 12.238 3 12.04 3zm-2.5 1c.41 0 .75.34.75.75s-.34.75-.75.75-.74-.34-.74-.75.33-.75.74-.75z"/>
          <path fill="url(#pygrad)" d="m13.296 7.67-.38.004H7.5v1.149c-.06.65.41 1.22 1.04 1.322l4.546.02c.65.14 1.14.62 1.13 1.274v2.418c.053.6-.323 1.151-.923 1.29-.27.06-.5.084-.84.12-.5.052-1.02.05-1.64.059l-4.6.02a1.333 1.333 0 0 1-1.302-1.326V12.5h-1.11c-.369-.007-.69-.262-.813-.63A1.4 1.4 0 0 1 3 11.5V8.128C3 7.452 3.638 7 4.32 7h.98v1.22c0 .555.42 1.01.933 1.08l4.575.02c.684-.02 1.2-.39 1.2-1.08V6c.004-.358.176-.7.47-.9.238-.154.53-.2.814-.159l4.6.022c.59.048 1.06.511 1.064 1.108v1.439h-1c-.76 0-1.329.544-1.329 1.24V9.8c.004.8-.52 1.36-1.33 1.36zm-1.403 5.403c.41 0 .74.34.74.75s-.33.75-.74.75a.745.745 0 1 1 0-1.5z"/>
        </svg>
      ),
      html: (
        <svg className="w-12 h-12" fill="#E34F26" viewBox="0 0 24 24">
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
        </svg>
      ),
      react: (
        <svg className="w-12 h-12" fill="#61DAFB" viewBox="0 0 24 24">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a23.982 23.982 0 0 0 1.34-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.087 22.087 0 0 1-2.006.386c.18-.63.406-1.282.66-1.934zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.106 2.154-.265 3.113-.54zm-11.83.01c.96.272 1.99.434 3.088.54.66.905 1.345 1.727 2.04 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.35 1.35 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034a28.073 28.073 0 0 1-1.345 1.56c-.435-.488-.885-1-1.34-1.56z"/>
        </svg>
      ),
    };
    
    return (
      <div className="flex-shrink-0">
        {icons[image.toLowerCase()] || (
          <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
            {language.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
    );
  };

  return (
    <AnimatedDiv 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
      delay={index * 150}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <LanguageIcon />
          <div>
            <div className="flex items-center">
              <h2 className="font-bold text-xl text-gray-800 dark:text-white">{title}</h2>
            </div>
            <div className="flex items-center mt-1 space-x-2">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs rounded-full font-medium">
                {language}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                <Star size={14} className="inline text-yellow-500 mr-1" /> 
                {rating}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg text-center">
            <div className="flex items-center justify-center mb-1">
              <FileText size={16} className="text-indigo-500 mr-1" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">{lessons} уроков</span>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg text-center">
            <div className="flex items-center justify-center mb-1">
              <User size={16} className="text-indigo-500 mr-1" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">{students}+ учеников</span>
            </div>
          </div>
        </div>
        
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ваш прогресс</span>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <button 
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          onClick={() => router.push(`/courses/${id}`)}
        >
          {progress > 0 ? 'Продолжить обучение' : 'Начать обучение'}
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </AnimatedDiv>
  );
}