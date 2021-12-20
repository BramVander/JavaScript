"use strict";

// get elements
const myslider = document.getElementById("mySlider");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const boetekop = document.getElementById("boetekop");
const boetebalk = document.getElementById("boetebalk");
const boetebedrag = document.getElementById("boetebedrag");
const staffeltabel = document.getElementById("staffeltabel");
const staffelArray = [
  28, 35, 43, 49, 56, 64, 72, 98, 107, 118, 127, 137, 147, 158, 170, 181, 194,
  207, 221, 235, 247, 263, 277, 295, 309, 325,
];

const checkSliderValue = function (e) {
  let sliderValue = e.target.value;
  // corrSnelheid onder 100 krijgt correctie van 3km/u
  let corrSnelheid = sliderValue < 100 ? sliderValue - 53 : sliderValue - 50;

  output.value = sliderValue;

  feedback.style.visibility = "visible";
  if (sliderValue < 51) {
    feedback.style.background = "green";
    feedback.innerHTML = "Keurig, houden zo!";
    boetebalk.style.visibility = "hidden";
    boetekop.style.visibility = "hidden";
  } else if (sliderValue > 50 && sliderValue <= 80) {
    feedback.style.background = "orange";
    feedback.innerHTML =
      "Dat is te hard binnen de bebouwde kom, riskeert een boete!";
    if (sliderValue > 56) {
    }
  } else {
    feedback.style.background = "red";
    feedback.innerHTML =
      "U riskeert een strafzaak en het in beslag nemen van uw voertuig en ontzegging van uw rijbevoegdheid";
  }

  let boete;

  switch (corrSnelheid) {
    case 4:
      boete = 28;
      break;
    case 5:
      boete = 35;
      break;
    case 6:
      boete = 43;
      break;
    case 7:
      boete = 49;
      break;
    case 8:
      boete = 56;
      break;
    case 9:
      boete = 64;
      break;
    case 10:
      boete = 72;
      break;
    case 11:
      boete = 98;
      break;
    case 12:
      boete = 107;
      break;
    case 13:
      boete = 118;
      break;
    case 14:
      boete = 127;
      break;
    case 15:
      boete = 137;
      break;
    case 16:
      boete = 147;
      break;
    case 17:
      boete = 158;
      break;
    case 18:
      boete = 170;
      break;
    case 19:
      boete = 181;
      break;
    case 20:
      boete = 194;
      break;
    case 21:
      boete = 207;
      break;
    case 22:
      boete = 221;
      break;
    case 23:
      boete = 235;
      break;
    case 24:
      boete = 247;
      break;
    case 25:
      boete = 263;
      break;
    case 26:
      boete = 277;
      break;
    case 27:
      boete = 295;
      break;
    case 28:
      boete = 309;
      break;
    case 29:
      boete = 325;
      break;
    default:
      corrSnelheid > 29 ? (boete = 325) : (boete = 0);
  }

  // administratiekosten
  boete > 0 ? (boete += 9) : (boete = boete);

  // als er sprake is van boete, laat boetestyling zien
  if (boete) {
    boetebalk.style.visibility = "visible";
    boetekop.style.visibility = "visible";
  }

  // calc balk width
  boetebalk.style.width = boete * 3 + "px";
  boetebedrag.innerHTML = "&euro;" + boete;
};

// text variable
let text = "<tr><th>Te Hard (km)</th><th>Boetebedrag</th>";
for (let i = 0; i < staffelArray.length; i++) {
  text += "<tr><td>" + (i + 4) + "</td><td>" + staffelArray[i] + "</td></tr>";
}

document.getElementById("staffeltabel").innerHTML = text;

myslider.addEventListener("input", checkSliderValue);
