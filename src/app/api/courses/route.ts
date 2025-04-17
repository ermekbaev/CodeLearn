import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    // Получаем все курсы
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        language: true,
        createdAt: true,
        lessons: {
          select: {
            id: true,
          },
        },
      },
    });

    // Форматируем данные для ответа
    const formattedCourses = courses.map((course) => ({
      id: course.id,
      title: course.title,
      description: course.description,
      language: course.language,
      createdAt: course.createdAt,
      lessonsCount: course.lessons.length,
    }));

    return NextResponse.json(formattedCourses);
  } catch (error) {
    console.error('Ошибка получения курсов:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при получении курсов' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Проверка аутентификации (в реальном приложении здесь была бы проверка на роль администратора)
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json(
        { error: 'Необходима аутентификация' },
        { status: 401 }
      );
    }

    const { title, description, language } = await req.json();

    // Базовая валидация
    if (!title || !description || !language) {
      return NextResponse.json(
        { error: 'Название, описание и язык обязательны' },
        { status: 400 }
      );
    }

    // Создание курса
    const course = await prisma.course.create({
      data: {
        title,
        description,
        language,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error('Ошибка создания курса:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при создании курса' },
      { status: 500 }
    );
  }
}