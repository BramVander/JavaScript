const arr = [1, 2, 3, 10, 20, 30, 40];
let newArr;
let lastArr;

const myFunc = function (arr) {
  newArr = arr.map((x) => x * 10);
  return newArr;
};

myFunc(arr);
console.log(newArr);

const filter = function (arr) {
  lastArr = arr.filter((x) => x < 10);
  return lastArr;
};

filter(newArr);
console.log(lastArr);
