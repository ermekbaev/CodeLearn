import { PrismaClient } from '@prisma/client';
import { courses } from './courses';
import { lessons } from './lessons';
import { quizzes } from './quizzes';

const prisma = new PrismaClient();

async function main() {
  console.log('Начинаем заполнение базы данных...');

  try {
    // Очистка существующих данных
    await prisma.quiz.deleteMany({});
    await prisma.userProgress.deleteMany({});
    await prisma.lesson.deleteMany({});
    await prisma.course.deleteMany({});

    console.log('База данных очищена');

    // Добавление курсов
    console.log('Добавление курсов...');
    for (const course of courses) {
      try {
        await prisma.course.create({
          data: course
        });
      } catch (courseError) {
        console.error(`Ошибка при добавлении курса ${course.id}:`, courseError);
      }
    }
    console.log(`Добавлено ${courses.length} курсов`);

    // Добавление уроков
    console.log('Добавление уроков...');
    for (const lesson of lessons) {
      try {
        await prisma.lesson.create({
            //@ts-ignore
          data: lesson
        });
      } catch (lessonError) {
        console.error(`Ошибка при добавлении урока ${lesson.id}:`, lessonError);
      }
    }
    console.log(`Добавлено ${lessons.length} уроков`);

    // Добавление квизов
    console.log('Добавление тестов...');
    for (const quiz of quizzes) {
      try {
        await prisma.quiz.create({
          data: {
            ...quiz,
            options: JSON.stringify(quiz.options) // Преобразуем массив в строку JSON
          }
        });
      } catch (quizError) {
        console.error(`Ошибка при добавлении квиза ${quiz.id}:`, quizError);
      }
    }
    console.log(`Добавлено ${quizzes.length} тестов`);

    console.log('Заполнение базы данных завершено!');
  } catch (mainError) {
    console.error('Общая ошибка при заполнении базы данных:', mainError);
    throw mainError;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });