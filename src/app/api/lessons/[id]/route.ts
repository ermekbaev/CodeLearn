import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: id,
      },
      include: {
        course: {
          select: {
            title: true,
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

    return NextResponse.json(lesson);
  } catch (error) {
    console.error('Ошибка получения урока:', error);
    return NextResponse.json(
      { error: 'Что-то пошло не так при получении урока' },
      { status: 500 }
    );
  }
}