const readline = require('readline-sync');
const messages = require('./calculator_messages.json');

function prompt (message) {
  console.log(`=> ${message}`);
}

function getInput () {
  return readline.question();
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function doMath (number1, number2, operation) {
  let output;
  switch (operation) {
    case '1' :
      output = Number(number1) + Number(number2);
      break;
    case '2' :
      output = Number(number1) - Number(number2);
      break;
    case '3' :
      output = Number(number1) * Number(number2);
      break;
    case '4' :
      output = Number(number1) / Number(number2);
      break;
  }
  return output;
}

function invalidYesNo (string) {
  if (string === 'yes' || string === 'y') {
    return false;
  } else if (string === 'no' || string === 'n') {
    return false;
  } else {
    return true;
  }
}

//Clear the console
console.clear();

//Welcome the user
prompt(messages.greeting);

let yesOrNo;

do {
  //Get first number from the user
  prompt(messages.firstNumber);
  let number1 = getInput();

  //Check the user has entered a valid number
  while (invalidNumber(number1)) {
    prompt(messages.invalidNumber);
    number1 = getInput();
  }

  //Get second number from the user
  prompt(messages.secondNumber);
  let number2 = getInput();

  //Check the user has entered a valid number
  while (invalidNumber(number2)) {
    prompt(messages.invalidNumber);
    number2 = getInput();
  }

  //Ask what operation the user wants to preform
  prompt(messages.operation);
  let operation = getInput();

  //Check the user has chosen an operation
  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages.invalidOperation);
    operation = getInput();
  }

  //Check to make sure they're not dividing by zero
  if (number2 === '0' && operation === '4') {
    prompt(messages.divideByZero);
  } else {
    /* Now doMath preforms the requested operation and the result
    is logged to the console*/
    prompt(`${messages.result} ${doMath(number1, number2, operation)}`);
  }

  //Ask if the user wants to calculate another pair of numbers
  prompt(messages.again);
  yesOrNo = getInput().toLocaleLowerCase();

  while (invalidYesNo(yesOrNo)) {
    prompt(messages.notYesOrNo);
    yesOrNo = getInput().toLocaleLowerCase();
  }

  //Celeberate the user choosing to do more math and clear the console
  if (yesOrNo === 'yes' || yesOrNo === 'y') {
    console.clear();
    prompt(messages.moreMath);
  }
} while ((yesOrNo === 'yes' || yesOrNo === 'y'));

//Say goodbye
prompt(messages.thanks);
