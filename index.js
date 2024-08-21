const display = document.getElementById('display'); // Получаем элемент дисплея и сохраняем его в переменной display.
const buttons = document.querySelectorAll('.btn');   // Получаем все кнопки с классом .btn и сохраняем их в переменной buttons.
const equalsButton = document.getElementById('equals'); // Получаем кнопку '=' и сохраняем ее впеременной equalsButton.
const clearButton = document.getElementById('clear');   // Получаем кнопку "C" и сохраняем ее в переменной clearButton.
const backspaceButton = document.getElementById('backspace');   // Получаем кнопку "←" и сохраняем ее в переменной backspaceButton.

// Инициализируем переменные для хранения первого операнда, оператора, текущего ввода и флага для сброса дисплея.
let firstOperand = null;    // Первый операнд
let operator = '';  // Оператор
let currentInput = '0'; // Текущий ввод
let shouldResetDisplay = false; // Флаг для сброса дисплея

// Функция для обновления дисплея
function updateDisplay() {
    display.value = currentInput;   // Устанавливаем значение currentInput в качестве значения дисплея.
};

// Обработчик нажатия кнопок
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');    // Получаем значение кнопки из атрибута data-value.
        if (value) {    // Если значение существует
            if (currentInput === '0' || shouldResetDisplay) {
                currentInput = value;   // Заменяем 0 на новое значение
                shouldResetDisplay= false;  // Сбрасываем флаг для сброса дисплея
            } else {
                currentInput += value;  // Добавляем значение к текущему вводу
            }
            updateDisplay();    // Обновляем дисплей
        }
    });
});

// Обработчик для кнопки "="
equalsButton.addEventListener('click', () => {
    if (firstOperand !== null && operator) {    // Если первый операнд и оператор существуют
        currentInput = operate(firstOperand, parseFloat(currentInput), operator);   // Выполняем расчет
        updateDisplay();    // Обновляем дисплей
        firstOperand = null;    // Сбрасываем первый операнд
        operator = '';  // Сбрасываем оператор
        shouldResetDisplay = true;  // Устанавливаем флаг для сброса дисплея
    }
});

// Обработчик для кнопки "C"
clearButton.addEventListener('click', () => {
    currentInput = '0'; // Сбрасываем текущий ввод
    firstOperand = null;    // Сбрасываем первый операнд
    operator = '';  // Сбрасываем оператор
    updateDisplay();    // Обновляем дисплей
});

// Обработчик для кнопки "←"
backspaceButton.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1) || '0';    // Удаляем последний символ из текущего ввода
    updateDisplay();    // Обновляем дисплей
})

// Обработчик для операторов
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput) { // Если текущий ввод существует
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);    // Сохраняем первый операнд
            } else if (operator) {
                firstOperand = operator(firstOperand, parseFloat(currentInput), operator);  // Выполняем расчет
            }
            operator = button.getAttribute('data-value');   // Сохраняем оператор
            shouldResetDisplay = true;  // Устанавливаем флаг для сброса дисплея
        }
    });
});

// Функция для выполнения арифметических операций
function operate (first, second, operator) {
    switch (operator) {
        case '+':
            return round(first + second);   // Выполняем сложение
        case '-':
            return round(first - second);   // Выполняем вычитание
        case '*':
            return round(first * second);   // Выполняем умножение
        case '/':
            if (second === 0) {
                return 'Ошибка'; // Возвращаем сообщение об ошибке при делении на 0
            }
                return round(first / second);   // Выполняем деление
                    default:
                return second;
    }
}

// Функция для округления значений
function round(num) {
    return Math.round(num * 100) / 100; // Округляем число до двух знаков после запятой
}

// Инициализация дисплея
updateDisplay(); // Обновляем дисплей при загрузке страницы