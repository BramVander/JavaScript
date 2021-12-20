const myInput = document.querySelector("#result");
const myOperator = document.querySelector("#operator");
const operators = document.getElementById("operators");
const numbers = document.getElementById("numbers");

// Gloabl scope variables
let firstNum = "";
let secondNum = "";
let operator = "";

// Functions
const addNumber = function (num) {
  // Check for 0
  if (num == "0") {
    if (myInput.value.startsWith("0")) {
      // 0 only allowed at previous .
      if (myInput.value.indexOf(".") === -1) {
        return;
      }
    }
  }
  // . only allowed if no previous .
  if (num == ".") {
    if (myInput.value.indexOf(".") !== -1) return;
  }
  // Num = string so we can concatenate
  myInput.value += num;
};

const onClickOperator = function (inputOperator) {
  // Check for input
  if (myInput.value === "") return;
  // Type casting
  firstNum = Number(myInput.value);
  operator = inputOperator;
  myOperator.value = operator;
  myInput.value = "";
};

const onClickCancel = function () {
  myInput.value = "";
  myOperator.value = "";
  firstNum = "";
  secondNum = "";
  operator = "";
};

const onClickEquals = function (e) {
  e.preventDefault();
  secondNum = Number(myInput.value);
  if (firstNum === "" || secondNum === "" || operator === "") {
    alert(
      "Please enter a valid calculation [consists of 2 numbers and 1 operator]"
    );
  }
  if (operator === "") return;
  myInput.value = "";
  myOperator.value = "";

  // Local scope variable to store result
  let result;

  // Conditionals for calculations
  switch (operator) {
    case "/":
      result = firstNum / secondNum;
      break;
    case "x":
      result = firstNum * secondNum;
      break;
    case "+":
      result = firstNum + secondNum;
      break;
    case "-":
      result = firstNum - secondNum;
      break;
    default:
      alert("no operator detected");
      break;
  }
  myInput.value = result;
  firstNum = "";
  secondNum = "";
  operator = "";
};

// Event Handlers for user events
numbers.addEventListener("click", function (e) {
  e.preventDefault();
  // if length > 1 the click missed the button
  if (e.target.innerHTML.length > 1) return;
  if (e.target.innerHTML === "=") return onClickEquals(e);
  // Local scope variable
  let clickedNum = e.target.innerHTML;
  addNumber(clickedNum);
});

operators.addEventListener("click", function (e) {
  e.preventDefault();
  // Check for clear button
  if (e.target.innerHTML == "C") return onClickCancel();
  operator = e.target.innerHTML;
  onClickOperator(operator);
});
