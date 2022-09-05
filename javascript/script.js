const remember = document.querySelectorAll(".rememberThis");
const start = document.getElementById("start");
const countDown = document.querySelector(".counter");

/**
 *
 * @param {Number} maxNumber QUANTI ELEMENTI NELL'ARRAY
 * @param {Number} minRange MINIMO NUMERO ESTRATTO
 * @param {Number} maxRange MAX NUMERO ESTRATTO
 * @returns
 */
function randomNumbers(maxNumber, minRange, maxRange) {
  let array = [];
  for (let index = 0; index < maxNumber; index++) {
    array.push(Math.floor(Math.random() * maxRange) + minRange);
  }

  return array;
}

function startCountDown(time) {
  let counter = time;
  const reference = setInterval(() => {
    counter--;
    countDown.innerHTML = counter;
    console.log(counter);
    if (counter === 0) {
      clearInterval(reference);
    }
  }, 1000);

  return reference;
}

function hideNumbers(timeToWait) {
  setTimeout(() => {
    remember.forEach((value) => {
      value.innerHTML = "";
    });
  }, timeToWait * 1000 + 250);
}




start.addEventListener("click", () => {
  let timeToWait = 10;

  //INIZIO UN COUNTDOWN CHE AGGIORNA IN PAGINA
    startCountDown(timeToWait);
    
    //CREO UN ARRAY RANDOM E LI ASSEGNO IN PAGINA
  let arrayRandom = randomNumbers(5, 1, 99);
  remember.forEach((element, index) => {
    element.innerHTML = arrayRandom[index];
  });
  
  //Nascondo i numeri alla fine del countdown
    hideNumbers(timeToWait);




});
