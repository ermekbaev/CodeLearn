import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json(
        { error: 'Необходима аутентификация' },
        { status: 401 }
      );
    }

    const { lessonId, completed } = await req.json();

    if (!lessonId) {
      return NextResponse.json(
        { error: 'Необходимо указать ID урока' },
        { status: 400 }
      );
    }

    // Обновляем или создаем запись о прогрессе
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.userId,
          lessonId: lessonId,
        },
      },
      update: {
        completed: completed === true,
      },
      create: {
        userId: user.userId,
        lessonId: lessonId,
        completed: completed === true,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Ошибка обновления прогресса:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при обновлении прогресса' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json(
        { error: 'Необходима аутентификация' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      // Получаем весь прогресс пользователя
      const progress = await prisma.userProgress.findMany({
        where: {
          userId: user.userId,
        },
        include: {
          lesson: {
            select: {
              id: true,
              title: true,
              courseId: true,
            },
          },
        },
      });

      return NextResponse.json(progress);
    } else {
      // Получаем прогресс по конкретному курсу
      const lessons = await prisma.lesson.findMany({
        where: {
          courseId: courseId,
        },
        select: {
          id: true,
          title: true,
          order: true,
        },
      });

      const progress = await prisma.userProgress.findMany({
        where: {
          userId: user.userId,
          lesson: {
            courseId: courseId,
          },
        },
      });

      // Форматируем данные для удобства использования на фронтенде
      const formattedProgress = lessons.map((lesson) => {
        const lessonProgress = progress.find((p) => p.lessonId === lesson.id);
        return {
          lessonId: lesson.id,
          title: lesson.title,
          order: lesson.order,
          completed: lessonProgress ? lessonProgress.completed : false,
        };
      });

      return NextResponse.json(formattedProgress);
    }
  } catch (error) {
    console.error('Ошибка получения прогресса:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при получении прогресса' },
      { status: 500 }
    );
  }
}