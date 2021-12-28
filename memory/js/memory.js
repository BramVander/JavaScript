"use strict";

let subSet;
let boardClass;
let myCardArray = [];
let myCardSet = [];

const myField = document.getElementById("field");
const selectSize = document.querySelector("#selectSize");

// // function to double card array
// function doubleElements(array) {
//   var newArray = [];
//   array.forEach(function (el) {
//     // push element twice
//     newArray.push(el, el);
//   });
//   return newArray;
// }

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

// construct as object
class Card {
  constructor(card) {
    this.card1 = card.card1;
    this.card2 = card.card2;
    this.set = card.set;
    this.sound = card.sound;
  }
}

// fetch data from js file and put into myCardSet
fetch("js/cards.json")
  .then((response) => response.json())
  .then((data) => {
    myCardSet = data.map((card) => new Card(card));
    // console.log(myCardArray);
  });

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
  // console.log(e.target.parentNode.firstChild.getAttribute("name"));
};

// select field size
const onSelectFieldSize = function (e) {
  e.preventDefault();
  // clear field
  myField.innerHTML = "";
  // set size
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
  // // shuffle the cards to get different img each time and slice the subset for fieldsize
  let shuffledSub = shuffle(myCardSet).slice(0, subSet);
  // // double the cards for duplicates
  let doubledSub = shuffledSub.concat(shuffledSub);
  // // shuffle doubles
  shuffle(doubledSub);
  // populate field
  populateField(doubledSub);
};

// add listeners for click
myField.addEventListener("click", onClickCard);
// listener for fieldsize
selectSize.addEventListener("change", onSelectFieldSize);
