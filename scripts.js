// Set event listeners for buttons
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display-text'); 

let numStack = [];
let opStack = []

const buildEquation = function(val, op){
    numStack.push(val);
    opStack.push(op);
    display.innerText = '0';
}

const evalEquation = function(val){
    numStack.push(val);
    let returnVal = Number(numStack[0]);

    for (let i = 1; i < numStack.length; i++){
        switch(opStack[i-1]){
            case "/":
                returnVal /= Number(numStack[i]);
                break;
            case "*":
                returnVal *= Number(numStack[i]);
                break;
            case "+":
                returnVal += Number(numStack[i]);
                break;
            case "-":
                returnVal -= Number(numStack[i]);
                break;
        }
    }
    numStack = []
    opStack = []
    display.innerText = returnVal;
}

const backSpace = function(){
    let newDisplay = ''
    if ((display.innerText.length == 1) || ((display.innerText.length == 2) && (display.innerText[0] == '-'))){
        display.innerText = 0;
    } else {
        for (let i = 0; i < display.innerText.length - 1; i++){
            newDisplay += display.innerText[i];
        }
        display.innerText = newDisplay;
    }
}

const clearAll = function(){
    numStack = []
    opStack = []
    display.innerText = '0';
}

calculator.addEventListener('click', function(e) {
    if(e.target.classList[0].includes("btn")){
        let btnValue = e.target.innerText;
        
        switch(btnValue){
            case "÷":
                buildEquation(display.innerText, "/");
                break;
            case `×`:
                buildEquation(display.innerText, "*");
                break;
            case '-':
                buildEquation(display.innerText, "-");
                break;
            case '+':
                buildEquation(display.innerText, "+");
                break;
            case '=':
                evalEquation(display.innerText);
                break;
            case `←`:
                backSpace();
                break;
            case 'C':
                clearAll();
                break;
            default:
                if (display.innerText == "0"){
                    display.innerText = btnValue;
                } else {
                    display.innerText += btnValue;
                }
        }
    }
})

