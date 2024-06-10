// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));

    let currentInput = '0';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const value = event.target.getAttribute('data-value');

            if (value === 'clear') {
                currentInput = '0';
                previousInput = '';
                operator = '';
            } else if (value === '=') {
                if (previousInput && operator) {
                    currentInput = calculate(previousInput, operator, currentInput);
                    previousInput = '';
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (previousInput && operator) {
                    currentInput = calculate(previousInput, operator, currentInput);
                }
                previousInput = currentInput;
                operator = value;
                currentInput = '';
            } else {
                if (currentInput === '0' || currentInput === '') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }
            updateDisplay();
        });
    });

    function calculate(a, op, b) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        switch (op) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return (num1 / num2).toString();
            default:
                return b;
        }
    }

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }
});
