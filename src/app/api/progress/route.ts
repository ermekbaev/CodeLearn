import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    console.log("=== POST PROGRESS UPDATE STARTED ===");
    
    // Аутентификация пользователя
    const user = await getCurrentUser(req);
    console.log("User authenticated:", user ? "Yes" : "No");
    
    if (!user) {
      console.log("Authentication required for progress update but user not logged in");
      return NextResponse.json(
        { error: 'Необходима аутентификация' },
        { status: 401 }
      );
    }
    
    console.log("User ID:", user.userId);
    
    // Получение данных из запроса
    const requestBody = await req.json();
    console.log("Request body:", requestBody);
    
    const { lessonId, completed } = requestBody;
    console.log("Lesson ID:", lessonId);
    console.log("Completed value:", completed);
    console.log("Completed type:", typeof completed);
    
    if (!lessonId) {
      console.log("Missing required parameter: lessonId");
      return NextResponse.json(
        { error: 'Необходимо указать ID урока' },
        { status: 400 }
      );
    }
    
    // Проверка существования урока
    const lessonExists = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true, courseId: true }
    });
    
    console.log("Lesson exists:", lessonExists ? "Yes" : "No");
    if (lessonExists) {
      console.log("Lesson courseId:", lessonExists.courseId);
    }
    
    // Проверка существующего прогресса
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_lessonId: {
          userId: user.userId,
          lessonId: lessonId,
        },
      }
    });
    
    console.log("Existing progress found:", existingProgress ? "Yes" : "No");
    if (existingProgress) {
      console.log("Current progress state:", existingProgress);
    }
    
    // Подготовка к обновлению или созданию прогресса
    const completedValue = completed === true;
    console.log("Final completed value to save:", completedValue);
    
    // Обновляем или создаем запись о прогрессе
    console.log("Upserting progress record with userId:", user.userId, "lessonId:", lessonId);
    
    try {
      const progress = await prisma.userProgress.upsert({
        where: {
          userId_lessonId: {
            userId: user.userId,
            lessonId: lessonId,
          },
        },
        update: {
          completed: completedValue,
        },
        create: {
          userId: user.userId,
          lessonId: lessonId,
          completed: completedValue,
        },
        // Включаем дополнительные данные для проверки
        include: {
          lesson: {
            select: {
              id: true,
              title: true,
              courseId: true
            }
          }
        }
      });
      
      console.log("Progress upsert successful:", progress);
      console.log("=== POST PROGRESS UPDATE COMPLETED ===");
      
      return NextResponse.json(progress);
    } catch (upsertError) {
      console.error("Error during progress upsert:", upsertError);
      throw upsertError; // Re-throw to be caught by outer try/catch
    }
  } catch (error) {
    console.error('=== POST PROGRESS UPDATE ERROR ===');
    //@ts-ignore
    console.error('Error type:', error.constructor.name);
    //@ts-ignore
    console.error('Error message:', error.message);
    //@ts-ignore
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { error: 'Что-то пошло не так при обновлении прогресса' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log("=== GET PROGRESS STARTED ===");
    
    // Аутентификация пользователя
    const user = await getCurrentUser(req);
    console.log("User authenticated:", user ? "Yes" : "No");
    
    if (!user) {
      console.log('Пользователь не аутентифицирован, возвращаем пустой прогресс');
      return NextResponse.json([]);
    }
    
    console.log("User ID:", user.userId);
    
    // Получение параметров запроса
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    console.log("Course ID from params:", courseId);
    
    if (!courseId) {
      console.log("No courseId provided, returning all user progress");
      
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
      
      console.log(`Found ${progress.length} progress records for user`);
      console.log("Sample progress record:", progress.length > 0 ? progress[0] : "No records");
      console.log("=== GET PROGRESS COMPLETED ===");
      
      return NextResponse.json(progress);
    } else {
      console.log(`Getting progress for specific course ID: ${courseId}`);
      
      // Получаем уроки для курса
      console.log("Fetching lessons for course");
      const lessons = await prisma.lesson.findMany({
        where: {
          courseId: courseId,
        },
        select: {
          id: true,
          title: true,
          order: true,
        },
        orderBy: {
          order: 'asc'
        }
      });
      
      console.log(`Found ${lessons.length} lessons for course`);
      console.log("Lesson IDs:", lessons.map(l => l.id));
      
      // Получаем прогресс пользователя для этого курса
      console.log("Fetching progress for user and course");
      const progress = await prisma.userProgress.findMany({
        where: {
          userId: user.userId,
          lesson: {
            courseId: courseId,
          },
        },
      });
      
      console.log(`Found ${progress.length} progress records for this course`);
      console.log("Progress record lesson IDs:", progress.map(p => p.lessonId));
      
      // Форматируем данные для фронтенда
      console.log("Formatting progress data for frontend");
      const formattedProgress = lessons.map((lesson) => {
        const lessonProgress = progress.find((p) => p.lessonId === lesson.id);
        console.log(`Lesson ${lesson.id} (${lesson.title}): completed = ${lessonProgress ? lessonProgress.completed : false}`);
        
        return {
          lessonId: lesson.id,
          title: lesson.title,
          order: lesson.order,
          completed: lessonProgress ? lessonProgress.completed : false,
        };
      });
      
      console.log("Final formatted progress:", formattedProgress);
      
      // Расчет общего прогресса
      const completedCount = formattedProgress.filter(p => p.completed).length;
      const totalCount = formattedProgress.length;
      const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
      
      console.log(`Course progress: ${completedCount}/${totalCount} = ${progressPercentage}%`);
      console.log("=== GET PROGRESS COMPLETED ===");
      
      return NextResponse.json(formattedProgress);
    }
  } catch (error) {
    console.error('=== GET PROGRESS ERROR ===');
    //@ts-ignore
    console.error('Error type:', error.constructor.name);
    //@ts-ignore
    console.error('Error message:', error.message);
    //@ts-ignore
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { error: 'Что-то пошло не так при получении прогресса' },
      { status: 500 }
    );
  }
}