const remember = document.querySelectorAll(".rememberThis");
const start = document.getElementById("start");
const countDown = document.querySelector(".counter");
let timeToWait = 10;

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

function startCountDown() {
  let counter = timeToWait;
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


function showNumbers(array, ) {
    remember.forEach((element, index) => {
    element.innerHTML = array[index];
  });
}


function hideNumbers() {
    remember.forEach((value) => {
      value.innerHTML = "";
    });
}


function getSolution(array) {
        let answerArray = [];
        array.forEach((value, index) => {
            answerArray.push(prompt("inserisci numero"))
        })
        console.log(answerArray)

        writeResult(answerArray, array)
}
/**
 * 
 * @param {Array} answers 
 * @param {Array} results 
 */
function writeResult(answers, results) {
    console.log("risposte:", answers, "soluzioni :", results )
    let correct = [];
    let errors = 0;

    for (let i = 0; i < results.length; i++) {
        let current = results[i].toString()
        console.log("current", current)
        
        if (answers.includes(current)) {
            console.log("ENTRATO IF")
            correct.push(current)
        }
        else {
            console.log("ENTRATO ELSE")
            errors++
        }
    }
    
    console.log(errors, correct)
    document.getElementById("error").innerHTML = errors;
    correct.forEach((value) => {
        document.getElementById("correct").innerHTML += " " + value
    })
    showNumbers(results)



}



start.addEventListener("click", () => {
    start.setAttribute("disabled", "")
  //INIZIO UN COUNTDOWN CHE AGGIORNA IN PAGINA
    startCountDown();
    
    //CREO UN ARRAY RANDOM E LO ASSEGNO IN PAGINA
    let arrayRandom = randomNumbers(remember.length, 1, 99);
    showNumbers(arrayRandom)

  //Nascondo i numeri alla fine del countdown
    setTimeout(() => {
    hideNumbers();

    setTimeout(() => {
        let answerArray = getSolution(arrayRandom);
    }, 500);
    }, timeToWait * 1000);
    
});
