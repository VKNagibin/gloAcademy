"use strict";

let fullPrice,  
    servicePercentPrice,
    allServicePrices,
    service1,
    service2,
    title,
    screens,
    screenPrice,
    adaptive;
    
let rollback = 25;

const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function() {
    title = prompt('Как называется Ваш проект?', "Калькулятор вёрстки");
    screens = prompt('Какие типы экранов нужно разработать?', "Простые, сложные");

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    } while (!isNumber(screenPrice));

    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function() {
    let sum = 0;

    for (let i = 0, j; i < 2; i++) {

        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');

        }
        
        do {
            j = prompt("Сколько это будет стоить?");
        } while (!isNumber(j));
        
        sum += +j;
    }

    return sum;

};

function showTypeOf(variable) {
    console.log(variable, typeof variable);
}

function getRollbackMessage(price) {
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
}

function getFullPrice() {
    return +screenPrice + allServicePrices;
}

function getTitle() {
   return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
}

function getServicePercentPrice() {
    return fullPrice - (fullPrice * (rollback / 100));
}

asking();
title = getTitle();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(screens.toLowerCase().split(', '));
console.log(`Сумма за вычетом процента: ${servicePercentPrice}`);
console.log(`Стоимость вёрстки экранов - ${screenPrice} рублей.
             Стоимость разработки сайта - ${fullPrice} рублей.`);
