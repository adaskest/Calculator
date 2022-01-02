const result = document.querySelector('.result');
const numbers = document.querySelector('.numbers');
const btns = document.querySelectorAll('.btn');
result.textContent.slice(0, 10);

let res = '';
let numer;
let once;
let trig;

for (let index = 1; index < 11; index++) {
    numer = document.createElement('div');
    numer.classList.add('number');
    numer.classList.add(index);
    numer.textContent = index
    index === 10 ? numer.textContent = '0' : '';
    numbers.appendChild(numer);
    once = true;
    numer.onclick = clickedNr;
}

function clickedNr(e) {
    console.log(trig);
    if (!trig) {
        result.textContent = '';
        trig = true;
    }
    if (once) {
        result.textContent += e.target.textContent
        localStorage.setItem('num1', result.textContent);
    } else {
        result.textContent += e.target.textContent
        localStorage.setItem('num2', result.textContent);
    }
}


const dot = document.createElement('div');
dot.classList.add('number');
dot.textContent = '.'
numbers.appendChild(dot);

const equal = document.createElement('div');
equal.classList.add('number');
equal.textContent = '='
numbers.appendChild(equal);

equal.onclick = () => {
    let res = 0;
    const num1 = Number(localStorage.getItem('num1'))
    const symbol = localStorage.getItem('symbol')
    const num2 = Number(localStorage.getItem('num2'))
    if (symbol === '+') res = num1 + num2;
    if (symbol === '-') res = num1 - num2;
    if (symbol === '*') res = num1 * num2;
    if (symbol === '/') res = num1 / num2;
    result.textContent = res.toString().slice(0, 10)
    localStorage.clear()
    once = true;
    trig = false;
}

for (const btn of btns) {
    btn.onclick = (e) => {
        localStorage.setItem('symbol', e.target.textContent);
        result.textContent = '';
        once = false
    }
}