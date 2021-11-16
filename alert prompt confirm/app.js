const div = document.querySelector("#hier");

const test = function () {
  const fname = prompt(`what is ur name?`, `Vander`);
  console.log(fname);
  if (confirm(`is this ur name? ${fname}`)) {
    div.innerHTML = `Welkom ${fname}, fijne dag!`;
  } else {
    test();
  }
};

test();
