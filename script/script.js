'use strict';


//Урок 11:
const start = document.getElementById(`start`), //Кнопка "Рассчитать"
  addButtonFirst = document.getElementsByTagName('button')[0], //Добавочная кнопка 1
  addButtonSecond = document.getElementsByTagName(`button`)[1], //Добавочная кнопка 2
  checkBox = document.querySelector(`#deposit-check`), //Чекбокс
  additionalIncomeItem = document.querySelectorAll(`.additional_income-item`), //Поля ввода возможных доходов
  dayBudget = document.getElementsByClassName(`budget_day-value`), //Вывод дохода за день
  costsMonth = document.querySelector(`.expenses_month-value`), //Вывод расходов за месяц
  additionalIncomeValue = document.querySelector(`.additional_income-value`), //Возможные доходы
  additionalExpensesValue = document.querySelector(`.additional_expenses-value`), //Возможные расходы
  incomePeriodValue = document.querySelector(`.income_period-value`), //Накопления за период
  targetMonthValue = document.querySelector(`.target_month-value`), //Срок достижения цели
  salaryAmount = document.querySelector(`.salary-amount`), //Вывод месячный доход
  budgetMonthValue = document.querySelector(`.budget_month-value`),
  budgetDayValue = document.querySelector(`.budget_day-value`),
  additionalIncome = document.querySelector(`.additional_income`),
  additionalExpensesItem = document.querySelector(`.additional_expenses-item`),//Возможные расходы
  depositAmount = document.querySelector(`.deposit-amount`), //Сумма депозита
  depositPercent = document.querySelector('.deposit-percent'), //Процент депозита
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'); // Range
let expensesItems = document.querySelectorAll(`.expenses-items`),
  incomeItems = document.querySelectorAll(`.income-items`);

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const doString = function (str, comma = false) {
  const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
  return pattern.test(str);
}; //Валидация строки




const appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  budget: 0,
  targetMonth: 0,
  expensesMonth: 0,
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();

  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    costsMonth.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(`, `);
    additionalIncomeValue.value = appData.addIncome.join(`, `);
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener(`input`, function () {
      incomePeriodValue.value = appData.calcSavedMoney();
    });
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addButtonSecond);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      addButtonSecond.style.display = `none`;
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(`.expenses-title`).value;
      let cashExpenses = item.querySelector(`.expenses-amount`).value;
      if (itemExpenses !== `` && cashExpenses !== ``) {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(`,`);
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== ``) {
        appData.addExpenses.push(item);
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addButtonFirst);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      addButtonFirst.style.display = `none`;
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(`.income-title`).value;
      let cashIncome = item.querySelector(`.income-amount`).value;
      if (itemIncome !== `` && cashIncome !== ``) {
        appData.income[itemIncome] = +cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== ``) {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    return appData.budgetMonth * periodSelect.value;
  },
  changePeriod: function (event) {
    document.querySelector(`.period-amount`).textContent = event.target.value;
    incomePeriodValue.value = appData.calcSavedMoney();
  },
};
document.querySelector(`.calc`).addEventListener(`mouseover`, function () {
  if (salaryAmount.value === '') {
    start.setAttribute(`disabled`, ``);
    start.style.backgroundColor = `#c5c8cd`;
  } else {
    start.removeAttribute(`disabled`);
    start.style.backgroundColor = `#353a43`;
  }
});

start.addEventListener(`click`, appData.start);
addButtonSecond.addEventListener(`click`, appData.addExpensesBlock);
addButtonFirst.addEventListener(`click`, appData.addIncomeBlock);
periodSelect.addEventListener(`input`, appData.changePeriod);
