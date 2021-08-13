'use strict';
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = prompt(`Ваш месячный доход?`);
    } while (!isNumber(money));

  };
start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  budgetDay: 0,
  budgetMonth: 0,
  budget: +money,
  targetMonth: 0,
  expensesMonth: 0,
  period: 7,
  mission: +prompt(`Какова ваша финансовая цель?`),
  asking: function () {
    const addExpenses = prompt(`Перечислите возможные расходы за рассчитываемый период через запятую`);
    appData.addExpenses = addExpenses.split(', ');
    appData.deposit = confirm(`Есть ли у вас депозит в банке?`);
    let amount, expense;
    for (let i = 0; i < 2; i++) {
      expense = prompt(`Введите обязательную статью расходов?`);
      do {
        amount = prompt(`Во сколько это обойдется?`);
      } while (!isNumber(amount));
      appData.expenses[expense] = +(amount);
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    appData.targetMonth = Math.ceil(appData.mission / appData.budgetMonth);
    if (appData.targetMonth < 0) {
      console.log(`К сожалению, цель не будет достигнута`);
    } else {
      console.log(`Цель будет достигнута за: ` + appData.targetMonth + ` месяцев`);
    }
  },
  getStatusIncome: function () {
    if (appData.budgetDay === 1200) {
      return `У вас практически высокий уровень дохода`;
    } else if (appData.budgetDay === 600) {
      return `У вас практически средний уровень дохода`;
    } else if (appData.budgetDay > 1200) {
      return `У вас высокий уровень дохода`;
    } else if (appData.budgetDay < 1200 && appData.budgetDay > 600) {
      return `У вас средний уровень дохода`;
    } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
      return `К сожалению, у вас уровень дохода ниже среднего`;
    } else if (appData.budgetDay < 0) {
      return `Что-то пошло не так`;
    } else {
      return `К сожалению, у вас уровень дохода ниже среднего`;
    }
  }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log(`Расходы за месяц: ` + appData.expensesMonth);
console.log(appData.getStatusIncome());

console.log(`Наша программа включает в себя данные: `);
for (let key in appData) {
  console.log(key, appData[key]);
}