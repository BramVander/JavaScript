const myInput = document.querySelector("#result");
const myOperator = document.querySelector("#operator");
const operators = ["/", "*", "+", "-"];
const equals = document.getElementById("=");
const c = document.getElementById("C");

// Functions
const addNumber = function (num) {
  myInput.value += num;
};

const onClickOperator = function (operator) {
  myOperator.value = operator;
  myInput.value = "";
};
const onClickCancel = function (e) {
  myInput.value = "";
  myOperator.value = "";
};
const onClickEquals = function (e) {
  console.log("solved");
};

// Event Handlers
equals.addEventListener("click", onClickEquals("="));
c.addEventListener("click", onClickCancel("C"));
