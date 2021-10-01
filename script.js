let title = 'The most important project',
    screens = "Простые, Сложные, Интерактивные",
    screenPrice = 100,
    fullPrice = 1500,
    adaptive = true,
    rollback = 28;

console.log(typeof title, typeof fullPrice, typeof adaptive);            
console.log(screens.length);                                            
console.log('Стоимость вёрстки экранов ' + screenPrice + ' долларов');   
console.log(screens.toLowerCase().split(", "));                          
console.log('Процент отката = ' + fullPrice * (rollback / 100)  );   