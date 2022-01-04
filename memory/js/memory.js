"use strict";

// const player = !localstorage.player ? prompt("What is your name?") : localstorage.player;

let subSet;
let boardClass;
let uncovered;
let myCardSet = [];
let checkMatch = [];
let foundSets = [];
let countClick = 0;
let attempts = 0;
let score = 0;

const myField = document.getElementById("field");
const selectSize = document.querySelector("#selectSize");
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
  });

// populate field
const populateField = function (cardset) {
  cardset.forEach((card) => {
    // for each card draw tile, card, cover and sound
    let newTile = document.createElement("div");
    let newCard = document.createElement("img");
    let cover = document.createElement("img");
    let sound = document.createElement("audio");
    sound.setAttribute("src", `/snd/${card.card1}.wav`);
    cover.setAttribute("src", "/img/cover.png");
    cover.setAttribute("class", "covered");
    newTile.setAttribute("class", boardClass);
    newCard.setAttribute("src", `/img/${card.card1}.jpg`);
    newCard.setAttribute("name", card.card1);
    newCard.setAttribute("data-set", card.set);
    newTile.appendChild(newCard);
    myField.appendChild(newTile);
    newTile.appendChild(cover);
    newTile.appendChild(sound);
  });
};

// turn cards function
const turnCards = function () {
  uncovered.forEach((ele) => (ele.className = "covered"));
};

// win condition
const gameWon = function () {
  // attempts / 2 because finding a set [1 attempt] takes 2 clicks
  alert(
    // score altijd zelfde per bord want zelfde aantal matches?
    `gratz ${player}!, you've won with a score of ${score} in ${
      attempts / 2
    } attempts`
  );
};

// check set function
const checkSet = function () {
  // get uncovered cards
  uncovered = document.querySelectorAll(".uncovered");
  uncovered.forEach((ele) =>
    // store cardset data in checkMatch array
    checkMatch.push(ele.parentElement.firstChild.dataset.set)
  );
  // compare and push if set
  if (checkMatch[0] === checkMatch[1]) {
    foundSets.push(checkMatch[0]);
    // if match, remove from game after 5s and increment score
    // we use 5s because longest audio file takes 5s (goose)
    setTimeout(
      () => uncovered.forEach((ele) => ele.parentElement.remove()),
      5000
    );
    score++;
  }
  // check for win condition
  if (myField.childNodes.length === 2) {
    // fire win condition
    gameWon();
  }
  // clear array and turn cards
  checkMatch = [];
  setTimeout(() => {
    turnCards();
  }, 5000);
};

// toggle clickability when checking for match
const toggleClick = function () {
  myField.removeEventListener("click", onClickCard);
  setTimeout(() => {
    myField.addEventListener("click", onClickCard);
  }, 5000);
  countClick = 0;
};

// click card
const onClickCard = function (e) {
  e.preventDefault();
  countClick++;
  attempts++;
  if (e.target.className === "covered") e.target.className = "uncovered";
  // gaurd clause for misclick
  if (!e.target.parentNode.firstChild.getAttribute("name")) return;
  // play sound, select audio element through parent and play()
  e.target.parentElement.lastChild.play();
  // at 2 clicks disable click, give 3s to check match, turn cards back down
  if (countClick === 2) {
    toggleClick();
    checkSet();
  }
};

// select field size
const onSelectFieldSize = function (e) {
  e.preventDefault();
  // clear field
  myField.innerHTML = "";
  // set size
  let selectedSize = e.target.value;
  switch (selectedSize) {
    // 4x4
    case "4":
      boardClass = "board4";
      subSet = 8;
      break;
    // 5x5
    case "5":
      boardClass = "board5";
      subSet = 12;
      break;
    // 6x6
    case "6":
      boardClass = "board6";
      subSet = 18;
      break;
  }
  // shuffle the cards to get different imgs each time and slice the subset for fieldsize
  let shuffledSub = shuffle(myCardSet).slice(0, subSet);
  // double the cards for duplicates
  let doubledSub = shuffledSub.concat(shuffledSub);
  // shuffle doubles
  shuffle(doubledSub);
  // populate field
  populateField(doubledSub);
};

// listener for click
myField.addEventListener("click", onClickCard);
// listener for fieldsize
selectSize.addEventListener("change", onSelectFieldSize);
