const buttonStart = document.getElementById("start");
const color = document.querySelectorAll(".button");
let level = 1;
let score = 0;

function randomNumbers(maxNumber, minRange, maxRange) {
  let array = [];
  for (let index = 0; index < maxNumber; index++) {
    array.push(Math.floor(Math.random() * maxRange) + minRange);
  }

  return array;
}

async function startGame() {
  while (level < 10) {
    let score = await startLevel();
      console.log("FINE DEL LIVELLO", level);
      
      let levelUp = await new Promise((resolve) => {
          setTimeout(() => {
        document.querySelector("#level p").innerHTML = level + 1 
        resolve(level++)
    }, 2000);})
  }
}

async function startLevel() {
  let difficulty = level;
  let score = 0;
    const remember = randomNumbers(difficulty, 0, 4);
     
    while (difficulty > 0) {
        await glowButton(difficulty,remember[difficulty-1])
        difficulty--
    }

    
}


async function glowButton(difficulty, buttonToGlow) {
    console.log(buttonToGlow)
    let promise = new Promise((resolve) => {
        const id = color[buttonToGlow].id;
        setTimeout(() => {
            color[buttonToGlow].classList.add(id + "-active")
            setTimeout(() => {
                resolve(color[buttonToGlow].classList.remove(id + "-active"))
            }, 1000);
        },1000)
    })
    return promise;
}


buttonStart.addEventListener("click", () => {
  buttonStart.setAttribute("disabled", "");
  startGame();
});
