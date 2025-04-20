// Тесты (квизы) для уроков
module.exports = [
  // JavaScript курс квизы
  {
    id: "js-quiz-1",
    lessonId: "1",
    question: "Что такое JavaScript?",
    options: [
      "Язык стилей",
      "Язык программирования",
      "Язык разметки",
      "Операционная система",
    ],
    correctAnswer: "Язык программирования",
    hint: "Язык, используемый для создания интерактивных веб-страниц",
    explanation:
      "JavaScript - это высокоуровневый язык программирования, который используется для создания динамических элементов на веб-страницах.",
  },
  {
    id: "js-quiz-2",
    lessonId: "2",
    question:
      "Какое ключевое слово используется для объявления константы в JavaScript?",
    options: ["var", "let", "const", "fixed"],
    correctAnswer: "const",
    hint: "Вспомните ключевое слово, которое используется для значений, не подлежащих изменению",
    explanation:
      "const используется для объявления переменных, значение которых не может быть изменено после первоначального присвоения.",
  },

  // Python курс квизы
  {
    id: "py-quiz-1",
    lessonId: "4",
    question: "Как в Python создается комментарий?",
    options: [
      "// Комментарий",
      "/* Комментарий */",
      "# Комментарий",
      "-- Комментарий",
    ],
    correctAnswer: "# Комментарий",
    hint: "Используется символ, который часто встречается в математических операциях",
    explanation: "В Python однострочные комментарии начинаются с символа #",
  },
  {
    id: "py-quiz-2",
    lessonId: "5",
    question: "Какой тип данных не существует в Python?",
    options: ["list", "tuple", "fixed", "dictionary"],
    correctAnswer: "fixed",
    hint: "Внимательно посмотрите на список стандартных типов данных в Python",
    explanation:
      'В Python нет встроенного типа данных "fixed". Существуют list, tuple, dictionary и другие.',
  },

  // HTML/CSS курс квизы
  {
    id: "html-quiz-1",
    lessonId: "7",
    courseId: "3",
    question: "Что означает тег <head> в HTML?",
    options: [
      "Основное содержимое страницы",
      "Метаинформация о документе",
      "Заголовок страницы",
      "Навигационное меню",
    ],
    correctAnswer: "Метаинформация о документе",
    hint: "Этот раздел содержит служебную информацию о документе",
    explanation:
      "Тег <head> содержит метаданные, такие как title, meta-теги, подключаемые стили и скрипты.",
  },
  {
    id: "html-quiz-2",
    lessonId: "8",
    courseId: "3",
    question: "Какое свойство CSS используется для изменения цвета текста?",
    options: ["background-color", "text-color", "color", "font-color"],
    correctAnswer: "color",
    hint: "Это прямое свойство для изменения цвета текста",
    explanation:
      "В CSS для изменения цвета текста используется свойство color.",
  },

  // React курс квизы
  {
    id: "react-quiz-1",
    lessonId: "10",
    courseId: "4",
    question: "Что такое JSX в React?",
    options: [
      "JavaScript-библиотека",
      "Расширение синтаксиса JavaScript",
      "Стиль оформления компонентов",
      "Метод создания анимаций",
    ],
    correctAnswer: "Расширение синтаксиса JavaScript",
    hint: "Это синтаксический сахар для describing UI в React",
    explanation:
      "JSX позволяет описывать структуру пользовательского интерфейса прямо в коде JavaScript",
  },
  {
    id: "react-quiz-2",
    lessonId: "11",
    courseId: "4",
    question:
      "Какой хук используется для управления состоянием в функциональных компонентах?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: "useState",
    hint: "Этот хук позволяет добавлять состояние в функциональные компоненты",
    explanation:
      "useState - основной хук для работы с локальным состоянием в функциональных компонентах React",
  },
];
