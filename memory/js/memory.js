"use strict";

let subSet;
let boardClass;

const myField = document.getElementById("field");
const selectSize = document.querySelector("#selectSize");
const myCardArray = [
  "duck",
  "kitten",
  "piglet",
  "puppy",
  "calf",
  "veal",
  "lamb",
  "rooster",
  "horse",
  "mouse",
  "dog",
  "cat",
  "goose",
  "goat",
  "sheep",
  "pig",
  "cow",
  "chick",
  "hen",
];

// Fisher/Yates shuffle
function shuffle(array) {
  let m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

// card class
class Card {
  constructor(card1, card2 = card1, set = card1, sound = card1) {
    this.card1 = card1;
    this.card2 = card2;
    this.set = set;
    this.sound = sound;
  }
}

// create card array with class
const myDoubles = myCardArray.map((card) => new Card(card));

// get duplicate cards
// let concat = myDoubles.concat(myDoubles);
function doubleElements(array) {
  var newArray = [];
  array.forEach(function (el) {
    // push element twice
    newArray.push(el, el);
  });
  return newArray;
}
const myCardSet = doubleElements(myDoubles);
shuffle(myCardSet);

// populate field
const populateField = function (cardset) {
  cardset.forEach((card) => {
    let newTile = document.createElement("div");
    let newCard = document.createElement("img");
    let cover = document.createElement("img");
    cover.setAttribute("src", "/img/cover.png");
    cover.setAttribute("class", "covered");
    newTile.setAttribute("class", boardClass);
    newCard.setAttribute("src", `/img/${card.card1}.jpg`);
    newCard.setAttribute("name", card.card1);
    newTile.appendChild(newCard);
    myField.appendChild(newTile);
    newTile.appendChild(cover);
  });
};

// click card
const onClickCard = function (e) {
  e.preventDefault();
  if (e.target.className === "covered") e.target.className = "uncovered";
  // gaurd clause for misclick
  if (!e.target.parentNode.firstChild.getAttribute("name")) return;
  console.log(e.target.parentNode.firstChild.getAttribute("name"));
};

// select field size
const onSelectFieldSize = function (e) {
  e.preventDefault();
  myField.innerHTML = '';
  let selectedSize = e.target.value;
  switch (selectedSize) {
    case "4":
      boardClass = "board4";
      subSet = 8;
      break;
    case "5":
      boardClass = "board5";
      subSet = 12;
      break;
    case "6":
      boardClass = "board6";
      subSet = 18;
      break;
  }
  let classArray = myCardArray.map((card) => new Card(card));
  // shuffle the cards to get different img each time, slice the subset
  let shuffledSub = shuffle(classArray).slice(0, subSet);
  // double it
  let doubledSub = doubleElements(shuffledSub);
  // shuffle doubles
  shuffle(doubledSub);
  // populate field
  populateField(doubledSub);
};

// add listeners for click
myField.addEventListener("click", onClickCard);
// listener for fieldsize
selectSize.addEventListener("change", onSelectFieldSize);
