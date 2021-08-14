'use strict';
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const doString = function (str, comma = false) {
  const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
  return pattern.test(str);
}; //Валидация строки

let money;
const start = function () {
  do {
    money = prompt(`Ваш месячный доход?`, 60000);
  } while (!isNumber(money));

};
start();

const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  budget: +money,
  targetMonth: 0,
  expensesMonth: 0,
  period: 7,
  mission: +prompt(`Какова ваша финансовая цель?`),
  asking: function () {

    if (confirm(`Имеется ли у вас дополнительный источник дохода?`)) {
      let itemIncome = ` `;
      do {
        itemIncome = prompt(`Какой у вас дополнительный заработок?`, `Таксую`);
      } while (isNumber(itemIncome));
      let cashIncome = 0;
      do {
        cashIncome = +prompt(`Сколько зарабатываете на этом в месяц?`, 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }
    const addExpenses = prompt(`Перечислите возможные расходы за рассчитываемый период через запятую`);
    appData.addExpenses = addExpenses.split(', ');
    appData.deposit = confirm(`Есть ли у вас депозит в банке?`);
    let amount, expense;
    for (let i = 0; i < 2; i++) {
      do {
        expense = prompt(`Введите обязательную статью расходов?`, `Еда, интернет`);
      } while (isNumber(expense));
      do {
        amount = prompt(`Во сколько это обойдется?`, 4000);
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
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      let percentDeposit,
        moneyDeposit;
      do {
        percentDeposit = +prompt(`Какой годовой процент?`, 10);
      } while (!isNumber(percentDeposit));
      appData.percentDeposit = +percentDeposit;
      do {
        moneyDeposit = +prompt(`Какая сумма заложена?`, 1000);
      } while (!isNumber(moneyDeposit));
      appData.moneyDeposit = +moneyDeposit;
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();
appData.calcSavedMoney();

console.log(`Расходы за месяц: ` + appData.expensesMonth);
console.log(appData.getStatusIncome());
console.log(appData.addExpenses.map((val, i) => val[0].toUpperCase() + val.slice(1)).join(', '));

for (let key in appData) {
  console.log(`Наша программа включает в себя данные: ` + key + ` - ` + appData[key]);
}