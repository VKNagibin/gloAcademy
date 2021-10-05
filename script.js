let title = 'The most important project',
    screens = "Простые, Сложные, Интерактивные",
    screenPrice = 100,
    fullPrice = 1500,
    adaptive = true,
    rollback = 28,
    rollbackPercentage;

title = prompt('Как называется Ваш проект?');
screens = prompt('Какие типы экранов нужно разработать?');
screenPrice = +prompt('Сколько будет стоить данная работа?');
adaptive = confirm('Нужен ли адаптив на сайте?');

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');

fullPrice = screenPrice + servicePrice1 + servicePrice2;
rollbackPercentage = fullPrice * (rollback / 100);
let servicePercentPrice = Math.ceil(fullPrice - rollbackPercentage);

let getAllServicePrices = function() {
    let  result = 0;

    for (let i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }

    return result;
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

function getFullPrice(screen, service) {
    return screen + service;
}

function getTitle(title) {
    let newTitle = '';
    for (let i = 0, count = 0; i < title.length; i++) {

        if (title[i] != ' ') {
            count++;
            newTitle += count == 1 ? title[i].toUpperCase() : title[i].toLowerCase();
        } else {
            newTitle += title[i];
        }
    }

    return newTitle;
}

function getServicePercentPrices(fullPrice, percent) {
    return fullPrice - percent;
}

title = getTitle(title);
let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollbackPercentage);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
console.log(screens.split(', '));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);
