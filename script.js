'use strict';

// alert('Hello World!');

// console.log('Hello Friend!');

// const money = 50000,
//   income = 'freelance',
//   addExpenses = `Internet, Taxi, Communal`,
//   deposit = true,
//   mission = 1000000,
//   period = 6,
//   budgetDay = (money / 30);

// console.log(typeof money);
// console.log(typeof income);
// console.log('Длина строки:' + ' ' + addExpenses.length);
// console.log(addExpenses.toLowerCase());
// console.log(addExpenses.split(', '));
// console.log(typeof deposit);
// console.log('Цель заработать' + ' ' + mission + ' ' + 'рублей');
// console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
// console.log('Дневной бюджет составляет:' + ' ' + budgetDay);

let mission = prompt(`Ваша цель в рублях: `),
  money = prompt(`Ваш месячный доход?`),
  addExpenses = prompt(`Перечислите возможные расходы за рассчитываемый период через запятую`),
  deposit = confirm(`Есть ли у вас депозит в банке?`),
  expenses1 = prompt(`Введите обязательную статью расходов?`),
  expenses2 = prompt(`Введите обязательную статью расходов?`),
  amount1 = prompt(`Во сколько это обойдется?`),
  amount2 = prompt(`Во сколько это обойдется?`),
  budgetMonth = (money - amount1),
  missionComplete = (mission / budgetMonth),
  budgetDay = (budgetMonth / 30);

console.log(`Месячный доход составляет: ` + money + ` рублей`);
console.log(`Ваши расходы: ` + addExpenses);
console.log(`Депозит в банке: ` + deposit);
console.log(`Ваш месячный бюджет составляет: ` + budgetMonth + ` рублей`);
console.log(`Ваша цель будет достигнута за ` + Math.ceil(missionComplete) + ` месяцев`);
console.log(`Ваш бюджет на день составляет: ` + Math.ceil(budgetDay) + ` рублей`);

if (budgetDay === 1200) {
  console.log(`У вас практически высокий уровень дохода`);
} else if (budgetDay === 600) {
  console.log(`У вас практически средний уровень дохода`);
} else if (budgetDay > 1200) {
  console.log(`У вас высокий уровень дохода`);
} else if (budgetDay < 1200 && budgetDay > 600) {
  console.log(`У вас средний уровень дохода`);
} else if (budgetDay < 600 && budgetDay > 0) {
  console.log(`К сожалению, у вас уровень дохода ниже среднего`);
} else if (budgetDay < 0) {
  console.log(`Что-то пошло не так`);
} else {
  console.log(`К сожалению, у вас уровень дохода ниже среднего`);
}

