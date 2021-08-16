'use strict';


//Урок 09:
const calcButton = document.getElementById(`start`); //Кнопка "Рассчитать"
console.log(`Кнопка расчета: `, calcButton);

const addButtonFirst = document.getElementsByTagName('button')[0]; //Добавочная кнопка 1
console.log(`Кнопка расчета: `, addButtonFirst);

const addButtonSecond = document.getElementsByTagName(`button`)[1]; //Добавочная кнопка 2
console.log(`Кнопка расчета #2: `, addButtonSecond);

const checkBox = document.querySelector(`#deposit-check`); //Чекбокс
console.log(`Чекбокс: `, checkBox);

const inputFields = document.querySelectorAll(`.additional_income-item`); //Поля ввода возможных доходов
console.log(`Поля ввода возможных доходов: `, inputFields);

const dayBudget = document.getElementsByClassName(`budget_day-value`); //Вывод дохода за день
console.log(`Вывод дохода за день: `, dayBudget);

const costsMonth = document.getElementsByClassName(`expenses_month-value`); //Вывод расходов за месяц
console.log(`Вывод расходов за месяц: `, costsMonth);

const possibleIncome = document.getElementsByClassName(`additional_income-value`); //Возможные доходы
console.log(`Возможные доходы: `, possibleIncome);

const possibleCosts = document.getElementsByClassName(`additional_expenses-value`); //Возможные расходы
console.log(`Возможные расходы: `, possibleCosts);

const accumulation = document.getElementsByClassName(`income_period - value`); //Накопления за период
console.log(`Накопления за период `, accumulation);

const successDate = document.getElementsByClassName(`target_month-value`); //Срок достижения цели
console.log(`Срок достижения цели: `, successDate);

const salaryAmount = document.querySelector(`.salary-amount`); //Вывод месячный доход
console.log(`Ввод месячного дохода: `, salaryAmount);

const incomeItems = document.querySelector(`.income-items`);//Дополнительный доход
console.log(`Наименование доп. дохода: `, incomeItems.children[0]);
console.log(`Сумма доп. дохода: `, incomeItems.children[1]);

const additionalExpensesItem = document.querySelector(`.additional_expenses-item`);//Возможные расходы
console.log(`Возможные расходы: `, additionalExpensesItem);

const depositAmount = document.querySelector(`.deposit-amount`); //Сумма депозита
console.log(`Сумма депозита: `, depositAmount);

const depositPercent = document.querySelector('.deposit-percent'); //Процент депозита
console.log('depositPercent: ', depositPercent);

const targetAmount = document.querySelector('.target-amount');
console.log('targetAmount: ', targetAmount);

const periodSelect = document.querySelector('.period-select'); // Range
console.log('periodSelect: ', periodSelect);


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