const result = document.querySelector('.result');
const numbers = document.querySelector('.numbers');
const btns = document.querySelectorAll('.btn');
localStorage.setItem('num1', '');
localStorage.setItem('num2', '');
localStorage.setItem('symbol', '');
localStorage.setItem('result', '');

let number;
let symbol;
let num1;
let num2;
let firstSecondNr;
let resTextNone;
let res = 0;
let resNumOne = '';
let resNumTwo = '';
let mathRes;
let count = true;
let dotClicked = true;

//  Number buttons

for (let index = 1; index < 11; index++) {
    number = document.createElement('div');
    number.classList.add('number');
    number.classList.add(index);
    number.textContent = index
    index === 10 ? number.textContent = '0' : '';
    numbers.appendChild(number);
    firstSecondNr = true;
    number.onclick = clickedNr;
}

// Dot button

const dot = document.createElement('div');
dot.classList.add('number');
dot.textContent = '.'
numbers.appendChild(dot);
dot.onclick = (e) => {
    if (dotClicked) {
        clickedNr(e);
        dotClicked = false;
    }
}

// Equal button

const equal = document.createElement('div');
equal.classList.add('number');
equal.textContent = '='
numbers.appendChild(equal);

//  Function for number buttons clicked

function clickedNr(e) {
    if (!resTextNone) {
        result.textContent = '';
        resTextNone = true;
    }
    if (firstSecondNr) {
        resNumOne += e.target.textContent
        result.textContent = resNumOne.toString().slice(0, 10)
        localStorage.setItem('num1', result.textContent);
        localStorage.setItem('result', '');
        resNumTwo = '';
    } else {
        resNumTwo += e.target.textContent;
        result.textContent = resNumTwo.toString().slice(0, 10);
        localStorage.setItem('num2', result.textContent);
        resTextNone = false;
        resNumOne = '';
    }
}

//  Function for math symbol button clicked


for (const btn of btns) {
    btn.onclick = (e) => {
        if (!firstSecondNr) hiddenEqualFunc();
        localStorage.setItem('symbol', e.target.textContent);
        result.textContent = '';
        firstSecondNr = false;
        dotClicked = true;
        resNumTwo = '';
    }
}

//  Function for equal button clicked

equal.onclick = equalFunc;

function equalFunc() {
    if (!firstSecondNr) {
        hiddenEqualFunc()
        res = localStorage.getItem('result')
        result.textContent = res.toString().slice(0, 10);
    }
}

function hiddenEqualFunc() {
    num1 = Number(localStorage.getItem('num1'))
    symbol = localStorage.getItem('symbol')
    num2 = Number(localStorage.getItem('num2'))
    if (count) {
        if (symbol === '+') res = num1 + num2;
        if (symbol === '-') res = num1 - num2;
        if (symbol === '*') res = num1 * num2;
        if (symbol === '/') res = num1 / num2;
        localStorage.setItem('result', res)
        resTextNone = false;
        count = false;
    } else {
        moreMath(mathRes)
    }
}

//  Function for more math, after we have first result

function moreMath() {
    mathRes = Number(localStorage.getItem('result'));
    if (symbol === '+') res = mathRes + num2;
    if (symbol === '-') res = mathRes - num2;
    if (symbol === '*') res = mathRes * num2;
    if (symbol === '/') res = mathRes / num2;
    localStorage.setItem('result', res)
    result.textContent = res.toString().slice(0, 10);
    resTextNone = false;
}