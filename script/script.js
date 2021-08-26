'use strict';


//Урок 13:
const start = document.getElementById(`start`), //Кнопка "Рассчитать"
  addButtonFirst = document.getElementsByTagName(`button`)[0], //Добавочная кнопка 1
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
  periodSelect = document.querySelector('.period-select'), // Range
  cancel = document.getElementById(`cancel`),
  data = document.querySelector('.data'),
  periodAmount = document.querySelector(`.period-amount`);
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
    this.budget = +salaryAmount.value;
    this.blockInput();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    costsMonth.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(`, `);
    additionalIncomeValue.value = this.addIncome.join(`, `);
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener(`input`, function () {
      incomePeriodValue.value = this.calcSavedMoney();
    }.bind(appData));
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    const clone = expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addButtonSecond);
    expensesItems = document.querySelectorAll(`.expenses-items`);
    for (let i = 0; i <= expensesItems.length; i++) {
      clone.querySelector(`.expenses-title`).value = ``;
      clone.querySelector(`.expenses-amount`).value = ``;
    }
    if (expensesItems.length === 3) {
      addButtonSecond.style.display = `none`;
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(`.expenses-title`).value;
      let cashExpenses = item.querySelector(`.expenses-amount`).value;
      if (itemExpenses !== `` && cashExpenses !== ``) {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    }.bind(appData));
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(`,`);
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== ``) {
        this.addExpenses.push(item);
      }
    }.bind(appData));
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    const clone = incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addButtonFirst);
    incomeItems = document.querySelectorAll(`.income-items`);
    for (let i = 0; i <= incomeItems.length; i++) {
      clone.querySelector(`.income-title`).value = ``;
      clone.querySelector(`.income-amount`).value = ``;
    }
    if (incomeItems.length === 3) {
      addButtonFirst.style.display = `none`;
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(`.income-title`).value;
      let cashIncome = item.querySelector(`.income-amount`).value;
      if (itemIncome !== `` && cashIncome !== ``) {
        this.income[itemIncome] = +cashIncome;
      }
    }.bind(appData));
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== ``) {
        this.addIncome.push(itemValue);
      }
    }.bind(appData));
  },
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    if (this.budgetDay === 1200) {
      return `У вас практически высокий уровень дохода`;
    } else if (this.budgetDay === 600) {
      return `У вас практически средний уровень дохода`;
    } else if (this.budgetDay > 1200) {
      return `У вас высокий уровень дохода`;
    } else if (this.budgetDay < 1200 && this.budgetDay > 600) {
      return `У вас средний уровень дохода`;
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
      return `К сожалению, у вас уровень дохода ниже среднего`;
    } else if (this.budgetDay < 0) {
      return `Что-то пошло не так`;
    } else {
      return `К сожалению, у вас уровень дохода ниже среднего`;
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      let percentDeposit,
        moneyDeposit;
      do {
        percentDeposit = +prompt(`Какой годовой процент?`, 10);
      } while (!isNumber(percentDeposit));
      this.percentDeposit = +percentDeposit;
      do {
        moneyDeposit = +prompt(`Какая сумма заложена?`, 1000);
      } while (!isNumber(moneyDeposit));
      this.moneyDeposit = +moneyDeposit;
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },
  inputToggle: function () {
    const inputArray = data.querySelectorAll(`input[type=text]`);
    for (let item of inputArray) {
      item.toggleAttribute(`disabled`);
    }
  },
  blockInput: function () {
    this.inputToggle();
    start.style.display = `none`;
    cancel.style.display = `block`;
  },
  reset: function () {
    this.inputToggle();
    const inputReset = data.querySelectorAll('input[type=text]');
    for (let item of inputReset) {
      item.value = '';
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].remove();
      addButtonFirst.style.display = `block`;
    }
    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].remove();
      addButtonFirst.style.display = `block`;
    }
    start.removeAttribute(`style`);
    cancel.removeAttribute(`style`);
    periodAmount.textContent = periodSelect.value = 1;
    this.money = +salaryAmount.value;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
  },
  // changePeriod: function (event) {
  //   document.querySelector(`.period-amount`).textContent = event.target.value;
  //   incomePeriodValue.value = this.calcSavedMoney();
  // },
  bannedStart: function () {
    start.disabled = !salaryAmount.value.trim();
  }
};

appData.bannedStart();
start.addEventListener(`click`, function () {
  this.start();
}.bind(appData));
cancel.addEventListener('click', function () {
  this.reset();
}.bind(appData));
addButtonSecond.addEventListener(`click`, function () {
  this.addExpensesBlock();
}.bind(appData));
addButtonFirst.addEventListener(`click`, function () {
  this.addIncomeBlock();
}.bind(appData));
periodSelect.addEventListener(`input`, function (event) {
  document.querySelector(`.period-amount`).textContent = event.target.value;
  incomePeriodValue.value = this.calcSavedMoney();
});
salaryAmount.addEventListener(`input`, appData.bannedStart);