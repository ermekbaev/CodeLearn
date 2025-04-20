const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Проверяем существование директории
const prismaDir = path.join(__dirname, "../prisma");
if (!fs.existsSync(prismaDir)) {
  console.error("❌ Ошибка: Директория prisma не найдена");
  console.log("Создаем директорию prisma...");
  fs.mkdirSync(prismaDir, { recursive: true });
}

const seedsDir = path.join(prismaDir, "seeds");
if (!fs.existsSync(seedsDir)) {
  console.log("Создаем директорию prisma/seeds...");
  fs.mkdirSync(seedsDir, { recursive: true });
}

const dataDir = path.join(seedsDir, "data");
if (!fs.existsSync(dataDir)) {
  console.log("Создаем директорию prisma/seeds/data...");
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log("🚀 Инициализация базы данных...");

try {
  // Шаг 1: Создаем схему Prisma, если она отсутствует
  const schemaPath = path.join(prismaDir, "schema.prisma");
  if (!fs.existsSync(schemaPath)) {
    console.log("\n📝 Создание схемы Prisma...");
    fs.copyFileSync(
      path.join(__dirname, "../src/prisma/schema.prisma"),
      schemaPath,
      fs.constants.COPYFILE_EXCL
    );
  }

  // Шаг 2: Генерация клиента Prisma
  console.log("\n🔄 Генерация клиента Prisma...");
  execSync("npx prisma generate", { stdio: "inherit" });

  // Шаг 3: Запуск миграций Prisma
  console.log("\n📊 Применение миграций...");
  execSync("npx prisma migrate dev --name init", { stdio: "inherit" });

  // Шаг 4: Заполнение базы данных тестовыми данными
  console.log("\n🌱 Заполнение базы данных тестовыми данными...");
  execSync("node prisma/seeds/seed-common.js", { stdio: "inherit" });

  console.log("\n✅ База данных успешно инициализирована!");
  console.log("\n🎓 Теперь вы можете запустить приложение с помощью команды:");
  console.log("npm run dev");
} catch (error) {
  console.error("\n❌ Ошибка при инициализации базы данных:", error);
  process.exit(1);
}
