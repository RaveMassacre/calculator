'use strict';
const money,
  income,
  addExpenses,
  deposit,
  mission,
  period;


alert('Hello World!');

console.log('Hello Friend!');

const money = 50000,
  income = 'freelance',
  addExpenses = `Internet, Taxi, Communal`,
  deposit = true,
  mission = 1000000,
  period = 6,
  budgetDay = (money / 30);

console.log(typeof money);
console.log(typeof income);
console.log('Длина строки:' + ' ' + addExpenses.length);
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log(typeof deposit);
console.log('Цель заработать' + ' ' + mission + ' ' + 'рублей');
console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('Дневной бюджет составляет:' + ' ' + budgetDay);

