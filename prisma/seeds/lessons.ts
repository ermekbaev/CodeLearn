export const lessons = [
    // JavaScript курс
    {
      id: '1',
      courseId: '1',
      title: 'Введение в JavaScript',
      content: `
  ## Что такое JavaScript?
  
  JavaScript — это мультипарадигменный язык программирования. Поддерживает объектно-ориентированный, императивный и функциональный стили. Является реализацией спецификации ECMAScript. JavaScript обычно используется как встраиваемый язык для программного доступа к объектам приложений.
  
  ### История JavaScript
  
  JavaScript был создан в 1995 году Бренданом Эйхом за 10 дней. Первоначально он назывался Mocha, затем LiveScript, и, наконец, был переименован в JavaScript. Несмотря на схожее название, JavaScript не имеет прямого отношения к языку Java.
  
  ### Где используется JavaScript?
  
  - **Веб-браузеры**: JavaScript изначально был разработан для браузеров. Он позволяет делать веб-страницы динамическими и интерактивными.
  - **Серверная сторона**: Node.js позволяет запускать JavaScript на сервере.
  - **Мобильная разработка**: Фреймворки, такие как React Native, позволяют создавать мобильные приложения с использованием JavaScript.
  - **Настольные приложения**: Electron позволяет создавать кроссплатформенные настольные приложения с использованием JavaScript.
  
  ## Как включить JavaScript в HTML
  
  JavaScript можно добавить в HTML-документ двумя способами:
  
  ### 1. Внутренний JavaScript
  
  \`\`\`html
  <!DOCTYPE html>
  <html>
  <head>
      <title>Пример JavaScript</title>
      <script>
          alert('Привет, мир!');
      </script>
  </head>
  <body>
      <h1>Моя первая страница с JavaScript</h1>
  </body>
  </html>
  \`\`\`
  
  ### 2. Внешний JavaScript
  
  \`\`\`html
  <!DOCTYPE html>
  <html>
  <head>
      <title>Пример JavaScript</title>
      <script src="script.js"></script>
  </head>
  <body>
      <h1>Моя первая страница с JavaScript</h1>
  </body>
  </html>
  \`\`\`
  
  ## Ваша первая программа на JavaScript
  
  Давайте напишем простую программу, которая выводит сообщение в консоль:
  
  \`\`\`javascript
  console.log('Привет, мир!');
  \`\`\`
  
  Это базовый пример, показывающий, как использовать функцию \`console.log()\` для вывода информации в консоль браузера. Функция \`console.log()\` — одна из самых полезных функций для отладки кода.
  `,
      order: 1,
      createdAt: new Date(),
    },
    {
      id: '2',
      courseId: '1',
      title: 'Переменные и типы данных',
      content: `
  ## Переменные в JavaScript
  
  В JavaScript переменные используются для хранения данных, которые могут изменяться в процессе выполнения программы. Для объявления переменных используются ключевые слова \`let\`, \`const\` и устаревшее \`var\`.
  
  ### let
  
  \`let\` позволяет объявить переменную, значение которой может быть изменено:
  
  \`\`\`javascript
  let name = "John";
  name = "Jane"; // Можно изменить значение
  \`\`\`
  
  ### const
  
  \`const\` используется для объявления константы, значение которой нельзя изменить после присвоения:
  
  \`\`\`javascript
  const PI = 3.14159;
  // PI = 3.14; // Вызовет ошибку
  \`\`\`
  
  ### var (устаревшее)
  
  \`var\` — старый способ объявления переменных. В современном JavaScript рекомендуется использовать \`let\` и \`const\` вместо \`var\`:
  
  \`\`\`javascript
  var oldVariable = "Я устаревшая переменная";
  \`\`\`
  
  ## Типы данных в JavaScript
  
  JavaScript имеет следующие основные типы данных:
  
  ### 1. Примитивные типы данных
  
  - **String** — строка текста
    \`\`\`javascript
    let name = "John";
    \`\`\`
  
  - **Number** — число
    \`\`\`javascript
    let age = 25;
    let price = 19.99;
    \`\`\`
  
  - **Boolean** — логический тип (true/false)
    \`\`\`javascript
    let isActive = true;
    \`\`\`
  
  - **undefined** — переменная объявлена, но значение не присвоено
    \`\`\`javascript
    let x;
    console.log(x); // undefined
    \`\`\`
  
  - **null** — пустое или несуществующее значение
    \`\`\`javascript
    let y = null;
    \`\`\`
  
  - **Symbol** — уникальный и неизменяемый тип данных
    \`\`\`javascript
    let id = Symbol("id");
    \`\`\`
  
  - **BigInt** — целые числа произвольной длины
    \`\`\`javascript
    let bigNumber = 1234567890123456789012345678901234567890n;
    \`\`\`
  
  ### 2. Ссылочные типы данных
  
  - **Object** — объект
    \`\`\`javascript
    let person = {
      name: "John",
      age: 30
    };
    \`\`\`
  
  - **Array** — массив (тоже объект)
    \`\`\`javascript
    let colors = ["red", "green", "blue"];
    \`\`\`
  
  - **Function** — функция (тоже объект)
    \`\`\`javascript
    function greet() {
      console.log("Hello!");
    }
    \`\`\`
  
  ## Проверка типа переменной
  
  Для проверки типа переменной можно использовать оператор \`typeof\`:
  
  \`\`\`javascript
  let name = "John";
  console.log(typeof name); // "string"
  
  let age = 30;
  console.log(typeof age); // "number"
  
  let isActive = true;
  console.log(typeof isActive); // "boolean"
  
  let person = { name: "John" };
  console.log(typeof person); // "object"
  \`\`\`
  
  ## Преобразование типов
  
  JavaScript автоматически преобразует типы при необходимости, но это может привести к неожиданным результатам. Лучше явно преобразовывать типы:
  
  \`\`\`javascript
  // Преобразование в строку
  let num = 5;
  let str = String(num); // "5"
  
  // Преобразование в число
  let str2 = "10";
  let num2 = Number(str2); // 10
  
  // Преобразование в логический тип
  let str3 = "Hello";
  let bool = Boolean(str3); // true (непустая строка)
  \`\`\`
  `,
      order: 2,
      createdAt: new Date(),
    },
    {
      id: '3',
      courseId: '1',
      title: 'Функции и области видимости',
      content: `
  ## Функции в JavaScript
  
  Функция — это блок кода, предназначенный для выполнения определенной задачи. Функция выполняется только тогда, когда она вызывается.
  
  ### Объявление функции
  
  Существует несколько способов объявления функций в JavaScript:
  
  #### 1. Объявление функции (Function Declaration)
  
  \`\`\`javascript
  function greet(name) {
    return "Привет, " + name + "!";
  }
  
  // Вызов функции
  console.log(greet("Алексей")); // "Привет, Алексей!"
  \`\`\`
  
  #### 2. Функциональное выражение (Function Expression)
  
  \`\`\`javascript
  const greet = function(name) {
    return "Привет, " + name + "!";
  };
  
  // Вызов функции
  console.log(greet("Мария")); // "Привет, Мария!"
  \`\`\`
  
  #### 3. Стрелочные функции (Arrow Functions)
  
  Стрелочные функции были добавлены в ES6 и предоставляют более короткий синтаксис для объявления функций:
  
  \`\`\`javascript
  const greet = (name) => {
    return "Привет, " + name + "!";
  };
  
  // Для простых функций можно использовать еще более короткий синтаксис
  const greetShort = name => "Привет, " + name + "!";
  
  console.log(greetShort("Иван")); // "Привет, Иван!"
  \`\`\`
  
  ### Параметры функции
  
  Функции могут принимать параметры — значения, которые передаются в функцию:
  
  \`\`\`javascript
  function add(a, b) {
    return a + b;
  }
  
  console.log(add(5, 3)); // 8
  \`\`\`
  
  #### Параметры по умолчанию
  
  В ES6 вы можете задать значения по умолчанию для параметров:
  
  \`\`\`javascript
  function greet(name = "гость") {
    return "Привет, " + name + "!";
  }
  
  console.log(greet()); // "Привет, гость!"
  console.log(greet("Анна")); // "Привет, Анна!"
  \`\`\`
  
  ### Возвращаемое значение
  
  Функция может возвращать значение с помощью оператора \`return\`. Если \`return\` не указан, функция вернет \`undefined\`:
  
  \`\`\`javascript
  function multiply(a, b) {
    return a * b;
  }
  
  function log(message) {
    console.log(message);
    // Нет оператора return, функция вернет undefined
  }
  
  console.log(multiply(4, 5)); // 20
  console.log(log("Тест")); // выведет "Тест", затем undefined
  \`\`\`
  
  ## Области видимости в JavaScript
  
  Область видимости определяет доступность (видимость) переменных. В JavaScript есть несколько типов областей видимости:
  
  ### 1. Глобальная область видимости
  
  Переменные, объявленные вне функций, имеют глобальную область видимости:
  
  \`\`\`javascript
  let globalVar = "Я глобальная переменная";
  
  function testFunction() {
    console.log(globalVar); // "Я глобальная переменная"
  }
  
  testFunction();
  \`\`\`
  
  ### 2. Функциональная область видимости
  
  Переменные, объявленные внутри функции, доступны только внутри этой функции:
  
  \`\`\`javascript
  function testFunction() {
    let localVar = "Я локальная переменная";
    console.log(localVar); // "Я локальная переменная"
  }
  
  testFunction();
  // console.log(localVar); // Ошибка: localVar is not defined
  \`\`\`
  
  ### 3. Блочная область видимости
  
  Переменные, объявленные с \`let\` и \`const\`, имеют блочную область видимости:
  
  \`\`\`javascript
  if (true) {
    let blockVar = "Я блочная переменная";
    const constVar = "Я константа с блочной областью видимости";
    console.log(blockVar); // "Я блочная переменная"
    console.log(constVar); // "Я константа с блочной областью видимости"
  }
  
  // console.log(blockVar); // Ошибка: blockVar is not defined
  // console.log(constVar); // Ошибка: constVar is not defined
  \`\`\`
  
  ### Вложенные области видимости
  
  Внутренние области видимости имеют доступ к переменным из внешних областей:
  
  \`\`\`javascript
  let outer = "Я внешняя переменная";
  
  function outerFunction() {
    let middle = "Я средняя переменная";
    
    function innerFunction() {
      let inner = "Я внутренняя переменная";
      console.log(outer); // "Я внешняя переменная"
      console.log(middle); // "Я средняя переменная"
      console.log(inner); // "Я внутренняя переменная"
    }
    
    innerFunction();
    console.log(outer); // "Я внешняя переменная"
    console.log(middle); // "Я средняя переменная"
    // console.log(inner); // Ошибка: inner is not defined
  }
  
  outerFunction();
  console.log(outer); // "Я внешняя переменная"
  // console.log(middle); // Ошибка: middle is not defined
  // console.log(inner); // Ошибка: inner is not defined
  \`\`\`
  
  ### Поднятие (Hoisting)
  
  JavaScript "поднимает" объявления переменных и функций в начало области видимости:
  
  \`\`\`javascript
  // Это работает благодаря поднятию
  console.log(hoistedFunction()); // "Я поднятая функция"
  
  function hoistedFunction() {
    return "Я поднятая функция";
  }
  
  // Но с переменными все сложнее
  console.log(x); // undefined (объявление поднято, но не инициализация)
  var x = 5;
  
  // console.log(y); // Ошибка: Cannot access 'y' before initialization
  let y = 10;
  \`\`\`
  `,
      order: 3,
      createdAt: new Date(),
    },
    
    // Python курс
    {
      id: '4',
      courseId: '2',
      title: 'Введение в Python',
      content: `
## Что такое Python?

Python — это высокоуровневый интерпретируемый язык программирования общего назначения с динамической типизацией. Он был создан Гвидо ван Россумом в 1991 году и с тех пор стал одним из самых популярных языков программирования в мире.

### Особенности Python

- **Простой и понятный синтаксис**: Python был разработан с упором на читаемость кода. Его синтаксис использует отступы вместо фигурных скобок для определения блоков кода.
- **Интерпретируемый язык**: Программы на Python не требуют компиляции перед выполнением.
- **Динамическая типизация**: Типы переменных определяются во время выполнения, а не при объявлении.
- **Автоматическое управление памятью**: Python сам выделяет и освобождает память через сборщик мусора.
- **Кроссплатформенность**: Python работает на различных операционных системах (Windows, macOS, Linux).

### Где используется Python?

- **Веб-разработка**: Django, Flask, FastAPI
- **Наука о данных и машинное обучение**: NumPy, Pandas, TensorFlow, PyTorch
- **Автоматизация**: Скрипты для выполнения повторяющихся задач
- **Образование**: Python часто используется как первый язык программирования
- **Игры и графика**: Pygame, Panda3D
- **Финансы и торговля**: Алгоритмы для работы с большими объемами данных

## Установка Python

### Windows

1. Перейдите на официальный сайт Python (python.org).
2. Загрузите последнюю версию Python для Windows.
3. Запустите установщик и убедитесь, что опция "Add Python to PATH" отмечена.
4. Нажмите "Install Now".

### macOS

1. Многие версии macOS уже имеют предустановленный Python.
2. Для установки последней версии можно использовать Homebrew:
   \`\`\`bash
   brew install python
   \`\`\`

### Linux

В большинстве дистрибутивов Linux Python уже установлен. Если нет, можно установить через менеджер пакетов:

- Ubuntu/Debian:
  \`\`\`bash
  sudo apt update
  sudo apt install python3
  \`\`\`

- Fedora:
  \`\`\`bash
  sudo dnf install python3
  \`\`\`

## Ваша первая программа на Python

Давайте создадим простую программу "Hello, World!" на Python:

\`\`\`python
print("Hello, World!")
\`\`\`

Это все! Одна строка кода выводит текст "Hello, World!" на экран. Это демонстрирует простоту Python.

### Использование Python в интерактивном режиме

Python также имеет интерактивный режим, где можно выполнять команды построчно:

1. Откройте командную строку или терминал.
2. Введите \`python\` или \`python3\` (в зависимости от вашей установки).
3. Вы увидите приглашение \`>>>\`, указывающее на то, что вы находитесь в интерактивном режиме Python.
4. Теперь вы можете вводить код Python и сразу видеть результаты:

\`\`\`python
>>> print("Hello from interactive mode!")
Hello from interactive mode!
>>> 2 + 3
5
>>> name = "Python"
>>> print(f"I love {name}!")
I love Python!
\`\`\`

### Комментарии в Python

Комментарии в Python начинаются с символа \`#\`. Все, что следует за этим символом в строке, игнорируется интерпретатором:

\`\`\`python
# Это однострочный комментарий

print("Hello, World!")  # Это комментарий в конце строки кода

"""
Это многострочный комментарий,
который иногда также используется как документационная строка (docstring).
"""
\`\`\`
      `,
      order: 1,
      createdAt: new Date(),
    },
    {
      id: '5',
      courseId: '2',
      title: 'Переменные и типы данных в Python',
      content: `
## Переменные в Python

В Python переменные - это просто метки для хранения данных. В отличие от некоторых других языков, вам не нужно объявлять тип переменной заранее.

### Создание переменных

\`\`\`python
# Целое число
age = 25

# Строка
name = "Alice"

# Число с плавающей точкой
height = 1.75

# Булево значение
is_student = True
\`\`\`

### Динамическая типизация

Python позволяет менять тип переменной во время выполнения программы:

\`\`\`python
x = 10       # x - целое число
x = "Hello"  # теперь x - строка
x = 3.14     # теперь x - число с плавающей точкой
\`\`\`

## Основные типы данных

### 1. Числовые типы

#### Целые числа (int)
\`\`\`python
# Десятичные числа
age = 25
big_number = 1_000_000  # Можно использовать подчеркивания для читаемости

# Двоичные, восьмеричные и шестнадцатеричные числа
binary = 0b1010    # Двоичное (10 в десятичной)
octal = 0o12       # Восьмеричное (10 в десятичной)
hexadecimal = 0xA  # Шестнадцатеричное (10 в десятичной)
\`\`\`

#### Числа с плавающей точкой (float)
\`\`\`python
pi = 3.14159
scientific_notation = 1.23e-4  # 0.000123
\`\`\`

#### Комплексные числа
\`\`\`python
complex_number = 3 + 4j
\`\`\`

### 2. Строки (str)

\`\`\`python
# Создание строк
single_quote = 'Hello'
double_quote = "World"
multi_line = """
Многострочная
строка
"""

# Форматирование строк
name = "Alice"
greeting = f"Привет, {name}!"  # Форматирование с f-строками
\`\`\`

### 3. Списки (list)

\`\`\`python
# Создание списков
fruits = ["яблоко", "банан", "вишня"]

# Изменение списков
fruits.append("апельсин")  # Добавление элемента
fruits[1] = "груша"        # Изменение элемента

# Срезы списков
first_two = fruits[:2]     # Первые два элемента
last_two = fruits[-2:]     # Последние два элемента
\`\`\`

### 4. Кортежи (tuple)

\`\`\`python
# Создание кортежей (неизменяемых списков)
coordinates = (10, 20)
single_element_tuple = (42,)  # Запятая обязательна

# Распаковка кортежей
x, y = coordinates
\`\`\`

### 5. Словари (dict)

\`\`\`python
# Создание словарей
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Доступ и изменение значений
print(person["name"])
person["job"] = "инженер"  # Добавление нового ключа
\`\`\`

### 6. Булевы значения (bool)

\`\`\`python
is_true = True
is_false = False

# Логические операции
print(True and False)   # False
print(True or False)    # True
print(not True)         # False
\`\`\`

### 7. None

\`\`\`python
# Специальное значение, означающее отсутствие значения
x = None
\`\`\`

## Преобразование типов

\`\`\`python
# Преобразование между типами
integer = int("10")     # Из строки в целое число
string = str(42)        # Из числа в строку
float_num = float("3.14")  # Из строки в число с плавающей точкой
\`\`\`

## Проверка типа

\`\`\`python
x = 42
print(type(x))  # <class 'int'>
\`\`\`
      `,
      order: 2,
      createdAt: new Date(),
    },
    {
      id: '6',
      courseId: '2',
      title: 'Основы работы с функциями в Python',
      content: `
## Функции в Python

Функции в Python - это блоки кода, которые выполняют определенную задачу и могут быть вызваны многократно.

### Простейшее объявление функции

\`\`\`python
def greet():
    print("Привет, мир!")

# Вызов функции
greet()
\`\`\`

### Функции с параметрами

\`\`\`python
def welcome(name):
    print(f"Добро пожаловать, {name}!")

welcome("Алиса")  # Добро пожаловать, Алиса!
\`\`\`

### Функции с несколькими параметрами

\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8
\`\`\`

### Параметры по умолчанию

\`\`\`python
def power(base, exponent=2):
    return base ** exponent

print(power(4))     # 16 (4 в квадрате)
print(power(4, 3))  # 64 (4 в кубе)
\`\`\`

### Возвращение нескольких значений

\`\`\`python
def get_coordinates():
    x = 10
    y = 20
    return x, y  # Неявный кортеж

x, y = get_coordinates()
print(x, y)  # 10 20
\`\`\`

### Произвольное число аргументов

\`\`\`python
def sum_all(*args):
    total = 0
    for num in args:
        total += num
    return total

print(sum_all(1, 2, 3, 4, 5))  # 15

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Алиса", age=30, city="Москва")
\`\`\`

### Лямбда-функции (анонимные функции)

\`\`\`python
# Краткий способ создания небольших функций
square = lambda x: x ** 2

print(square(4))  # 16

# Использование с встроенными функциями
numbers = [1, 2, 3, 4, 5]
squared_numbers = list(map(lambda x: x ** 2, numbers))
print(squared_numbers)  # [1, 4, 9, 16, 25]
\`\`\`

### Области видимости переменных

\`\`\`python
global_var = "Я глобальная переменная"

def test_scope():
    local_var = "Я локальная переменная"
    print(global_var)   # Доступ к глобальной переменной
    print(local_var)    # Локальная переменная

test_scope()
# print(local_var)  # Вызовет ошибку, local_var не виден вне функции
\`\`\`

### Рекурсивные функции

\`\`\`python
def factorial(n):
    # Базовый случай
    if n == 0 or n == 1:
        return 1
    # Рекурсивный случай
    else:
        return n * factorial(n - 1)

print(factorial(5))  # 120
\`\`\`

### Аннотации типов (необязательно)

\`\`\`python
def greeting(name: str) -> str:
    return f"Привет, {name}!"

def calculate_area(width: float, height: float) -> float:
    return width * height
\`\`\`
      `,
      order: 3,
      createdAt: new Date(),
    },

    // HTML курс
    {
  id: '7',
  courseId: '3',
  title: 'Введение в HTML',
  content: `
## Что такое HTML?

HTML (HyperText Markup Language) — это стандартный язык разметки для создания веб-страниц. Он описывает структуру и содержание веб-документа с помощью специальных тегов.

### История HTML

- **1989 год**: Тим Бернерс-Ли предложил концепцию Всемирной паутины
- **1991 год**: Создан первый публичный веб-сайт
- **HTML 4.01**: Стандартизация в 1999 году
- **HTML5**: Современная версия, представленная в 2014 году

### Основные понятия

- **Теги**: Элементы, которые определяют структуру и содержание
- **Элементы**: Составные части веб-страницы
- **Атрибуты**: Дополнительная информация о элементах

## Базовая структура HTML-документа

\`\`\`html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Моя первая страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
    <p>Это мой первый HTML-документ.</p>
</body>
</html>
\`\`\`

### Разбор базовой структуры

- \`<!DOCTYPE html>\`: Декларация типа документа
- \`<html>\`: Корневой элемент HTML-страницы
- \`<head>\`: Метаинформация о документе
- \`<body>\`: Основное содержимое страницы

## Основные теги

### Заголовки

\`\`\`html
<h1>Заголовок первого уровня</h1>
<h2>Заголовок второго уровня</h2>
<h3>Заголовок третьего уровня</h3>
<!-- до h6 -->
\`\`\`

### Абзацы и текст

\`\`\`html
<p>Это абзац текста.</p>
<strong>Жирный текст</strong>
<em>Курсивный текст</em>
<u>Подчеркнутый текст</u>
\`\`\`

### Списки

\`\`\`html
<!-- Маркированный список -->
<ul>
    <li>Элемент 1</li>
    <li>Элемент 2</li>
</ul>

<!-- Нумерованный список -->
<ol>
    <li>Первый элемент</li>
    <li>Второй элемент</li>
</ol>
\`\`\`

### Ссылки и изображения

\`\`\`html
<!-- Гиперссылка -->
<a href="https://example.com">Ссылка на сайт</a>

<!-- Изображение -->
<img src="image.jpg" alt="Описание изображения">
\`\`\`

## Семантические теги HTML5

\`\`\`html
<header>Верхний колонтитул</header>
<nav>Навигационное меню</nav>
<main>Основное содержимое</main>
<article>Независимый контент</article>
<section>Тематический раздел</section>
<aside>Дополнительная информация</aside>
<footer>Нижний колонтитул</footer>
\`\`\`

## Простой пример полной страницы

\`\`\`html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Моя первая страница</title>
</head>
<body>
    <header>
        <h1>Мой первый веб-сайт</h1>
        <nav>
            <ul>
                <li><a href="#home">Главная</a></li>
                <li><a href="#about">О нас</a></li>
                <li><a href="#contact">Контакты</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="home">
            <h2>Добро пожаловать!</h2>
            <p>Это моя первая веб-страница.</p>
        </section>

        <section id="about">
            <h2>О нас</h2>
            <p>Немного информации о нас.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Мой первый сайт</p>
    </footer>
</body>
</html>
\`\`\`

## Инструменты для разработки

1. **Текстовые редакторы**:
   - Visual Studio Code
   - Sublime Text
   - Atom
   - Notepad++

2. **Браузеры для разработчиков**:
   - Google Chrome
   - Mozilla Firefox
   - Safari
   - Microsoft Edge

## Практические советы

- Всегда используйте семантические теги
- Правильно закрывайте теги
- Используйте валидный HTML
- Следите за структурой документа
  `,
  order: 1,
  createdAt: new Date(),
    },
    {
  id: '8',
  courseId: '3',
  title: 'Основы CSS',
  content: `
## Что такое CSS?

CSS (Cascading Style Sheets) — язык описания внешнего вида документа, написанного с использованием языка разметки.

### Для чего нужен CSS?

- Управление цветом и шрифтами
- Создание макетов и размещение элементов
- Адаптивный дизайн
- Анимация и переходы

## Подключение CSS

### 1. Внутренние стили

\`\`\`html
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
    </style>
</head>
\`\`\`

### 2. Внешний файл стилей

\`\`\`html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
\`\`\`

### 3. Встроенные стили

\`\`\`html
<div style="color: blue; font-size: 16px;">
    Текст с встроенными стилями
</div>
\`\`\`

## Селекторы

### Базовые селекторы

\`\`\`css
/* Селектор тега */
p {
    color: black;
}

/* Селектор класса */
.highlight {
    background-color: yellow;
}

/* Селектор ID */
#unique-element {
    border: 2px solid red;
}
\`\`\`

### Продвинутые селекторы

\`\`\`css
/* Дочерний селектор */
div > p {
    font-weight: bold;
}

/* Селектор потомка */
div p {
    margin-left: 20px;
}

/* Селектор по атрибуту */
input[type="text"] {
    border: 1px solid gray;
}
\`\`\`

## Основные свойства

### Текст и шрифты

\`\`\`css
body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: normal;
    line-height: 1.5;
    color: #333;
    text-align: center;
}
\`\`\`

### Цвета и фон

\`\`\`css
.element {
    background-color: #f1f1f1;
    background-image: url('image.jpg');
    background-size: cover;
    color: rgb(0, 0, 0);
    opacity: 0.8;
}
\`\`\`

### Размеры и отступы

\`\`\`css
.block {
    width: 300px;
    height: 200px;
    max-width: 100%;
    
    padding: 20px;
    margin: 10px;
    
    border: 1px solid black;
    border-radius: 5px;
}
\`\`\`

## Блочная модель

\`\`\`css
.box {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 10px solid black;
    margin: 20px;
}
\`\`\`

## Flexbox-макет

\`\`\`css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.item {
    flex: 1;
    background-color: #f1f1f1;
}
\`\`\`

## Медиа-запросы

\`\`\`css
/* Мобильные устройства */
@media (max-width: 600px) {
    body {
        font-size: 14px;
    }

    .container {
        flex-direction: column;
    }
}
\`\`\`

## Пример полного CSS-файла

\`\`\`css
/* Сброс стилей */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

header {
    background-color: #f4f4f4;
    padding: 1rem;
    text-align: center;
}

nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
}

nav ul li {
    margin: 0 15px;
}

nav ul li a {
    text-decoration: none;
    color: #333;
}

main {
    padding: 20px 0;
}

footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem;
}
\`\`\`

## Практические советы

1. Используйте reset или normalize CSS
2. Применяйте каскадность
3. Используйте относительные единицы
4. Группируйте селекторы
5. Комментируйте сложные стили
  `,
  order: 2,
  createdAt: new Date(),
    },
    {
  id: '9',
  courseId: '3',
  title: 'Создание адаптивных макетов',
  content: `
## Адаптивный веб-дизайн

Адаптивный веб-дизайн — подход к созданию веб-сайтов, который обеспечивает корректное отображение сайта на различных устройствах и размерах экрана.

### Основные принципы

1. **Гибкая сетка**: Использование относительных единиц
2. **Гибкие изображения**: Масштабирование без потери качества
3. **Медиа-запросы**: Адаптация стилей под разные устройства

## Viewport

Первый шаг к адаптивности — правильная настройка viewport:

\`\`\`html
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
\`\`\`

### Разбор атрибутов viewport

- \`width=device-width\`: Ширина страницы совпадает с шириной устройства
- \`initial-scale=1.0\`: Начальный масштаб без увеличения или уменьшения

## Медиа-запросы

Основной инструмент создания адаптивных макетов:

\`\`\`css
/* Базовые стили для мобильных устройств */
.container {
    width: 100%;
    padding: 10px;
}

/* Планшеты */
@media screen and (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Десктоп */
@media screen and (min-width: 1024px) {
    .container {
        max-width: 1200px;
    }
}
\`\`\`

### Виды медиа-запросов

- \`min-width\`: Минимальная ширина устройства
- \`max-width\`: Максимальная ширина устройства
- \`orientation\`: Ориентация устройства (книжная/альбомная)

## Гибкие единицы измерения

\`\`\`css
.responsive-block {
    /* Проценты */
    width: 100%;
    max-width: 600px;

    /* Относительные единицы */
    font-size: 1rem;      /* Относительно корневого элемента */
    padding: 1em;         /* Относительно текущего шрифта */
    margin: 2vw;          /* Относительно ширины вьюпорта */
    height: 50vh;         /* Относительно высоты вьюпорта */
}
\`\`\`

## Flexbox для адаптивности

\`\`\`css
.flex-container {
    display: flex;
    flex-wrap: wrap;
}

.flex-item {
    flex: 1 1 300px; /* Гибкая ширина */
    margin: 10px;
}

@media screen and (max-width: 600px) {
    .flex-container {
        flex-direction: column;
    }
}
\`\`\`

## Grid-макет

\`\`\`css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

@media screen and (max-width: 600px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
}
\`\`\`

## Гибкие изображения

\`\`\`css
img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
}

.responsive-image {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
}

/* Адаптивные изображения с разными источниками */
@media screen and (max-width: 600px) {
    .responsive-image {
        max-width: 100%;
    }
}
\`\`\`

## Полный пример адаптивной страницы

\`\`\`html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Адаптивный сайт</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 15px;
        }

        .grid-layout {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .card {
            background-color: #f4f4f4;
            padding: 20px;
            border-radius: 5px;
        }

        /* Мобильные устройства */
        @media screen and (max-width: 600px) {
            .container {
                padding: 10px;
            }

            .grid-layout {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Адаптивный сайт</h1>
            <nav>
                <ul class="grid-layout">
                    <li class="card">Главная</li>
                    <li class="card">О нас</li>
                    <li class="card">Контакты</li>
                </ul>
            </nav>
        </header>

        <main class="grid-layout">
            <section class="card">
                <h2>Первая секция</h2>
                <p>Содержимое, которое будет красиво выглядеть на любом устройстве.</p>
            </section>
            <section class="card">
                <h2>Вторая секция</h2>
                <p>Адаптивный дизайн - это просто!</p>
            </section>
            <section class="card">
                <h2>Третья секция</h2>
                <p>Grid и Flexbox помогают создавать гибкие макеты.</p>
            </section>
        </main>

        <footer class="card">
            <p>&copy; 2025 Адаптивный сайт</p>
        </footer>
    </div>
</body>
</html>
\`\`\`

## Инструменты тестирования

### Встроенные инструменты браузеров
- Режим device toolbar в Chrome DevTools
- Responsive Design Mode в Firefox
- Эмуляторы устройств в Safari и Edge

### Онлайн-сервисы
- Responsinator
- Browser Stack
- Am I Responsive?

## Советы по созданию адаптивных сайтов

1. **Mobile First**: Начинайте разработку с мобильной версии
2. **Относительные единицы**: Используйте %, em, rem
3. **Гибкие изображения**: Не фиксируйте жестко размеры
4. **Медиа-запросы**: Применяйте осмысленно
5. **Тестирование**: Проверяйте на реальных устройствах

## Поддержка старых браузеров

\`\`\`css
/* Полифилы для флексбокса */
.flex-container {
    display: -webkit-box;      /* iOS 6-, Safari 3.1-6 */
    display: -ms-flexbox;      /* IE 10 */
    display: -webkit-flex;     /* Safari 6.1+ */
    display: flex;             /* Современные браузеры */
}
\`\`\`

## Популярные CSS-фреймворки

- **Bootstrap**: Самый популярный фреймворк
- **Tailwind CSS**: Утилитарный подход
- **Foundation**: Гибкий адаптивный фреймворк
- **Bulma**: Современный CSS-фреймворк

## Практическое задание

Создайте адаптивную страницу с:
- Гибкой сеткой (Grid или Flexbox)
- Медиа-запросами для разных устройств
- Масштабируемыми изображениями
- Корректным отображением на мобильных, планшетах и десктопах

## Ресурсы для углубленного изучения

1. MDN Web Docs
2. CSS-Tricks
3. Coursera и Udacity
4. freeCodeCamp
5. YouTube-каналы по веб-разработке
  `,
  order: 3,
  createdAt: new Date(),
    },

    //React курс
    {
  id: '10',
  courseId: '4',
  title: 'Введение в React',
  content: `
## Что такое React?

React — популярная JavaScript-библиотека для создания пользовательских интерфейсов, разработанная Facebook (Meta). Она позволяет создавать масштабируемые и быстрые веб-приложения.

### История React

- **2011 год**: Разработан в Facebook
- **2013 год**: Открыт как open-source проект
- **Сейчас**: Одна из самых популярных библиотек для фронтенда

### Ключевые особенности

- **Компонентный подход**: Разделение интерфейса на независимые компоненты
- **Виртуальный DOM**: Оптимизация обновлений интерфейса
- **Декларативность**: Описание того, как должен выглядеть интерфейс
- **Унидirectional data flow**: Однонаправленный поток данных

## Установка и настройка

### Создание нового проекта

\`\`\`bash
# Используя Create React App
npx create-react-app my-first-react-app
cd my-first-react-app
npm start
\`\`\`

### Альтернативные способы

1. **Vite**: Быстрый сборщик проектов
\`\`\`bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
\`\`\`

2. **Next.js**: Фреймворк для React
\`\`\`bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
\`\`\`

## Первый React-компонент

### Функциональный компонент

\`\`\`jsx
// Простейший компонент
function Greeting() {
  return <h1>Привет, React!</h1>;
}

// Современный синтаксис стрелочной функции
const Greeting = () => {
  return <h1>Привет, React!</h1>;
};

// Короткая запись
const Greeting = () => <h1>Привет, React!</h1>;
\`\`\`

## JSX - расширение JavaScript

JSX позволяетописывать структуру интерфейса прямо в коде:

\`\`\`jsx
// Внедрение переменных
const name = 'Алиса';
const element = <h1>Привет, {name}!</h1>;

// Выражения в JSX
const user = {
  firstName: 'Иван',
  lastName: 'Петров'
};

const greeting = (
  <h1>
    Привет, {user.firstName + ' ' + user.lastName}!
  </h1>
);

// Условный рендеринг
const isLoggedIn = true;
const element = (
  <div>
    {isLoggedIn 
      ? <UserGreeting /> 
      : <GuestGreeting />}
  </div>
);
\`\`\`

## Простой пример приложения

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  // Хук состояния
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Вы нажали {count} раз</p>
      <button onClick={() => setCount(count + 1)}>
        Нажми меня
      </button>
    </div>
  );
}

export default Counter;
\`\`\`

## Основные концепции

### Компоненты
- **Функциональные**: Используют хуки
- **Классовые**: Устаревший подход

### Пропсы
Передача данных между компонентами:

\`\`\`jsx
function Greeting(props) {
  return <h1>Привет, {props.name}!</h1>;
}

// Использование
function App() {
  return <Greeting name="Алиса" />;
}
\`\`\`

## Структура проекта

\`\`\`
my-react-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js
│   ├── index.js
│   └── components/
│       ├── Header.js
│       └── Footer.js
├── package.json
└── README.md
\`\`\`

## Инструменты разработчика

1. **React DevTools** (расширение для браузеров)
2. **Visual Studio Code**
3. **ESLint**
4. **Prettier**

## Практические советы

- Изучайте документацию React
- Практикуйтесь через создание проектов
- Осваивайте один концепт за раз
- Используйте TypeScript для больших проектов
- Следите за обновлениями библиотеки

## Ресурсы для изучения

1. Официальная документация React
2. Udemy и Coursera
3. YouTube-каналы
4. Платформы: freeCodeCamp, Codecademy
5. GitHub-репозитории с открытым кодом
  `,
  order: 1,
  createdAt: new Date(),
    },
    {
    id: '11',
    courseId: '4',
    title: 'Компоненты и состояние в React',
    content: `
    ## Компоненты в React

    Компоненты — основные строительные блоки в React. Они позволяют разбивать интерфейс на независимые, повторно используемые части.

    ### Типы компонентов

    #### Функциональные компоненты

    \`\`\`jsx
    // Простой функциональный компонент
    function Greeting(props) {
    return <h1>Привет, {props.name}!</h1>;
    }

    // Стрелочная функция
    const Greeting = (props) => {
    return <h1>Привет, {props.name}!</h1>;
    };
    \`\`\`

    #### Составные компоненты

    \`\`\`jsx
    function UserProfile() {
    return (
        <div className="user-profile">
        <Avatar />
        <UserInfo name="Алиса Иванова" />
        <UserStats />
        </div>
    );
    }

    function Avatar() {
    return <img src="/avatar.jpg" alt="Аватар пользователя" />;
    }

    function UserInfo({ name }) {
    return <h2>{name}</h2>;
    }

    function UserStats() {
    return (
        <div>
        <p>Подписчики: 1000</p>
        <p>Подписки: 500</p>
        </div>
    );
    }
    \`\`\`

    ## Работа с состоянием

    ### Хук useState

    \`\`\`jsx
    import React, { useState } from 'react';

    function Counter() {
    // Объявление состояния
    const [count, setCount] = useState(0);

    // Функция для обновления состояния
    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
        <p>Количество нажатий: {count}</p>
        <button onClick={increment}>
            Увеличить
        </button>
        </div>
    );
    }
    \`\`\`

    ### Сложные состояния

    \`\`\`jsx
    function Form() {
    // Состояние для формы
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        age: ''
    });

    // Обновление состояния
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    return (
        <form>
        <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Имя пользователя"
        />
        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
        />
        </form>
    );
    }
    \`\`\`

    ## Prop Types и валидация пропсов

    \`\`\`jsx
    import PropTypes from 'prop-types';

    function UserCard({ name, age, isAdmin }) {
    return (
        <div>
        <h2>{name}</h2>
        <p>Возраст: {age}</p>
        {isAdmin && <span>Администратор</span>}
        </div>
    );
    }

    // Валидация пропсов
    UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    isAdmin: PropTypes.bool
    };

    // Значения по умолчанию
    UserCard.defaultProps = {
    age: 0,
    isAdmin: false
    };
    \`\`\`

    ## Условный рендеринг

    \`\`\`jsx
    function Notification({ message, type }) {
    // Условный рендеринг
    if (!message) return null;

    return (
        <div className={\`notification \${type}\`}>
        {type === 'success' && '✅ '}
        {type === 'error' && '❌ '}
        {message}
        </div>
    );
    }

    function App() {
    return (
        <div>
        <Notification 
            message="Успешная операция" 
            type="success" 
        />
        <Notification 
            message="Произошла ошибка" 
            type="error" 
        />
        </div>
    );
    }
    \`\`\`

    ## Списки и ключи

    \`\`\`jsx
    function UserList({ users }) {
    return (
        <ul>
        {users.map((user) => (
            <li key={user.id}>
            {user.name} - {user.email}
            </li>
        ))}
        </ul>
    );
    }

    function App() {
    const userList = [
        { id: 1, name: 'Алиса', email: 'alice@example.com' },
        { id: 2, name: 'Боб', email: 'bob@example.com' }
    ];

    return <UserList users={userList} />;
    }
    \`\`\`

    ## Передача функций как пропсов

    \`\`\`jsx
    function Button({ onClick, children }) {
    return (
        <button onClick={onClick}>
        {children}
        </button>
    );
    }

    function ParentComponent() {
    const handleClick = () => {
        alert('Кнопка нажата!');
    };

    return (
        <div>
        <Button onClick={handleClick}>
            Нажми меня
        </Button>
        </div>
    );
    }
    \`\`\`

    ## Практические советы

    1. **Разделяй компоненты**: Каждый компонент должен отвечать за одну задачу
    2. **Используй props**: Передавай данные через пропсы
    3. **Иммутабельность состояния**: Не изменяй состояние напрямую
    4. **Производи вычисления заранее**: Кэшируй сложные вычисления
    5. **Избегай глубокой вложенности**: Декомпозируй сложные компоненты

    ## Распространенные ошибки

    - Изменение состояния напрямую
    - Забывание ключей при рендеринге списков
    - Большие компоненты с множеством ответственностей
    - Излишнее дублирование кода

    ## Ресурсы для изучения

    1. Официальная документация React
    2. React-сообщества на GitHub
    3. Курсы на Udemy и Coursera
    4. YouTube-каналы по React
    5. Открытые проекты на GitHub
    `
    },
    {
    id: '12',
    courseId: '4',
    title: 'Хуки и продвинутые концепции React',
    content: `
  ## Введение в хуки
  
  Хуки — функции, которые позволяют использовать состояние и другие возможности React в функциональных компонентах.
  
  ### Основные хуки
  
  #### useState
  Управление локальным состоянием компонента:
  
  \`\`\`jsx
  import React, { useState } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>Счетчик: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Увеличить
        </button>
      </div>
    );
  }
  \`\`\`
  
  #### useEffect
  Работа с побочными эффектами:
  
  \`\`\`jsx
  import React, { useState, useEffect } from 'react';
  
  function DataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Загрузка данных при монтировании компонента
      async function fetchData() {
        try {
          const response = await fetch('https://api.example.com/data');
          const result = await response.json();
          setData(result);
          setLoading(false);
        } catch (error) {
          console.error('Ошибка загрузки:', error);
          setLoading(false);
        }
      }
  
      fetchData();
  
      // Очистка эффекта (необязательно)
      return () => {
        // Отмена запроса или очистка подписок
      };
    }, []); // Пустой массив зависимостей
  
    if (loading) return <div>Загрузка...</div>;
  
    return (
      <div>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    );
  }
  \`\`\`
  
  #### useContext
  Управление глобальным состоянием:
  
  \`\`\`jsx
  import React, { createContext, useContext, useState } from 'react';
  
  // Создание контекста
  const ThemeContext = createContext();
  
  // Провайдер контекста
  function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    return (
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }
  
  // Компонент, использующий контекст
  function ThemedButton() {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
    return (
      <button 
        onClick={toggleTheme}
        style={{
          background: isDarkMode ? '#333' : '#fff',
          color: isDarkMode ? '#fff' : '#333'
        }}
      >
        Переключить тему
      </button>
    );
  }
  
  // Использование
  function App() {
    return (
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    );
  }
  \`\`\`
  
  ### Дополнительные хуки
  
  #### useReducer
  Сложное управление состоянием:
  
  \`\`\`jsx
  import React, { useReducer } from 'react';
  
  // Редьюсер для управления счетчиком
  function counterReducer(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      case 'RESET':
        return { count: 0 };
      default:
        return state;
    }
  }
  
  function Counter() {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
    return (
      <div>
        <p>Счетчик: {state.count}</p>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>
          Увеличить
        </button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>
          Уменьшить
        </button>
        <button onClick={() => dispatch({ type: 'RESET' })}>
          Сбросить
        </button>
      </div>
    );
  }
  \`\`\`
  
  #### useMemo и useCallback
  Оптимизация производительности:
  
  \`\`\`jsx
  import React, { useState, useMemo, useCallback } from 'react';
  
  function ExpensiveComponent({ data }) {
    // Мемоизация вычислений
    const processedData = useMemo(() => {
      console.log('Вычисление processedData');
      return data.map(item => item * 2);
    }, [data]);
  
    return (
      <div>
        {processedData.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  }
  
  function ParentComponent() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([1, 2, 3, 4, 5]);
  
    // Мемоизация функции
    const handleClick = useCallback(() => {
      setCount(c => c + 1);
    }, []);
  
    return (
      <div>
        <p>Счетчик: {count}</p>
        <button onClick={handleClick}>Увеличить</button>
        <ExpensiveComponent data={data} />
      </div>
    );
  }
  \`\`\`
  
  ## Кастомные хуки
  
  Создание собственных хуков для повторного использования логики:
  
  \`\`\`jsx
  import { useState, useEffect } from 'react';
  
  // Кастомный хук для работы с localStorage
  function useLocalStorage(key, initialValue) {
    // Получение значения из localStorage
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });
  
    // Обновление localStorage
    const setValue = (value) => {
      try {
        const valueToStore = 
          value instanceof Function ? value(storedValue) : value;
        
        setStoredValue(valueToStore);
        
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    };
  
    return [storedValue, setValue];
  }
  
  // Использование кастомного хука
  function App() {
    const [name, setName] = useLocalStorage('name', '');
  
    return (
      <div>
        <input
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    );
  }
  \`\`\`
  
  ## Продвинутые техники
  
  ### Render Props
  
  \`\`\`jsx
  function MouseTracker({ render }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        setPosition({ x: event.clientX, y: event.clientY });
      };
  
      window.addEventListener('mousemove', handleMouseMove);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
  
    return render(position);
  }
  
  function App() {
    return (
      <MouseTracker 
        render={({ x, y }) => (
          <div>
            Позиция мыши: ({x}, {y})
          </div>
        )}
      />
    );
  }
  \`\`\`
  
  ## Практические советы
  
  1. **Используйте ESLint**: Настройте линтер для хуков
  2. **Следите за зависимостями**: Корректно указывайте массив зависимостей
  3. **Разделяйте логику**: Создавайте кастомные хуки
  4. **Избегайте излишних перерендеров**: Используйте мемоизацию
  5. **Изучайте официальную документацию**
  
  ## Распространенные ошибки
  
  - Неправильное использование зависимостей в useEffect
  - Создание бесконечных циклов рендера
  - Забывание про очистку эффектов
  - Неоптимальное использование мемоизации
  
  ## Ресурсы для изучения
  
  1. Официальная документация React
  2. Блоги разработчиков
  3. Открытые исходные коды
  4. Курсы на платформах обучения
  5. Профессиональные форумы разработчиков
  
  ## Заключение
  
  Хуки — мощный инструмент для создания функциональных компонентов в React. Их правильное использование позволяет писать более чистый, читаемый и эффективный код.
    `,
    order: 3,
    createdAt: new Date(),
    },
]