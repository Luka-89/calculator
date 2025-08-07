/*let zero = document.querySelector("#zero");
let one = document.querySelector("#one");
let two = document.querySelector("#two");
let three = document.querySelector("#three");
let four = document.querySelector("#four");
let five = document.querySelector("#five");
let six = document.querySelector("#six");
let seven = document.querySelector("#seven");
let eight = document.querySelector("#eight");
let nine = document.querySelector("#nine");
let add = document.querySelector("#add");
let subtract = document.querySelector("#subtract");
let multiply = document.querySelector("#multiply");
let divide = document.querySelector("#divide");
let clear = document.querySelector("#clear");
let decimal = document.querySelector("#decimal")
*/
let history = document.querySelector(".history");
let lastInput = document.querySelector(".last-input");
let calculator = document.querySelector(".calculator");

calculator.addEventListener("click", handleButtonClick);

let buttons = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
    subtract: '-',
    add: '+',
    multiply: '*',
    divide: '/',
    power: '^',
    equals: '=',
    decimal: '.',
    clear: 'clear',
    delete: 'delete',
    leftBracket: '(',
    rightBracket: ')',
};


function handleButtonClick(e) {
    if (!(e.target.id in buttons)) return;
    if(e.target.id === 'clear') {
        history.innerHTML = '';
        lastInput.innerHTML = '';
        return;
    }
    if(e.target.id === 'delete') {
        history.innerHTML = history.innerHTML.slice(0, -1);
        if(lastInput.innerHTML !== '') lastInput.innerHTML = lastInput.innerHTML.slice(0, -1);
        return;
    }
    history.innerHTML += buttons[e.target.id];
    lastInput.innerHTML += buttons[e.target.id];
    
}