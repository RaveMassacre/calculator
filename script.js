'use strict';

const income = 'freelance';
let mission = +prompt(`Ваша цель в рублях: `),
  money = +prompt(`Ваш месячный доход?`),
  addExpenses = prompt(`Перечислите возможные расходы за рассчитываемый период через запятую`),
  deposit = confirm(`Есть ли у вас депозит в банке?`),
  expenses1 = prompt(`Введите обязательную статью расходов?`),
  expenses2 = prompt(`Введите обязательную статью расходов?`),
  amount1 = +prompt(`Во сколько это обойдется?`),
  amount2 = +prompt(`Во сколько это обойдется?`);

//Задание №4:

const getExpensesMonth = function () {
  return amount1 + amount2;
};

const getAccumulatedMonth = function () {
  return money - getExpensesMonth();
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};

const budgetDay = accumulatedMonth / 30;

const showTypeOf = function (data) {
  console.log(data, typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(`Расходы за месяц: `, getExpensesMonth());
console.log(`Возможные расходы: `, addExpenses.toLocaleLowerCase().split(', '));
console.log(`Срок достижения цели: `, getTargetMonth());
console.log(`Бюджет на день: `, budgetDay);


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

console.log(`Вызов функции getStatusIncome: `, getStatusIncome());