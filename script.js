let title = 'The most important project',
    screens = "Простые, Сложные, Интерактивные",
    screenPrice = 100,
    fullPrice = 1500,
    adaptive = true,
    rollback = 28,
    rollbackPercentage;

console.log(typeof title, typeof fullPrice, typeof adaptive);            
console.log(screens.length);                                            
console.log('Стоимость вёрстки экранов ' + screenPrice + ' долларов');   
console.log(screens.toLowerCase().split(", "));                          
console.log('Процент отката = ' + fullPrice * (rollback / 100));   

rollbackPercentage = fullPrice * (rollback / 100);

title = prompt('Как называется Ваш проект?');
screens = prompt('Какие типы экранов нужно разработать?');
screenPrice = +prompt('Сколько будет стоить данная работа?');
adaptive = prompt('Нужен ли адаптив на сайте?');

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');

fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice - rollbackPercentage);

console.log(servicePercentPrice);

switch (true) {
    case fullPrice >= 30000 :
        console.log('Даем скидку в 10%');
        break;
    case fullPrice >= 15000 && fullPrice < 30000 :
        console.log('Даем скидку в 5%');
        break;
    case fullPrice < 15000 && fullPrice > 0 :
        console.log('Скидка не предусмотрена');
        break; 
    case fullPrice < 15000 && fullPrice >= 0 :
        console.log('Скидка не предусмотрена');
        break; 
    case fullPrice < 0 :
        console.log('Что то пошло не так');
        break; 
}



