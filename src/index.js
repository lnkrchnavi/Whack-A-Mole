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
let moleWhacked = false;

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
  const index = randomInteger(0,8);
  const hole = holes[index];
  if (hole === lastHole){
    return chooseHole(holes);
  }else{
    lastHole = hole;
  }
  return hole;
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
    stopGame();
    stopAudio(song);
    return "game stopped";
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
  moleWhacked = false;
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
let timeoutId;

function showAndHide(hole, delay){
  toggleVisibility(hole);

  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
    moleWhacked = false;
  }, 1000); 

  setTimeout(() => {
    moleWhacked = false; // Reset the flag after a delay
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
  return time;
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {

 return setInterval(updateTimer, 1000);
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
  // Check if the mole has already been whacked in the current round
  if (!moleWhacked) {
    moleWhacked = true; // Set the flag to true to indicate that the mole has been whacked
    updateScore();
    playAudio(audioHit);
    setTimeout(() => {
      moleWhacked = false; // Reset the flag after a delay
    }, 1000);
  }
  return points;
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners() {
  moles.forEach(mole => mole.addEventListener('click', function(event) {
    whack(event);
    mole.removeEventListener('click', arguments.callee); // Remove the event listener after clicking
  }));
  return moles;
}

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
  moleWhacked = false; // Reset the flag
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame(){
  setDuration(15);
  showUp();
  points = 0;
  clearScore();
  startTimer();
  setEventListeners();
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
