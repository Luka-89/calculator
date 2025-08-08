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

let operationPriority = {
    '^': 3,
    '*': 2,
    '/': 2,
    '+': 1,
    '-': 1,
}

function handleButtonClick(e) {
    if (!(e.target.id in buttons)) return;

    if (e.target.id === 'clear') {
        history.innerHTML = '';
        lastInput.innerHTML = '';
        return;
    }
    if (e.target.id === 'delete') {
        if (history.innerHTML !== '') history.innerHTML = history.innerHTML.slice(0, -1);
        if (lastInput.innerHTML !== '') lastInput.innerHTML = lastInput.innerHTML.slice(0, -1);
        return;
    }

    if (e.target.id === 'equals') {
        lastInput.innerHTML = evaluate(history.innerHTML, 0, history.innerHTML.length);
        return;
    }

    if (lastInput.innerHTML === '') {
        history.innerHTML += buttons[e.target.id];
        lastInput.innerHTML += buttons[e.target.id];
        return;
    }

    if (buttons[e.target.id] <= '9' && buttons[e.target.id] >= '0') {
        if (lastInput.innerHTML.at(-1) <= '9' && lastInput.innerHTML.at(-1) >= '0') {
            history.innerHTML += buttons[e.target.id];
            lastInput.innerHTML += buttons[e.target.id];
        }
        else {
            history.innerHTML += buttons[e.target.id];
            lastInput.innerHTML = buttons[e.target.id];
        }
        return;
    }

    else {
        history.innerHTML += buttons[e.target.id];
        lastInput.innerHTML = buttons[e.target.id];
    }
}

function evaluate(string) {
    //will do after removeBrackets and evaluateWithoutBrackets
}

function removeBrackets(string) {
    let stack = [];
    stack.push(string.indexOf('('));
    if(stack[0] === -1) return;

    for(let i = 1; i < string.length; i++) {
        if(string.at(i) === '(') stack.push(i);
        else if(string.at(i) === ')') {
            openBracket = stack[stack.length - 1];
            let evaluatedBrackets = evaluateWithoutBrackets(string.slice(openBracket + 1, i));
            string = string.slice(0, openBracket) + evaluatedBrackets + string.slice(i + 1);
            i = openBracket;
            stack.pop();
        }
    }
} 

function evaluateWithoutBrackets(string) {
    //will do after handling the removal of brackets
}