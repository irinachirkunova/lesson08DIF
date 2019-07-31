let buttonStart = document.getElementById('start'),
    buttonCancel = document.getElementById('cancel'),

    buttonWithTag = document.getElementsByTagName('button'),
    incomePlus = buttonWithTag[0],
    expensesPlus = buttonWithTag[1],

    checkBox = document.querySelector('#deposit-check'),

    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    inputAddIncomeOne = additionalIncomeItem[0],
    inputAddIncomeTwo = additionalIncomeItem[1],

    inputsByClass = document.getElementsByClassName('result-total'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue =document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    targetAmountValue = document.getElementsByClassName('target-amount')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],


    all = document.querySelectorAll('input'),

    salaryAmount = document.querySelector('.salary-amount'),
    incomeAmount = document.querySelector('input.income-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('input.expenses-amount'),


    expensesItems = document.querySelectorAll('.expenses-items'),
    periodSelect = document.querySelector('.period-select'),
    additionaExpensesItem = document.querySelector('.additional_expenses-item'),
    incomeItem = document.querySelectorAll('.income-items'),
    titleAmount = document.querySelector('.period-amount');


    let incomeAmountAll = document.querySelectorAll('input.income-amount');
    console.log(incomeAmountAll);
    let incomeTitleAll = document.querySelectorAll('input.income-title');
    console.log(incomeTitleAll);

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0, 
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {

        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
      
        appData.getTargetMonth();
        appData.calcPeriod();

        appData.getBudget();
        appData.showResult();

        buttonStart.style.display = 'none';
        buttonCancel.style.display = 'block';
        appData.disabledInput();
    },
   
    getBudget: function() {
        appData.budgetMonth = appData.budget +appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);  
    }, 
    getTargetMonth: function() {
        return Math.ceil(targetAmountValue.value / appData.budgetMonth);
       
    }, 
    getExpensesMonth: function() {   
        for(let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key]; 
        }                         
    }, 
    getStatusIncome: function() {
        let response;
        if(appData.budgetDay > 800) {
            return response = ("Высокий уровень доход");
            }
            else if(appData.budgetDay > 300 && appData.budgetDay <= 800) {
            return response = ("Средний уровень дохода");
            }
            else if(appData.budgetDay >= 0 && appData.budgetDay <= 300){
            return response = ("Низкий уровень дохода");
            }
            else {
            return response = ("Что то пошло не так");
            }    
    },  
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();


    },
    addExpensesBlock: function(){   
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        if(expensesTitle.value && expensesAmount.value) {
            cloneExpensesItem.children[0].value = '';
            cloneExpensesItem.children[1].value = '';
            cloneExpensesItem.children[0].placeholder = '';
            cloneExpensesItem.children[1].placeholder = '';
        }
       else {
        cloneExpensesItem.children[0].placeholder = '';
        cloneExpensesItem.children[1].placeholder = '';
       }
    
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        

        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('input.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        }); 
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItem[0].cloneNode(true); 
        if(incomeTitle.value && incomeAmount.value) {
            cloneIncomeItem.children[0].value = '';
            cloneIncomeItem.children[1].value = '';
            cloneIncomeItem.children[0].placeholder = '';
            cloneIncomeItem.children[1].placeholder = '';
        }
       else {
            cloneIncomeItem.children[0].placeholder = '';
            cloneIncomeItem.children[1].placeholder = '';
       }
        

        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    
    },
    getIncome: function() {
        incomeItem.forEach(function(item){
            let itemIncome =item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && incomeAmount !== '') {
                appData.income[itemIncome] = incomeAmount;
            }
        });

        for(let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }

    },
    getAddExpenses: function() {
        let addExpenses = additionaExpensesItem.value.split(', ');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item !== '') {
                 appData.addExpenses.push(item);
            }
        });

    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            do{
                appData.percentDeposit = prompt('Kакой годовой процент?', '10');
            }
            while(!isNaN(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);
           
            do{
                appData.moneyDeposit = prompt('Kакая сумма заложена?', 10000);
            } 
            while(isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);
            
        }
    },
    calcPeriod: function(){

        return appData.budgetMonth * periodSelect.value;
       
    },
    changePeriod: function(){
        titleAmount.textContent = periodSelect.value;  

        let res = appData.budgetMonth * periodSelect.value;
        incomePeriodValue.value = res;
    },
    disabledInput: function() {

        for (var i = 0; i < 20; i++) {
          all[i].disabled = true;
        }

        for(let i = 0; i < incomeItem.length; i++) {

            for(let j = 0; j < incomeItem[i].children.length; j++) {
           
                incomeItem[i].children[j].setAttribute('disabled', 'disabled');
            }  

        }

        for(let i = 0; i < expensesItems.length; i++) {
            
            for(let j = 0; j < expensesItems[i].children.length; j++) {
           
                expensesItems[i].children[j].setAttribute('disabled', 'disabled');
            }  

        } 
       
    },
    insertrestOnlyNumber: function(){
    this.value = this.value.replace(/[^\d.]/g, '');
    },
    insertOnlyRussianLetter: function(){
        this.value = this.value.replace(/[^а-я]/,'');
    },
    reset: function(){
        location.reload();
    },
};

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

buttonStart.setAttribute('disabled', 'disabled');
buttonStart.style.background = '#cccccc';
salaryAmount.addEventListener('input', function() {
    buttonStart.removeAttribute('disabled');
    buttonStart.style.background = '#353a43';
    buttonStart.addEventListener('click', appData.start);   
});



periodSelect.addEventListener('click', appData.changePeriod);

incomeAmount.addEventListener('input', appData.insertrestOnlyNumber);
incomeTitle.addEventListener('input', appData.insertOnlyRussianLetter);

expensesAmount.addEventListener('input', appData.insertrestOnlyNumber);
expensesTitle.addEventListener('input', appData.insertOnlyRussianLetter);

for(let i = 0; i < additionalIncomeItem.length; i++) {
    additionalIncomeItem[i].addEventListener('input', appData.insertOnlyRussianLetter);
}

buttonCancel.addEventListener('click', appData.reset);



