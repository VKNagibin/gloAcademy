"use strict";

const books = document.querySelectorAll('.book');
const liBook2 = books[0].querySelectorAll('li');
const liBook5 = books[5].querySelectorAll('li');
const liBook6 = books[2].querySelectorAll('li');

books[0].insertAdjacentElement('beforebegin', books[1]);
books[2].before(books[4]);
books[5].after(books[2]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
document.querySelectorAll('.book a')[2].innerText = "Книга 3. this и Прототипы Объектов";
document.querySelector('.adv').remove();

liBook2[4].before(liBook2[6], liBook2[8]);
liBook2[9].after(liBook2[2]);

liBook5[2].before(liBook5[9], liBook5[3], liBook5[4]);
liBook5[2].after( liBook5[6],  liBook5[7]);

liBook6[8].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');

