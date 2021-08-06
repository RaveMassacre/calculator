'use strict';
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


const income = 'freelance';
let money,
  mission = +prompt(`Ваша цель в рублях: `),
  addExpenses = prompt(`Перечислите возможные расходы за рассчитываемый период через запятую`),
  deposit = confirm(`Есть ли у вас депозит в банке?`);

//Задание №5:
//Переписать функцию start циклом do while:
let start = function () {
  money = prompt(`Ваш месячный доход?`);
  do {
    money = prompt(`Ваш месячный доход?`);
  } while (!isNumber(money));

};
start();

//Добавить проверку что введённые данные являются числом
//Которые мы получаем на вопрос 'Во сколько это обойдется?’ в функцииgetExpensesMonth:

let expenses = [];
const getExpensesMonth = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      expenses[i] = prompt(`Введите обязательную статью расходов?`);
    }
    sum += prompt(`Во сколько это обойдется?`);
    do {
      sum += prompt(`Во сколько это обойдется?`);
    }
    while (!isNumber(sum));

  }
  return sum;
};

let expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function () {
  return money - expensesAmount;
};

const accumulatedMonth = getAccumulatedMonth();

//Если getTargetMonth возвращает нам отрицательное значение,
//то вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута:
const getTargetMonth = function () {
  let result = Math.ceil(mission / accumulatedMonth);
  if (result > 0) {
    console.log(`Цель будет достигнута за` + result + `месяцев`);
  } else {
    console.log(`К сожалению, цель не будет достигнута`);
  }
};

const budgetDay = accumulatedMonth / 30;

const showTypeOf = function (data) {
  console.log(data, typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);




const getStatusIncome = function () {
  if (budgetDay === 1200) {
    return `У вас практически высокий уровень дохода`;
  } else if (budgetDay === 600) {
    return `У вас практически средний уровень дохода`;
  } else if (budgetDay > 1200) {
    return `У вас высокий уровень дохода`;
  } else if (budgetDay < 1200 && budgetDay > 600) {
    return `У вас средний уровень дохода`;
  } else if (budgetDay < 600 && budgetDay > 0) {
    return `К сожалению, у вас уровень дохода ниже среднего`;
  } else if (budgetDay < 0) {
    return `Что-то пошло не так`;
  } else {
    return `К сожалению, у вас уровень дохода ниже среднего`;
  }
};

console.log(`Расходы за месяц: `, expensesAmount);
console.log(`Возможные расходы: `, addExpenses.toLocaleLowerCase().split(', '));
console.log(`Срок достижения цели: `, getTargetMonth());
console.log(`Бюджет на день: `, budgetDay);
console.log(`Вызов функции getStatusIncome: `, getStatusIncome());