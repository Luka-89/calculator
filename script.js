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
    //power: '^',
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


    //Needs to handle writing into lastInput if lastInput is displaying a solution
    if (e.target.id === 'equals') {
        lastInput.innerHTML = evaluate(history.innerHTML);
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
    string = removeBrackets(string);
    let tokens = getTokens(string);
    return evaluateWithoutBrackets(tokens, 0, tokens.length);
}

function removeBrackets(string) {
    for(let i = 0; i < string.length; i++) {
        if(string.at(i) == '-') {
            let j = i + 1;
            while(string.at(j) == '-') j++;
            if((j - i) % 2 === 0) string = string.slice(0, i) + '+' + string.slice(j);
            else string = string.slice(0, i) + '-' + string.slice(j);
        }
    }
    
    let stack = [];
    stack.push(string.indexOf('('));
    if(stack[0] === -1) return string;

    for(let i = stack[0]; i < string.length; i++) {
        if(string.at(i) === '(') stack.push(i);
        else if(string.at(i) === ')') {
            openBracket = stack[stack.length - 1];
            let evaluatedBrackets = evaluate(string.slice(openBracket + 1, i));
            string = string.slice(0, openBracket) + evaluatedBrackets + string.slice(i + 1);
            i = openBracket;
            stack.pop();
        }
    }

    for(let i = 0; i < string.length; i++) {
        if(string.at(i) == '-') {
            let j = i + 1;
            while(string.at(j) == '-') j++;
            if((j - i) % 2 === 0) string = string.slice(0, i) + '+' + string.slice(j);
            else string = string.slice(0, i) + '-' + string.slice(j);
        }
    }
    

    return string;
} 


//Doesnt yet work with ^, only + - * /
function evaluateWithoutBrackets(tokens, start, end) { //contains start, doesnt contain end
        if(end - start === 1) return tokens[start];
        let plus = tokens.indexOf('+', start);
        if(plus >= end) plus = -1;
        let minus = tokens.indexOf('-', start);
        if(minus >= end) minus = -1;
        
        if(plus < 0 && minus < 0) {
            let res = tokens[start];
            for(let i = start + 1; i < end; i++) {
                switch(tokens[i]) {
                    case '*':
                        res = res * tokens[i + 1];
                        i++;
                        break;
                    case '/':
                        res = res / tokens[i + 1];
                        i++;
                        break;
                    default:
                        break;
                }
            }
            return res;
        }

        if(plus < 0) return evaluateWithoutBrackets(tokens, start, minus) - evaluateWithoutBrackets(tokens, minus + 1, end);
        if(minus < 0) return evaluateWithoutBrackets(tokens, start, plus) + evaluateWithoutBrackets(tokens, plus + 1, end);
        if(plus < minus) return evaluateWithoutBrackets(tokens, start, plus) + evaluateWithoutBrackets(tokens, plus + 1, end);
        else return evaluateWithoutBrackets(tokens, start, minus) - evaluateWithoutBrackets(tokens, minus + 1, end);
}

function getTokens(string) {
    tokens = [];
    let j = -1;
    for(let i = 0; i < string.length; i++) {
        if(string.at(i) in operationPriority) {
            if(i - j === 1) continue;
            else {
                tokens.push(parseFloat(string.slice(j + 1, i)));
                tokens.push(string.slice(i, i + 1));
                j = i;
            }
        }
    }
    tokens.push(parseFloat(string.slice(j + 1)));
    return tokens;
}