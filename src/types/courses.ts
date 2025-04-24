// Типы данных для курсов

export interface Course {
    id: string;
    title: string;
    description: string;
    language: string;
    lessonsCount: number;
    progress?: number;
    image?: string;
    rating?: number;
    students?: number;
    level?: string;
    updatedAt?: string;
    author?: string;
    requirements?: string[];
    skills?: string[];
    lessons?: Lesson[];
  }
  
  export interface Lesson {
    id: string;
    title: string;
    order: number;
    courseId: string;
    hasQuiz?: boolean;
    completed?: boolean;
    duration?: string;
    description?: string;
    content?: string;
    nextLessonId?: string;
    prevLessonId?: string;
  }
  
  export interface Quiz {
    id: string;
    lessonId: string;
    question: string;
    options: string[];
    correctAnswer?: string;
    hint?: string;
    explanation?: string;
  }
  
  export interface UserProgress {
    lessonId: string;
    userId?: string;
    completed: boolean;
    date?: Date;
  }
  
  export interface CourseProgress {
    courseId: string;
    userId?: string;
    progress: number;
    lastActivityAt?: Date;
  }