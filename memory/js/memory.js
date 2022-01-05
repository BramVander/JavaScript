"use strict";

// generate empty highscores
let highscore = {
  username: "breakMe",
  score: 0,
  attempts: 1000,
};

localStorage.setItem("board4x4", JSON.stringify(highscore));
localStorage.setItem("board5x5", JSON.stringify(highscore));
localStorage.setItem("board6x6", JSON.stringify(highscore));

let selectedSize;
let subSet;
let boardClass;
let uncovered;
let myCardSet = [];
let checkMatch = [];
let foundSets = [];
let countClick = 0;
let attempts = 0;
let score = 0;
let username;
let toParse;
let parsed;

let player = {
  username: username,
  score: score,
  attempts: attempts,
};

if (!localStorage.getItem("username")) {
  player.username = prompt("what is ur preferred username?");
  localStorage.setItem("username", player.username);
} else {
  player.username = localStorage.getItem("username");
  alert(`welcome back ${player.username}`);
}

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
  player.score = score;
  player.attempts = attempts;

  let currentHighscore = localStorage.getItem(
    `board${selectedSize}x${selectedSize}`
  );

  let hs = JSON.parse(currentHighscore);
  if (player.attempts < hs.attempts) {
    localStorage.setItem(
      `board${selectedSize}x${selectedSize}`,
      JSON.stringify(player)
    );
  }

  let div = document.createElement("div");
  div.innerHTML = `You have won the ${selectedSize}x${selectedSize}board! It took you ${player.attempts} attempts to reach the perfect score of ${player.score}`;
  myField.appendChild(div);
};

// check set function
const checkSet = function () {
  attempts++;
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
      3000
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
  }, 3000);
};

// toggle clickability when checking for match
const toggleClick = function () {
  myField.removeEventListener("click", onClickCard);
  setTimeout(() => {
    myField.addEventListener("click", onClickCard);
  }, 3000);
};

const startTimer = function () {
  // create timer element
  let timer = document.createElement("div");
  // set timer
  let time = 0;
  setInterval(function () {
    timer.innerHTML = `You started this game ${time} seconds ago`;
  });
  myField.appendChild(timer);
  setInterval(function () {
    time++;
  }, 1000);
};

// click card
const onClickCard = function (e) {
  e.preventDefault();
  countClick++;
  // we start timer at first click
  if (countClick === 1) startTimer();
  if (e.target.className === "covered") e.target.className = "uncovered";
  // gaurd clause for misclick
  if (!e.target.parentNode.firstChild.getAttribute("name")) return;
  // play sound, select audio element through parent and play()
  e.target.parentElement.lastChild.play();
  // at 2 clicks disable click, give 3s to check match, turn cards back down
  if (countClick % 2 === 0) {
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
  selectedSize = e.target.value;
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
