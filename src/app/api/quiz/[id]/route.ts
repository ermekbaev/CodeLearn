import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Использование await для получения параметров маршрута
    const { id } = await Promise.resolve(context.params);
    const lessonId = id;

    const quiz = await prisma.quiz.findFirst({
      where: {
        lessonId: lessonId,
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: 'Тест не найден' },
        { status: 404 }
      );
    }

    // Возвращаем вопрос и варианты ответов, но без правильного ответа
    return NextResponse.json({
      id: quiz.id,
      question: quiz.question,
      options: JSON.parse(quiz.options),
    });
  } catch (error) {
    console.error('Ошибка получения теста:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при получении теста' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json(
        { error: 'Необходима аутентификация' },
        { status: 401 }
      );
    }

    // Использование await для получения параметров маршрута
    const { id } = await Promise.resolve(context.params);
    const quizId = id;
    
    const { answer } = await req.json();

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        correctAnswer: true,
        lessonId: true,
      },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: 'Тест не найден' },
        { status: 404 }
      );
    }

    const isCorrect = answer === quiz.correctAnswer;

    // Если ответ правильный, обновляем прогресс пользователя
    if (isCorrect) {
      await prisma.userProgress.upsert({
        where: {
          userId_lessonId: {
            userId: user.userId,
            lessonId: quiz.lessonId,
          },
        },
        update: {
          completed: true,
        },
        create: {
          userId: user.userId,
          lessonId: quiz.lessonId,
          completed: true,
        },
      });
    }

    return NextResponse.json({
      isCorrect,
      correctAnswer: isCorrect ? null : quiz.correctAnswer,
    });
  } catch (error) {
    console.error('Ошибка проверки ответа:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при проверке ответа' },
      { status: 500 }
    );
  }
}