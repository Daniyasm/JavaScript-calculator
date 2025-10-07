console.log("1,2,3, testing");

const calculator = document.getElementById("calc");
const keys = calculator.querySelector('.keys');

console.log (calculator);
console.log (keys);

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {

        e.preventDefault(); /* stops the form from refreshin as soon as a button is clicked */

        const key = e.target
        const action = key.dataset.action 
        /* gets the value of the data-set attribute */

        const keyContent = key.textContent
        const display = calculator.querySelector('.display')
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

         // when OPERATOR key is pressed
        if ( action === 'add' || action === 'subtract'
            || action === 'multiply'|| action === 'divide'
        ) {
            console.log (action)

            Array.from(key.parentNode.children)
            .forEach (k => k.classList.remove('is-depressed'));
            /* key - button that is clicked
           parentNode - gets its parent element
           children - gives an HTMLCollection of all child elements inside the parent.
           Array.from() converts this collection into an array so that we can use array methods like .forEach().
           .forEach() - loops through each button (k) and removes is-depressed*/

            key.classList.add('is-depressed')
            /* .classList - gives you access to the list of classes for the element.*/
            // previous key
            calculator.dataset.previousKeyType = 'operator'
            
            // to calculate the value without pressing the equal key
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            if (firstValue && operator && previousKeyType !== 'operator') {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            }
            function calculate(n1, operator, n2) {
                let result = n1 + n2;
                let int1 = parseFloat(n1);
                let int2 = parseFloat(n2);
                if (operator === 'add') {
                    result = int1 + int2;
                } else if (operator === 'subtract') {
                    result = int1 - int2;
                } else if (operator === 'multiply') {
                    result = int1 * int2;
                } else if (operator === 'divide') {
                    result = int1 / int2;
                }
                return result;
            }

            calculator.dataset.firstValue = displayedNum
            console.log(displayedNum);
            calculator.dataset.operator = action
        } 

        else if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            console.log(firstValue)
            console.log(operator)
            console.log(secondValue)

             // calculate function
             function calculate(n1, operator, n2) {
                let result = n1 + n2;
                let int1 = parseFloat(n1);
                let int2 = parseFloat(n2);
                if (operator === 'add') {
                    result = int1 + int2;
                } else if (operator === 'subtract') {
                    result = int1 - int2;
                } else if (operator === 'multiply') {
                    result = int1 * int2;
                } else if (operator === 'divide') {
                    result = int1 / int2;
                }
                return result;
            }
            display.textContent = calculate(firstValue, operator, secondValue)
            calculator.dataset.previousKeyType = 'calculate'
        }
       
        else if (action === 'clear') {
            console.log('clear key!')
            calculator.dataset.previousKeyType = 'clear'
        } 
        
        else if (action === 'decimal') {
            // console.log('Decimal key!')
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        // when NUMBER key is pressed
        else if (!action) { 
            // console.log("Number key!")

            Array.from(key.parentNode.children)
            .forEach (k => k.classList.remove('is-depressed'));

            if (displayedNum.trim() === "0" || previousKeyType ==='operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number';
        }
        
        
       
    }
})

