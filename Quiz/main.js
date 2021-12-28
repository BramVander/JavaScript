"use strict";

const url =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/questions.json";

fetch(url)
  .then((res) => res.json())
  .then((quiz) => {
    view.start.addEventListener(
      "click",
      () => game.start(quiz.questions),
      false
    );
    view.response.addEventListener(
      "click",
      (event) => game.check(event),
      false
    );
  })
  .catch((error) => console.log(error));

// Utility functions
function random(a, b = 1) {
  // if only 1 argument is provided, we need to swap the values of a and b
  if (b === 1) {
    [a, b] = [b, a];
  }
  return Math.floor((b - a + 1) * Math.random()) + a;
}

function shuffle(array) {
  for (let i = array.length; i; i--) {
    let j = random(i) - 1;
    [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }
}

// VIEW OBJECT
const view = {
  score: document.querySelector("#score strong"),
  question: document.getElementById("question"),
  result: document.getElementById("result"),
  info: document.getElementById("info"),
  start: document.getElementById("start"),
  response: document.querySelector("#response"),

  render(target, content, attributes) {
    for (const key in attributes) {
      target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content;
  },

  show(element) {
    element.style.display = "block";
  },

  hide(element) {
    element.style.display = "none";
  },

  resetForm() {
    this.response.answer.value = "";
    this.response.answer.focus();
  },

  setup() {
    this.show(this.question);
    this.show(this.response);
    this.show(this.result);
    this.hide(this.start);
    this.render(this.score, game.score);
    this.render(this.result, "");
    this.render(this.info, "");
    this.resetForm();
  },

  teardown() {
    this.hide(this.question);
    this.hide(this.response);
    this.show(this.start);
  },
  buttons(array) {
    return array.map((value) => `<button>${value}</button>`).join("");
  },
};

// GAME OBJECT
const game = {
  start(quiz) {
    this.score = 0;
    this.questions = [...quiz];
    view.setup();
    this.ask();
  },

  ask(name) {
    console.log("ask() invoked");
    if (this.questions.length > 2) {
      shuffle(this.questions);
      this.question = this.questions.pop();
      const options = [
        this.questions[0].realName,
        this.questions[1].realName,
        this.question.realName,
      ];
      // shuffle(options);
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question, question);
      view.render(view.response, view.buttons(options));
    } else {
      this.gameOver();
    }
  },

  check(event) {
    event.preventDefault();
    const response = view.response.answer.value;
    const answer = this.question.realName;
    if (response === answer) {
      view.render(view.result, "Correct!", { class: "correct" });
      this.score++;
      view.render(view.score, this.score);
    } else {
      view.render(view.result, `Wrong! The correct answer was ${answer}`, {
        class: "wrong",
      });
    }
    view.resetForm();
    this.ask();
  },

  check(event) {
    console.log("check(event) invoked");
    const response = event.target.textContent;
    const answer = this.question.realName;
    if (response === answer) {
      console.log("correct");
      view.render(view.result, "Correct!", { class: "correct" });
      this.score++;
      view.render(view.score, this.score);
    } else {
      console.log("wrong");
      view.render(view.result, `Wrong! The correct answer was ${answer}`, {
        class: "wrong",
      });
    }
    this.ask();
  },

  gameOver() {
    view.render(
      view.info,
      `Game Over, you scored ${this.score} point${this.score !== 1 ? "s" : ""}`
    );
    view.teardown();
  },
};

// view.start.addEventListener("click", () => game.start(quiz), false);
// view.response.addEventListener("submit", (event) => game.check(event), false);
view.hide(view.response);
