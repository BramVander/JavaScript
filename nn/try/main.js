const form = document.forms["hero"];
form.addEventListener("submit", makeHero, false);

function makeHero(event) {
  // prevent the form from being submitted
  event.preventDefault();
  // create an empty object
  const hero = {};

  hero.powers = [...form.powers]
    .filter((box) => box.checked)
    .map((box) => box.value);

  console.log(hero.powers);

  // create a name property based on the input field's value
  hero.name = form.heroName.value;
  hero.realName = form.realName.value;
  hero.category = form.category.value;
  hero.age = form.age.value;
  hero.city = form.city.value;
  // convert object to JSON string and display in alert dialog
  alert(JSON.stringify(hero));
  return hero;
}
