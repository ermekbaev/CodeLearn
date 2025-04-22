// src/app/api/courses/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Исправление: ждем когда параметры будут доступны
    const  id  = params.id;

    // Получаем данные курса по ID
    const course = await prisma.course.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        language: true,
        createdAt: true,
        lessons: {
          select: {
            id: true,
            title: true,
            order: true,
            content: false, // Не загружаем полный контент для экономии
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Курс не найден' },
        { status: 404 }
      );
    }

    // Добавляем дополнительные поля для фронтенда
    const enhancedCourse = {
      ...course,
      image: course.language.toLowerCase(), // Используем язык как идентификатор изображения
      level: 'Начинающий', // По умолчанию все курсы для начинающих
      students: 1245, // Примерное количество студентов
      rating: 4.8, // Примерный рейтинг
      author: 'Адилет Эрмекбаев', // Автор курса
      updatedAt: new Date().toLocaleDateString(), // Дата обновления
      requirements: [
        'Базовые знания компьютера',
        'Желание учиться программированию',
      ],
      skills: [
        'Основы программирования',
        'Работа с переменными',
        'Функции и управляющие конструкции',
        'Базовые алгоритмы',
      ],
      lessonsCount: course.lessons.length,
    };

    return NextResponse.json(enhancedCourse);
  } catch (error) {
    console.error('Ошибка получения курса:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при получении курса' },
      { status: 500 }
    );
  }
}