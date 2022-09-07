const buttonStart = document.getElementById("start");
const color = document.querySelectorAll(".button");
const audioName = ["a.mp3", "b.mp3", "c.mp3", "d.mp3"];

let lastButtonClicked = -1;


class Play {
  constructor() {
    this.level = 1;
    this.score = 0;
    this.remember = []
  }

  setLevel(number = 0) {
    document.querySelector("#level p").innerHTML = number + 1;
  }
  setScore(number = 0) {
    if (number > 0) partita.score += 20;
    else if (number < 0) partita.score -= 20;
    else partita.score = 0;
  
    document.querySelector("#score p").innerHTML = partita.score;
  }

}



let partita;

enableClick()



/**
 * Enable click on colored Button
 */
function enableClick() {
  color.forEach((value, index) => {
    value.addEventListener("click", colorClickEvent);
  });
}

/**
 * When click a button, sound is played, and variable "lastbuttonclicked" is updated
 */
function colorClickEvent() {
  let index;
  color.forEach((value, key) => {
    if (this == value) index = key;
  });
  const audio = new Audio(`audio/${audioName[index]}`);
  audio.play();
  color[index].classList.add(this.id + "-active");
  setTimeout(() => {
    color[index].classList.remove(this.id + "-active");
  }, 700);


  lastButtonClicked = index;
}


/**
 * Disable click on colored Button
 */
function disableClick() {
  color.forEach((value, index) => {
    value.removeEventListener("click", colorClickEvent);
  });
}

/**
 * Return an array with random numbers
 * @param {Number} maxNumber array length
 * @param {Number} minRange min random number
 * @param {Number} maxRange max random number
 * @returns 
 */
function randomNumbers(maxNumber, minRange, maxRange) {
  let array = [];
  for (let index = 0; index < maxNumber; index++) {
    array.push(Math.floor(Math.random() * maxRange) + minRange);
  }

  return array;
}
/**
 * Return a random number
 * @param {*} minRange min random number
 * @param {*} maxRange max random number
 * @returns 
 */
const getSingleRandomNumber = (minRange, maxRange) =>
  Math.floor(Math.random() * maxRange) + minRange;



/**
 * Start the game 
 * @returns 
 */
async function startGame() {

  while (partita.level <= 10) {

    
    await startLevel();
    console.log("FINE DEL LIVELLO", partita.level);

    //WAIT FEW SECOND BEFORE START NEW LEVEL
    let levelUp = await new Promise((resolve) => {
      if (partita.level !== 10) {
        setTimeout(() => {
          resolve(partita.setLevel(partita.level++));
        }, 2000);
      } else {

        resolve(partita.level++);
      }
    });
  }
  return true;
}

/**
 * Start a level 
 */
async function startLevel() {
  let counter = partita.level;
  let random = getSingleRandomNumber(0, 4);
  partita.remember.push(random);

  let reverseArray = partita.remember.reverse();
  console.log(partita.remember);
  while (counter > 0) {
    await glowButton(reverseArray[counter - 1]);
    counter--;
  }
  await userChoice(partita.remember);
}

/**
 * Glow a button and play a note for it
 * @param {Number} buttonToGlow A number in range 1,3 to glow button
 */
async function glowButton(buttonToGlow) {
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
      }, 1000); //first timeout for glow on
    }, 500); //second timeout for wait before next button in sequence
  });
  return promise;
}

/**
 * for passed array wait user interaction and calculate score
 * @param {Array} rightSequence the right sequence to guess
 */
async function userChoice(rightSequence) {
  rightSequence = rightSequence.reverse();
  let promise = new Promise(async (resolve) => {
    enableClick();
    for (number of rightSequence) {
      lastButtonClicked = -1;

      // while user not interact infinite loop
      while (lastButtonClicked === -1) {

        //this is only for slow array
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(console.log(lastButtonClicked));
          }, 200);
        });


      }
      if (lastButtonClicked === number) {
        partita.setScore(20);
      } else {
        partita.setScore(-20);
      }
    }
    disableClick()
    resolve(true);
  });
  return promise;
}





buttonStart.addEventListener("click", async () => {
  partita = new Play()
  partita.setLevel()
  partita.setScore()

  buttonStart.setAttribute("disabled", "");
  let start = await startGame();
  buttonStart.removeAttribute("disabled", "");
});
