import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    console.log("=== GET QUIZ REQUEST STARTED ===");
    
    // Получение параметров маршрута
    const { id } = await Promise.resolve(context.params);
    console.log("Route params - id:", id);
    const lessonId = id;
    console.log("Looking for quiz with lessonId:", lessonId);
    
    // Запрос к базе данных
    const quiz = await prisma.quiz.findFirst({
      where: {
        lessonId: lessonId,
      },
    });
    
    console.log("Quiz found:", quiz ? "Yes" : "No");
    
    if (!quiz) {
      console.log("Quiz not found for lessonId:", lessonId);
      return NextResponse.json(
        { error: 'Тест не найден' },
        { status: 404 }
      );
    }
    
    // Логирование данных квиза
    console.log("Quiz ID:", quiz.id);
    console.log("Quiz question:", quiz.question);
    
    // Парсинг опций и проверка их формата
    const parsedOptions = JSON.parse(quiz.options);
    console.log("Quiz options (parsed):", parsedOptions);
    console.log("Quiz options type:", typeof parsedOptions);
    
    // Логирование правильного ответа (только для отладки)
    console.log("Correct answer (for debugging):", quiz.correctAnswer);
    
    // Подготовка ответа
    const response = {
      id: quiz.id,
      question: quiz.question,
      options: parsedOptions,
    };
    
    console.log("=== GET QUIZ REQUEST COMPLETED ===");
    
    // Возвращаем вопрос и варианты ответов, но без правильного ответа
    return NextResponse.json(response);
  } catch (error) {
    console.error('=== GET QUIZ ERROR ===');
    console.error('Error details:', error);
    
    // Проверка на ошибку парсинга JSON
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      console.error('JSON parsing error - check quiz.options format in database');
    }
    
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
    console.log("=== POST QUIZ ANSWER STARTED ===");
    
    // Аутентификация пользователя
    const user = await getCurrentUser(req);
    console.log("User authenticated:", user ? "Yes" : "No");
    
    if (!user) {
      console.log("Authentication required but user not logged in");
      return NextResponse.json(
        { error: 'Необходима аутентификация' },
        { status: 401 }
      );
    }
    
    console.log("User ID:", user.userId);
    
    // Получение идентификатора квиза
    const { id } = await Promise.resolve(context.params);
    const quizId = id;
    console.log("Quiz ID from params:", quizId);
    
    // Получение ответа пользователя
    const requestBody = await req.json();
    const { answer } = requestBody;
    console.log("Request body:", requestBody);
    console.log("User answer:", answer);
    console.log("User answer type:", typeof answer);
    console.log("User answer length:", answer ? answer.length : 0);
    
    // Получение данных квиза из базы
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        correctAnswer: true,
        lessonId: true,
      },
    });
    
    console.log("Quiz found:", quiz ? "Yes" : "No");
    
    if (!quiz) {
      console.log("Quiz not found with ID:", quizId);
      return NextResponse.json(
        { error: 'Тест не найден' },
        { status: 404 }
      );
    }
    
    // Логирование данных для сравнения
    console.log("Correct answer from DB:", quiz.correctAnswer);
    console.log("Correct answer type:", typeof quiz.correctAnswer);
    console.log("Correct answer length:", quiz.correctAnswer ? quiz.correctAnswer.length : 0);
    console.log("Lesson ID:", quiz.lessonId);
    
    // Детальное сравнение для отладки
    console.log("Strings equal? (===):", answer === quiz.correctAnswer);
    console.log("Strings equal after trim? (trim):", answer.trim() === quiz.correctAnswer.trim());
    console.log("Strings equal ignoring case? (toLowerCase):", 
      answer.toLowerCase() === quiz.correctAnswer.toLowerCase());
    
    // Проверка на наличие невидимых символов 
    //@ts-ignore
    console.log("Answer charCodes:", Array.from(answer).map(c => c.charCodeAt(0)));
    console.log("CorrectAnswer charCodes:", Array.from(quiz.correctAnswer).map(c => c.charCodeAt(0)));
    
    // Основная проверка ответа
    const isCorrect = answer === quiz.correctAnswer;
    console.log("Is answer correct:", isCorrect);
    
    // Обновление прогресса при правильном ответе
    if (isCorrect) {
      console.log("Updating progress for user:", user.userId, "lesson:", quiz.lessonId);
      
      try {
        const progress = await prisma.userProgress.upsert({
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
        
        console.log("Progress updated successfully:", progress);
      } catch (progressError) {
        console.error("Error updating progress:", progressError);
      }
    }
    
    // Подготовка ответа
    const response = {
      isCorrect,
      correctAnswer: isCorrect ? null : quiz.correctAnswer,
    };
    
    console.log("Response:", response);
    console.log("=== POST QUIZ ANSWER COMPLETED ===");
    
    return NextResponse.json(response);
  } catch (error) {
    
    return NextResponse.json(
      { error: 'Что-то пошло не так при проверке ответа' },
      { status: 500 }
    );
  }
}