const result = document.querySelector('.result');
const numbers = document.querySelector('.numbers');
const btns = document.querySelectorAll('.btn');

let number;
let symbol;
let num1;
let num2;
let firstSecondNr;
let resTextNone;
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
            console.log('a');
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
        result.textContent += e.target.textContent
        localStorage.setItem('num1', result.textContent);
        localStorage.setItem('result', '');
        count = true;
    } else {
        result.textContent += e.target.textContent
        localStorage.setItem('num2', result.textContent);
    }
}

//  Function for equal button clicked

equal.onclick = () => {
    let res = 0;
    num1 = Number(localStorage.getItem('num1'))
    symbol = localStorage.getItem('symbol')
    num2 = Number(localStorage.getItem('num2'))
    if (count) {
        if (symbol === '+') res = num1 + num2;
        if (symbol === '-') res = num1 - num2;
        if (symbol === '*') res = num1 * num2;
        if (symbol === '/') res = num1 / num2;
        localStorage.setItem('result', res)
        console.log();
        result.textContent = res.toString().slice(0, 10);
        firstSecondNr = true;
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
    firstSecondNr = true;
    resTextNone = false;
}

//  Function for math symbol button clicked

for (const btn of btns) {
    btn.onclick = (e) => {
        localStorage.setItem('symbol', e.target.textContent);
        result.textContent = '';
        firstSecondNr = false;
        dotClicked = true;
    }
}