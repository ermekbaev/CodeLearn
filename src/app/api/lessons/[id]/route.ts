import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Получаем урок по ID
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: id,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            language: true,
          },
        },
        quizzes: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: 'Урок не найден' },
        { status: 404 }
      );
    }

    // Получаем предыдущий и следующий уроки для навигации
    const siblingLessons = await prisma.lesson.findMany({
      where: {
        courseId: lesson.courseId,
      },
      select: {
        id: true,
        order: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    const currentIndex = siblingLessons.findIndex(item => item.id === id);
    const prevLesson = currentIndex > 0 ? siblingLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < siblingLessons.length - 1 ? siblingLessons[currentIndex + 1] : null;

    // Проверяем, есть ли прогресс для этого урока
    let completed = false;
    try {
      const user = await getCurrentUser(req);
      if (user) {
        const progress = await prisma.userProgress.findUnique({
          where: {
            userId_lessonId: {
              userId: user.userId,
              lessonId: id,
            },
          },
        });
        
        completed = progress?.completed || false;
      }
    } catch (error) {
      console.log('Не удалось получить прогресс пользователя:', error);
    }

    // Форматируем данные для ответа
    const formattedLesson = {
      id: lesson.id,
      title: lesson.title,
      content: lesson.content,
      courseId: lesson.courseId,
      order: lesson.order,
      courseName: lesson.course.title,
      courseLanguage: lesson.course.language,
      hasQuiz: lesson.quizzes.length > 0,
      completed: completed,
      duration: `${15 + Math.floor(Math.random() * 15)} минут`, // Моковая длительность
      level: "Начальный", // Моковый уровень сложности
      prevLessonId: prevLesson?.id || null,
      nextLessonId: nextLesson?.id || null,
      resources: [
        { title: 'MDN Web Docs - Документация', url: 'https://developer.mozilla.org/ru/' },
        { title: 'W3Schools - Учебные материалы', url: 'https://www.w3schools.com/' },
        { title: 'JavaScript.info - Современный учебник', url: 'https://javascript.info/ru' }
      ]
    };

    return NextResponse.json(formattedLesson);
  } catch (error) {
    console.error('Ошибка получения урока:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при получении урока' },
      { status: 500 }
    );
  }
}