// Скрипт для заполнения базы данных (CommonJS версия)
const { PrismaClient } = require("@prisma/client");

// Импортируем данные из отдельных файлов
const courses = require("./data/courses");
const lessons = require("./data/lessons");
const quizzes = require("./data/quizzes");

const prisma = new PrismaClient();

async function main() {
  console.log("Начинаем заполнение базы данных...");

  try {
    // Очистка существующих данных
    await prisma.quiz.deleteMany({});
    await prisma.userProgress.deleteMany({});
    await prisma.lesson.deleteMany({});
    await prisma.course.deleteMany({});

    console.log("База данных очищена");

    // Добавление курсов
    console.log("Добавление курсов...");
    for (const course of courses) {
      try {
        await prisma.course.create({
          data: {
            id: course.id,
            title: course.title,
            description: course.description,
            language: course.language,
            createdAt: course.createdAt || new Date(),
          },
        });
      } catch (courseError) {
        console.error(`Ошибка при добавлении курса ${course.id}:`, courseError);
      }
    }
    console.log(`Добавлено ${courses.length} курсов`);

    // Добавление уроков
    console.log("Добавление уроков...");
    for (const lesson of lessons) {
      try {
        await prisma.lesson.create({
          data: {
            id: lesson.id,
            courseId: lesson.courseId,
            title: lesson.title,
            content: lesson.content,
            order: lesson.order,
          },
        });
      } catch (lessonError) {
        console.error(`Ошибка при добавлении урока ${lesson.id}:`, lessonError);
      }
    }
    console.log(`Добавлено ${lessons.length} уроков`);

    // Добавление квизов
    console.log("Добавление тестов...");
    for (const quiz of quizzes) {
      try {
        // Убираем hint и explanation, так как их нет в схеме
        const quizData = {
          id: quiz.id,
          lessonId: quiz.lessonId,
          question: quiz.question,
          options: JSON.stringify(quiz.options), // Преобразуем массив в строку JSON
          correctAnswer: quiz.correctAnswer,
        };

        await prisma.quiz.create({
          data: quizData,
        });
      } catch (quizError) {
        console.error(`Ошибка при добавлении квиза ${quiz.id}:`, quizError);
      }
    }
    console.log(`Добавлено ${quizzes.length} тестов`);

    console.log("Заполнение базы данных завершено!");
  } catch (mainError) {
    console.error("Общая ошибка при заполнении базы данных:", mainError);
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
