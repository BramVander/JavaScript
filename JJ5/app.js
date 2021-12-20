// const arr = [1, 2, 3, 10, 20, 30, 40];
// let newArr;
// let lastArr;

// const myFunc = function (arr) {
//   newArr = arr.map((x) => x * 10);
//   return newArr;
// };

// myFunc(arr);
// console.log(newArr);

// const filter = function (arr) {
//   lastArr = arr.filter((x) => x < 10);
//   return lastArr;
// };

// filter(newArr);
// console.log(lastArr);

const button = document.querySelector("#btn");
const input = document.querySelector("#input");
const list = document.querySelector("#list");

const add = function () {};

button.addEventListener("click", function (e) {
  e.preventDefault();
  const test = input.value;
  const link = document.createElement("a");
  const newItem = document.createElement("li");
  const newText = document.createTextNode(test);
  newItem.appendChild(newText);
  list.appendChild(newItem);
  link.innerHTML = "VERWIJDER";
  list.appendChild(link);
});
