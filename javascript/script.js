const buttonStart = document.getElementById("start");
const color = document.querySelectorAll(".button");
const audioName = ["a.mp3", "b.mp3", "c.mp3", "d.mp3"];
let level = 1;
let score = 0;
let remember = [];

let lastButtonClicked = -1;

function enableClick() {
  color.forEach((value, index) => {
    value.addEventListener("click", soundButton);
  });
}
function soundButton() {
  let index;
  color.forEach((value, key) => {
    if (this == value) index = key;
  });
  const audio = new Audio(`audio/${audioName[index]}`);
  audio.play();
  lastButtonClicked = index;
}

function disableClick() {
  color.forEach((value, index) => {
    value.removeEventListener("click", soundButton);
  });
}
enableClick();

function randomNumbers(maxNumber, minRange, maxRange) {
  let array = [];
  for (let index = 0; index < maxNumber; index++) {
    array.push(Math.floor(Math.random() * maxRange) + minRange);
  }

  return array;
}

const getSingleRandomNumber = (minRange, maxRange) =>
  Math.floor(Math.random() * maxRange) + minRange;

function setScore(number) {
  if (number > 0) score += 20;
  else if (number < 0) score -= 20;
  else score = 0;

  document.querySelector("#score p").innerHTML = score;
}

function setLevel(number = 0) {
  document.querySelector("#level p").innerHTML = number + 1;
}

async function startGame() {
  while (level <= 10) {
    let score = await startLevel();
    console.log("FINE DEL LIVELLO", level);

    let levelUp = await new Promise((resolve) => {
      if (level !== 10) {
        setTimeout(() => {
          resolve(setLevel(level++));
        }, 2000);
      } else {

        resolve(level++);
      }
    });
  }
  return true;
}

async function startLevel() {
  let difficulty = level;
  let score = 0;
  let random = getSingleRandomNumber(0, 4);
  remember.push(random);

  let reverseArray = remember.reverse();
  console.log(remember);
  while (difficulty > 0) {
    await glowButton(difficulty, reverseArray[difficulty - 1]);
    difficulty--;
  }
  difficulty = level;

  await userChoice(difficulty, remember);
}

async function glowButton(difficulty, buttonToGlow) {
  console.log(buttonToGlow);
  let promise = new Promise((resolve) => {
    disableClick()
    const id = color[buttonToGlow].id;
    const audio = new Audio(`audio/${audioName[buttonToGlow]}`);

    setTimeout(() => {
      color[buttonToGlow].classList.add(id + "-active");
      audio.play();
      setTimeout(() => {
        resolve(color[buttonToGlow].classList.remove(id + "-active"));
      }, 1000);
    }, 500);
  });
  return promise;
}

async function userChoice(difficulty, rightSequence) {
  rightSequence = rightSequence.reverse();
  let promise = new Promise(async (resolve) => {
    enableClick();
    for (number of rightSequence) {
      lastButtonClicked = -1;
      while (lastButtonClicked === -1) {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(console.log(lastButtonClicked));
          }, 200);
        });
      }
      if (lastButtonClicked === number) {
        setScore(20);
      } else {
        setScore(-20);
      }
    }
    resolve(true);
  });
  return promise;
}

buttonStart.addEventListener("click", async () => {
  setScore(0);
  setLevel();
  remember = []

  buttonStart.setAttribute("disabled", "");
  let start = await startGame();
  buttonStart.removeAttribute("disabled", "");
});
