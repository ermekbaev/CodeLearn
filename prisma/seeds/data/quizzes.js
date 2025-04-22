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
  },
  {
    id: "js-quiz-2",
    lessonId: "2",
    question:
      "Какое ключевое слово используется для объявления константы в JavaScript?",
    options: ["var", "let", "const", "fixed"],
    correctAnswer: "const",
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
  },
  {
    id: "py-quiz-2",
    lessonId: "5",
    question: "Какой тип данных не существует в Python?",
    options: ["list", "tuple", "fixed", "dictionary"],
    correctAnswer: "fixed",
  },

  // HTML/CSS курс квизы
  {
    id: "html-quiz-1",
    lessonId: "7",
    question: "Что означает тег <head> в HTML?",
    options: [
      "Основное содержимое страницы",
      "Метаинформация о документе",
      "Заголовок страницы",
      "Навигационное меню",
    ],
    correctAnswer: "Метаинформация о документе",
  },
  {
    id: "html-quiz-2",
    lessonId: "8",
    question: "Какое свойство CSS используется для изменения цвета текста?",
    options: ["background-color", "text-color", "color", "font-color"],
    correctAnswer: "color",
  },

  // React курс квизы
  {
    id: "react-quiz-1",
    lessonId: "10",
    question: "Что такое JSX в React?",
    options: [
      "JavaScript-библиотека",
      "Расширение синтаксиса JavaScript",
      "Стиль оформления компонентов",
      "Метод создания анимаций",
    ],
    correctAnswer: "Расширение синтаксиса JavaScript",
  },
  {
    id: "react-quiz-2",
    lessonId: "11",
    question:
      "Какой хук используется для управления состоянием в функциональных компонентах?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: "useState",
  },
];
