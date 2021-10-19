"use strict";

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const inputRangeValue = document.querySelector('.rollback .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

const totalInputCollection = document.getElementsByClassName('total-input');
const total = totalInputCollection[0];
const totalCount = totalInputCollection[1];
const totalCountOther = totalInputCollection[2];
const fullTotalCount = totalInputCollection[3];
const totalCountRollback = totalInputCollection[4];

let screens = document.querySelectorAll('.screen');

const appData = {

    title: '',
    screens: [],
    screenPrice: 0,
    screensNumber: 0,
    adaptive: true ,
    rollback: 25,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicesPercent: {},
    servicesNumber: {},
    isError: false,

    init: function() {

        this.addTitle();

        inputRange.addEventListener('input', this.addRollback);
        startBtn.addEventListener('click', this.start.bind(this));
        buttonPlus.addEventListener('click', this.addScreenBlock);
        resetBtn.addEventListener('click', this.reset.bind(this));
    
    },

    addTitle: function() {

        document.title = title.textContent;

    },

    addRollback() {

        inputRangeValue.innerText = this.value;
        appData.rollback = this.value;

    },

    start: function() {

        this.isError = false;

        screens = document.querySelectorAll('.screen');

        screens.forEach(screen => {
            const selectVal = screen.querySelector('select').value;
            const inputVal = screen.querySelector('input').value;
            if ( selectVal == '' ||  inputVal == '') {
                this.isError = true;
            };
        });

        if (this.isError == false) {
            this.addScreens();
            this.addServices();
            this.addPrices();
            // this.logger();
            this.showResult();
            this.showReset();
            
        };

       
    },

    addScreens: function() {

        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push(
                { 
                 id: index,
                 name: selectName,
                 price: +select.value * +input.value,
                 count: input.value
                });
        });

    },

    addServices: function() {

        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value; 
           } 
        });

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value; 
           } 
        });

    },

    addPrices: function() {

        this.screenPrice = this.screens.reduce((sum, item) => {
            return sum += +item.price;
        }, 0 );   

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice* (this.servicesPercent[key] / 100);
        }

        this.fullPrice = +this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;
        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
        this.screensNumber = this.screens.reduce((sum, item) => {
            return sum += +item.count;
        }, 0);
        
    },

    showResult: function() {

        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        fullTotalCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.screensNumber;

    },

    showReset() {

        let disabledArray = [].concat(...document.querySelectorAll('select'), ...document.querySelectorAll('input[placeholder="Количество экранов"]'));
        disabledArray.forEach(item => {
            item.disabled = !item.disabled;
        });

        if (resetBtn.style.display =='none') {
            startBtn.style.display = 'none';
            resetBtn.style.display = 'block';
        } else {
            startBtn.style.display = 'block';
            resetBtn.style.display = 'none';

            document.querySelector('select').children[0].selected = true;
            document.querySelector('input[placeholder="Количество экранов"]').value = '';
        }
       

    },

    logger: function() {

        this.getRollbackMessage(this.fullPrice);
        console.log(`Сумма за вычетом процента: ${this.servicePercentPrice}`);
        console.log(`Стоимость вёрстки экранов - ${this.screenPrice} рублей.
             Стоимость разработки сайта - ${this.fullPrice} рублей.`);  
    },

    addScreenBlock: function() {

        screens = document.querySelectorAll('.screen');
        const cloneScreen = screens[0].cloneNode(true);
        cloneScreen.querySelector('input[type=text]').value = '';
        screens[screens.length - 1].after(cloneScreen);

    },

    reset() {

        screens = document.getElementsByClassName('screen');

        while (screens.length > 1) {
            screens[screens.length - 1].remove();
        }

        document.querySelectorAll('input[type="checkbox"]').forEach(item => {
            item.checked = false;   
        });

        document.querySelectorAll('.total-input').forEach(item => {
            item.value = '0';
        });

        inputRangeValue.innerText = '0%';
        inputRange.value = '0';

        this.showReset();
        this.clearData();
        
    },

    clearData() {
        this.rollback = 0;
        this.screenPrice = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.screensNumber = 0;
        this.screens = [];
        this.servicesPercent = {};
        this.servicesNumber = {};
    }

};


appData.init();