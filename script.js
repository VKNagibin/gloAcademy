"use strict";
    
const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true ,
    rollback: 25,
    fullPrice: 0,
    servicePercentPrice:'',
    allServicePrices: 0,
    service1: '',
    service2: '',
    
    asking: function() {
        this.title = prompt('Как называется Ваш проект?', "Калькулятор вёрстки");
        this.screens = prompt('Какие типы экранов нужно разработать?', "Простые, сложные");
    
        do {
            this.screenPrice = prompt('Сколько будет стоить данная работа?');
        } while (!this.isNumber(this.screenPrice));
    
        this.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },

    getAllServicePrices: function() {
        let sum = 0;
    
        for (let i = 0, j; i < 2; i++) {
    
            if (i === 0) {
                this.service1 = prompt('Какой дополнительный тип услуги нужен?');
            } else if (i === 1) {
                this.service2 = prompt('Какой дополнительный тип услуги нужен?');
    
            }
            
            do {
                j = prompt("Сколько это будет стоить?");
            } while (!this.isNumber(j));
            
            sum += +j;
        }
    
        return sum;
    },

    getRollbackMessage: function (price) {

        switch (true) {
            case price >= 30000 :
                console.log('Даем скидку в 10%');
                break;
            case price >= 15000 && price < 30000 :
                console.log('Даем скидку в 5%');
                break;
            case price < 15000 && price > 0 :
                console.log('Скидка не предусмотрена');
                break; 
            case price < 15000 && price >= 0 :
                console.log('Скидка не предусмотрена');
                break; 
            case price < 0 :
                console.log('Что то пошло не так');
                break; 
        }
    },

    getFullPrice: function () {
        return +this.screenPrice + this.allServicePrices;
    },

    getTitle: function() {
        return this.title.trim()[0].toUpperCase() + this.title.trim().substr(1).toLowerCase();
    },

    getServicePercentPrice: function() {
        return this.fullPrice - (this.fullPrice * (this.rollback / 100));
    },

    logger: function() {

        this.getRollbackMessage(this.fullPrice);
        console.log(this.screens.toLowerCase().split(', '));
        console.log(`Сумма за вычетом процента: ${this.servicePercentPrice}`);
        console.log(`Стоимость вёрстки экранов - ${this.screenPrice} рублей.
             Стоимость разработки сайта - ${this.fullPrice} рублей.`);
        
        for (let key in this) {
            console.log(key);
        }
    },

    start: function() {
        this.asking();
        this.title = this.getTitle();
        this.allServicePrices = this.getAllServicePrices();
        this.fullPrice = this.getFullPrice();
        this.servicePercentPrice = this.getServicePercentPrice();
        this.logger();
    }
};


appData.start();



