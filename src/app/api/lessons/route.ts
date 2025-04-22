import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json(
        { error: 'Необходимо указать ID курса' },
        { status: 400 }
      );
    }

  // Получаем все уроки для указанного курса
    const lessons = await prisma.lesson.findMany({
      where: {
        courseId: courseId,
      },
      orderBy: {
        order: 'asc',
      },
      select: {
        id: true,
        title: true,
        order: true,
        courseId: true,
        quizzes: {
          select: {
            id: true,
          },
        },
      },
    });

    // Форматируем данные для ответа
    const formattedLessons = lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      order: lesson.order,
      hasQuiz: lesson.quizzes.length > 0,
    }));

    return NextResponse.json(formattedLessons);
  } catch (error) {
    console.error('Ошибка получения уроков:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при получении уроков' },
      { status: 500 }
    );
  }
}