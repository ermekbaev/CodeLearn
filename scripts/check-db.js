// scripts/check-db.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Проверяем курсы
    const courses = await prisma.course.count();
    console.log(`✅ Курсов в базе: ${courses}`);

    // Проверяем уроки
    const lessons = await prisma.lesson.count();
    console.log(`✅ Уроков в базе: ${lessons}`);

    // Проверяем квизы
    const quizzes = await prisma.quiz.count();
    console.log(`✅ Квизов в базе: ${quizzes}`);

    // Детальная проверка
    const allCourses = await prisma.course.findMany();
    console.log("\n📚 Курсы:");
    allCourses.forEach((course) => {
      console.log(`- ${course.title} (ID: ${course.id})`);
    });

    const allLessons = await prisma.lesson.findMany({
      take: 5,
      include: {
        course: true,
      },
    });
    console.log("\n📝 Первые 5 уроков:");
    allLessons.forEach((lesson) => {
      console.log(`- ${lesson.title} (Курс: ${lesson.course.title})`);
    });

    const allQuizzes = await prisma.quiz.findMany({
      take: 5,
      include: {
        lesson: true,
      },
    });
    console.log("\n❓ Первые 5 квизов:");
    allQuizzes.forEach((quiz) => {
      console.log(`- ${quiz.question} (Урок: ${quiz.lesson.title})`);
    });
  } catch (error) {
    console.error("Ошибка при проверке базы данных:", error);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
