let currentInput = '0';
let previousInput = '';
let operation = null;
let resetInput = false;
const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput;

    display.style.transform = 'scale(1.05)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 100);

    console.log("API: 'c'");
}

function appendNumber(number) {
    if (currentInput === '0' || resetInput) {
        currentInput = '';
        resetInput = false;
    }
    if (currentInput.length < 9) {
        currentInput += number;
        updateDisplay();
    }
}

function appendDecimal() {
    if (resetInput) {
        currentInput = '0';
        resetInput = false;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function appendOperator(op) {
    if (operation !== null) calculate();
    previousInput = currentInput;
    operation = op;
    resetInput = true;

    const buttons = document.querySelectorAll('.operator');
    buttons.forEach(btn => btn.style.backgroundColor = '#f0f0f0');
    event.target.style.backgroundColor = '#e0e0e0';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    result = Math.round(result * 100000) / 100000;

    currentInput = result.toString();
    operation = null;

    resetInput = true;
    updateDisplay();
    console.log("WYNIK: {result}", result);

    document.querySelectorAll('.operator').forEach(btn => {
        btn.style.backgroundColor = '#f0f0f0';
    });
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();

    document.querySelectorAll('.operator').forEach(btn => {
        btn.style.backgroundColor = '#f0f0f0';
    });

    event.target.style.transform = 'scale(0.9)';
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
    }, 100);
}

setTimeout(() => {
    document.querySelector('.calculator').style.opacity = '1';
}, 100);
