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

        appData.addTitle();

        inputRange.addEventListener('input', appData.addRollback);
        startBtn.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);

    },

    addTitle : function() {

        document.title = title.textContent;

    },

    addRollback() {

        inputRangeValue.innerText = this.value;
        appData.rollback = this.value;

    },

    start: function() {

        appData.isError = false;

        screens = document.querySelectorAll('.screen');

        screens.forEach(function(screen, index) {
            const selectVal = screen.querySelector('select').value;
            const inputVal = screen.querySelector('input').value;
            if ( selectVal == '' ||  inputVal == '') {
                appData.isError = true;
            };
        });

        if (appData.isError == false) {
            appData.addScreens();
            appData.addServices();
            appData.addPrices();
            // this.logger();
            appData.showResult();
        };

       
    },

    addScreens: function() {

        screens = document.querySelectorAll('.screen');

        screens.forEach(function(screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push(
                { 
                 id: index,
                 name: selectName,
                 price: +select.value * +input.value,
                 count: input.value
                });
        });

    },

    addServices: function() {
        otherItemsPercent.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value; 
           } 

        });

        otherItemsNumber.forEach(function(item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value; 
           } 

        });

    },

    showResult: function() {

        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
        totalCount.value = appData.screensNumber;

    },
 
    addScreenBlock: function() {

        screens = document.querySelectorAll('.screen');
        const cloneScreen = screens[0].cloneNode(true);
        cloneScreen.querySelector('input[type=text]').value = '';
        screens[screens.length - 1].after(cloneScreen);

    },

    addPrices: function() {

        appData.screenPrice = appData.screens.reduce(function(sum, item) {
            return sum += +item.price;
        }, 0 );   

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice* (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
        appData.screensNumber = appData.screens.reduce((sum, item) => {
            return sum += +item.count;
        }, 0);
        

    },

    logger: function() {

        this.getRollbackMessage(this.fullPrice);
        console.log(`Сумма за вычетом процента: ${this.servicePercentPrice}`);
        console.log(`Стоимость вёрстки экранов - ${this.screenPrice} рублей.
             Стоимость разработки сайта - ${this.fullPrice} рублей.`);  
    },

};


appData.init();