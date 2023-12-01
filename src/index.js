const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "easy";

const audioHit = new Audio("https://github.com/gabrielsanchez/erddiagram/blob/main/hit.mp3?raw=true");
const song = new Audio("https://github.com/gabrielsanchez/erddiagram/blob/main/molesong.mp3?raw=true");

function playAudio(audioObject) {
  audioObject.play();
}

function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

function stopAudio(audioObject) {
  audioObject.pause();
  audioObject.currentTime = 0; // Reset the audio to the beginning
}

function play() {
  if (song.paused) {
    playAudio(song);
  }
}

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  } else {
    return 0;
  }
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */
function chooseHole(holes) {
  let index = randomInteger(0, 8);
  const hole = holes[index];

  if (hole === lastHole) {
    return chooseHole(holes);
  } else {
    lastHole = hole;
    return hole;
  }
}

/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
function gameOver() {
  if (time > 0) {
    const timeoutId = showUp();
    return timeoutId;
  } else {
    const gameStopped = stopGame();
    return gameStopped;
  }
}
  
/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  console.log("showUp function called");
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  const timeoutID = showAndHide(hole, delay);
  return timeoutID; // Return the timeoutID explicitly
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
let timeoutID; 
function showAndHide(hole, delay){
 
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {  
    toggleVisibility(hole);
    gameOver();
  }, 1000); 
  return timeoutID;
}

  const timeoutID = setTimeout(() => {
    // TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
    toggleVisibility(hole);
    updateTimer();
    gameOver();
  }, delay);

  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole){
  // TODO: add hole.classList.toggle so that it adds or removes the 'show' class.
  hole.classList.toggle('show');
  return hole;
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  console.log("updateScore function called");
  points += 1;
  score.textContent = points;
  return points;
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  console.log("updateTimer function called");
  if (time > 0) {
    time -= 1; // Update the timer by 1 second
    timerDisplay.textContent = time; // Update the display
  }

  if (time === 0) {
    stopGame();
  }

  return time;
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  // Use setInterval to call updateTimer every 1000ms (1 second)
  timer = setInterval(updateTimer, 1000);
  return timer;
}

function updateTimer() {
  if (time > 0) {
    console.log("Updating timer:", time);
    time--; // Decrement the time by 1 second
    timerDisplay.textContent = time; // Update the display
  } else {
    stopGame();
  }
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
    console.log("Whack function called");
    console.log("Event:", event);
    console.log("Event target:", event.target);

    // Ensure that the event was triggered by a user click on a mole
    const mole = event.target;
    if (mole.classList.contains('mole') && mole.getAttribute('data-whacked') !== 'true') {
        // Set the data attribute to mark the mole as whacked
        mole.setAttribute('data-whacked', 'true');

        // If a mole is clicked, call updateScore to increment points
        updateScore();
        playAudio(audioHit);
    }

    return points;
}

// Call setEventListeners after defining moles
setEventListeners();

function resetGame() {
    // Reset the data-whacked attribute for all moles
    moles.forEach(mole => mole.setAttribute('data-whacked', 'false'));
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners() {
  // Add 'click' event listeners to each mole, calling the whack function
  moles.forEach(mole => mole.addEventListener('click', whack));
  return moles;
}

// Call setEventListeners after defining moles
setEventListeners();

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

setDuration(10);

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame() {
  console.log("stopGame function called");
  clearTimeout(timeoutID); 
  clearInterval(timer);
  clearScore();
  stopAudio(song); 
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame() {
  console.log("Start button clicked");
  points = 0; // Reset points to 0
  score.textContent = points; // Update the scoreboard display
  setDuration(10);
  timerDisplay.textContent = time; // Update the timer display
  showUp();
  startTimer();
  play();
  return "game started";
}

startButton.addEventListener("click", startGame);

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
