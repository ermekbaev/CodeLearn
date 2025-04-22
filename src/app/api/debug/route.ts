import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Получаем все курсы
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    // Получаем все уроки
    const lessons = await prisma.lesson.findMany({
      select: {
        id: true,
        title: true,
        courseId: true,
        order: true,
      },
      orderBy: {
        courseId: 'asc',
      },
    });

    // Получаем статистику по курсам
    const courseStats = await Promise.all(
      courses.map(async (course) => {
        const lessonCount = await prisma.lesson.count({
          where: {
            courseId: course.id,
          },
        });
        return {
          courseId: course.id,
          courseTitle: course.title,
          lessonCount,
        };
      })
    );

    return NextResponse.json({
      totalCourses: courses.length,
      totalLessons: lessons.length,
      courses,
      lessons,
      courseStats,
    });
  } catch (error) {
    console.error('Ошибка при получении данных для отладки:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}