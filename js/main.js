document.addEventListener("keydown", keyPush); // add an event listener to the whole document to listen for keydown events, which will call the keyPush function when triggered

let control = document.getElementById("controlButton"); // get the button element with id "controlButton" and assign it to a variable called control
const canvas = document.querySelector("canvas"); // get the first canvas element on the page and assign it to a constant called canvas
const ctx = canvas.getContext("2d"); // get the 2D context of the canvas and assign it to a constant called ctx

const speed = 10; // assign a constant called speed with a value of 5

canvas.width = 350; // set the width of the canvas to 350 pixels
canvas.height = 400; // set the height of the canvas to 400 pixels

let stream = 1; // initialize a variable called stream with a value of 1
let game = false; // initialize a variable called game with a value of false
let end = false; // initialize a variable called end with a value of false
let score = 0; // initialize a variable called score with a value of 0
let level = 0; // initialize a variable called level with a value of 0
let lives = 3; // initialize a variable called lives with a value of 3

let scoreBoard = document.getElementById("score"); // get the element with id "score" and assign it to a variable called scoreBoard
let levelBoard = document.getElementById("level"); // get the element with id "level" and assign it to a variable called levelBoard
let livesBoard = document.getElementById("lives"); // get the element with id "lives" and assign it to a variable called livesBoard

scoreBoard.innerHTML = score; // set the innerHTML of the scoreBoard element to the value of score
levelBoard.innerHTML = level + 1; // set the innerHTML of the levelBoard element to the value of level plus 1
livesBoard.innerHTML = lives; // set the innerHTML of the livesBoard element to the value of lives


// control button
control.onclick = function (event) { // Add a click event listener to the "control" element
  event.preventDefault(); // Prevent the default action of clicking on a link or button
  if (game) { // If the game is currently running
    stopGame(); // Stop the game
  } else { // If the game is not running
    if (end) { // If the game has ended
      location.reload(); // Reload the page to start a new game
    } else { // If the game has not yet started
      startGame(); // Start the game
    }
  }
};

startGame = () => { // A function to start the game
  game = true; // Set the game state to "true"
  control.innerHTML = control.innerHTML.replace("start", "stop"); // Replace the text "start" on the control element with "stop"
};

stopGame = () => { // A function to stop the game
  game = false; // Set the game state to "false"
  control.innerHTML = control.innerHTML.replace("stop", "start"); // Replace the text "stop" on the control element with "start"
};

function keyPush(event) { // A function to handle key presses during the game
  if (game === true) { // If the game is currently running
    switch (event.key) { // Use a switch statement to determine which key was pressed
      case "ArrowUp": // If the up arrow key was pressed
        kayak.y -= speed; // Move the kayak up
        break; // Exit the switch statement
      case "ArrowDown": // If the down arrow key was pressed
        kayak.y += speed; // Move the kayak down
        break; // Exit the switch statement
      case "ArrowRight": // If the right arrow key was pressed
        kayak.x += speed; // Move the kayak to the right
        break; // Exit the switch statement
      case "ArrowLeft": // If the left arrow key was pressed
        kayak.x -= speed; // Move the kayak to the left
        break; // Exit the switch statement
    }
  }
}

const elemLeft = canvas.offsetLeft + canvas.clientLeft; // Get the horizontal offset of the canvas element
const elemTop = canvas.offsetTop + canvas.clientTop; // Get the vertical offset of the canvas element

// Add event listener for `click` events.
canvas.addEventListener(
  "click",
  function (event) {
    var x = event.pageX,
      y = event.pageY;
    if (game) {
      // Check if the click was within the top third of the canvas, centered horizontally
      if (
        x > elemLeft + canvas.width / 3 &&
        x < elemLeft + (canvas.width * 2) / 3 &&
        y > elemTop &&
        y < elemTop + canvas.height / 3
      ) {
        kayak.y -= speed * 2; // move the kayak upward
      }
      // Check if the click was within the bottom third of the canvas, centered horizontally
      if (
        x > elemLeft + canvas.width / 3 &&
        x < elemLeft + (canvas.width * 2) / 3 &&
        y > elemTop + (canvas.height * 2) / 3 &&
        y < elemTop + canvas.height
      ) {
        kayak.y += speed; // move the kayak downward
      }
      // Check if the click was within the left half of the canvas, centered vertically
      if (
        x > elemLeft &&
        x < elemLeft + canvas.width / 2 &&
        y > elemTop + canvas.height / 3 &&
        y < elemTop + (canvas.height * 2) / 3
      ) {
        kayak.x -= speed * 2; // move the kayak to the left
      }
      // Check if the click was within the right half of the canvas, centered vertically
      if (
        x < elemLeft + canvas.width &&
        x > elemLeft + canvas.width / 2 &&
        y > elemTop + canvas.height / 3 &&
        y < elemTop + (canvas.height * 2) / 3
      ) {
        kayak.x += speed * 2; // move the kayak to the right
      }
      // Check if the click was in the top left corner of the canvas
      if (
        x > elemLeft &&
        x < elemLeft + canvas.width / 3 &&
        y > elemTop &&
        y < elemTop + canvas.height / 3
      ) {
        kayak.y -= speed * 2; // move the kayak upward
        kayak.x -= speed * 2; // move the kayak to the left
      }
      // Check if the click was in the top right corner of the canvas
      if (
        x > elemLeft + (canvas.width * 2) / 3 &&
        x < elemLeft + canvas.width &&
        y > elemTop &&
        y < elemTop + canvas.height / 3
      ) {
        kayak.y -= speed * 2; // move the kayak upward
        kayak.x += speed * 2; // move the kayak to the right
      }
      // Check if the click was in the bottom right corner of the canvas
      if (
        x > elemLeft + (canvas.width * 2) / 3 &&
        x < elemLeft + canvas.width &&
        y > elemTop + (canvas.height * 2) / 3 &&
        y < elemTop + canvas.height
      ) {
        kayak.y += speed * 2; // move the kayak downward
        kayak.x += speed * 2; // move the kayak to the right
      }
      //Check if the click was in the bottom left corner of the canvas
      if (
        x > elemLeft && // check if the x coordinate of the mouse click is greater than the left edge of the game element
        x < elemLeft + canvas.width / 3 && // check if the x coordinate of the mouse click is less than the left edge of the game element plus one third of the canvas width
        y > elemTop + (canvas.height * 2) / 3 && // check if the y coordinate of the mouse click is greater than the top edge of the game element plus two thirds of the canvas height
        y < elemTop + canvas.height // check if the y coordinate of the mouse click is less than the top edge of the game element plus the canvas height
      ) {
        kayak.y += speed * 2; // move the kayak up by double the speed
        kayak.x -= speed * 2; // move the kayak left by double the speed
      }
    }
  },
  false
);

drawStuff = () => {
  // draw river
  river.draw(canvas.width, canvas.height); // draw the river
  //draw wins
  wins.drawWin(wins.bottle); // draw a bottle win
  wins.drawWin(wins.burger); // draw a burger win
  wins.drawWin(wins.life); // draw a life win
  // draw kayak
  kayak.draw(); // draw the kayak
  // draw logs
  log.drawLeft(canvas.width, river.water.w); // draw a log on the left side of the river
  log.drawRight(canvas.width, river.water.w); // draw a log on the right side of the river
  // draw ships
  ship.drawShip(ship.right); // draw a ship moving to the right
  ship.drawShip(ship.left); // draw a ship moving to the left
  // draw buoys
  buoy.drawBuoys(); // draw buoys in the river
};


moveStuff = () => {
  wins.moveWin(wins.bottle, 5, canvas.height, stream); // move the bottle win to the right by 5 pixels
  wins.moveWin(wins.burger, 20, canvas.height, stream); // move the burger win to the right by 20 pixels
  wins.moveWin(wins.life, 30, canvas.height, stream); // move the life win to the right by 30 pixels
  log.moveLeft(canvas.height, stream); // move the left log to the left
  log.moveRight(canvas.height, stream); // move the right log to the right
  ship.moveRightShip(canvas.height, stream); // move the ship moving to the right to the right
  ship.moveLeftShip(canvas.height, stream); // move the ship moving to the left to the left
  buoy.moveBuoy(canvas.height, stream); // move the buoys in the river
};


gameOver = () => {
  let gameover = new Image(); // create a new image object for the game over screen
  gameover.src = "./img/gameover.png"; // set the source of the image object to the game over image file
  ctx.drawImage(gameover, 0, 0); // draw the game over image on the canvas at position (0, 0)
  lives = 0; // set the number of lives to 0
  livesBoard.innerHTML = lives; // update the HTML element that displays the number of lives
  if (!end) { // if the game is not already over
    game = false; // set the game status to false (game is not running)
    end = true; // set the end status to true (game is over)
    control.innerHTML = control.innerHTML.replace("stop", "restart"); // change the text on the control button to "restart"
  }
};

changeLives = (life) => {
  if (life) { // if the argument passed in is true (a life has been gained)
    lives += 1; // add one to the number of lives
    livesBoard.innerHTML = lives; // update the HTML element that displays the number of lives
  } else { // if the argument passed in is false (a life has been lost)
    lives -= 1; // subtract one from the number of lives
    if (lives <= 0) { // if the number of lives is now zero or negative
      gameOver(); // call the gameOver function to end the game
    } else { // if there are still lives remaining
      livesBoard.innerHTML = lives; // update the HTML element that displays the number of lives
      kayak.x = 167; // reset the position of the kayak to the starting position
      kayak.y = 200;
    }
  }
};

changeLevel = () => {
  level++; // increase the level by one
  stream = stream + 0.5; // increase the speed of the river
  levelBoard.innerHTML = level + 1; // update the HTML element that displays the level
};

changeScore = (value) => {
  score = score + value; // add the given value to the current score
  scoreBoard.innerHTML = score; // update the HTML element that displays the score
  if (Math.floor(score / 10) > level) { // if the score is a multiple of 10 greater than the current level
    changeLevel(); // increase the level and river speed
  }
};

collisions = () => {

  // check if kayak is too far left
  if (kayak.x <= canvas.width / 2 - river.water.w / 2) {
    kayak.x = kayak.x + speed; // move kayak to the right
  }

  // check if kayak is too far right
  if (kayak.x + kayak.w >= canvas.width / 2 + river.water.w / 2) {
    kayak.x = kayak.x - speed; // move kayak to the left
  }

  // check if kayak is too far up
  if (kayak.y <= 0) {
    kayak.y = kayak.y + speed; // move kayak down
  }

  // check if kayak is too far down
  if (kayak.y + kayak.h >= canvas.height) {
    kayak.y = kayak.y - speed; // move kayak up
  }

  // check if kayak collides with left log
  if (
    kayak.x < log.left.x + log.w &&
    kayak.y < log.left.y + log.h &&
    kayak.y > log.left.y
  ) {
    changeLives(false); // reduce player's lives
  }

  // check if kayak collides with right log
  if (
    kayak.x + kayak.w > log.right.x &&
    kayak.y < log.right.y + log.h &&
    kayak.y > log.right.y
  ) {
    changeLives(false); // reduce player's lives
  }

  // check if kayak collides with a buoy
  if (
    (buoy.left.x + buoy.left.w >= kayak.x &&
      buoy.left.x - buoy.left.w <= kayak.x + kayak.w &&
      buoy.left.y + buoy.left.w >= kayak.y &&
      buoy.left.y - buoy.left.w <= kayak.y + kayak.h) ||
    (buoy.right.x + buoy.right.w >= kayak.x &&
      buoy.right.x - buoy.right.w <= kayak.x + kayak.w &&
      buoy.right.y + buoy.right.w >= kayak.y &&
      buoy.right.y - buoy.right.w <= kayak.y + kayak.h)
  ) {
    changeLives(false); // reduce player's lives
  }
// Check if the kayak collides with the left ship
if (
  kayak.x + kayak.w >= ship.left.x + 5 && // If the right edge of the kayak is further right than the left edge of the left ship + 5 pixels
  kayak.x <= ship.left.x + ship.left.w - 5 && // If the left edge of the kayak is further left than the right edge of the left ship - 5 pixels
  kayak.y + kayak.h > ship.left.y + 10 && // If the bottom edge of the kayak is further down than the top edge of the left ship + 10 pixels
  kayak.y <= ship.left.y + ship.left.h - 10 // If the top edge of the kayak is higher up than the bottom edge of the left ship - 10 pixels
) {
  changeLives(false); // Decrease the player's lives by 1
}

// Check if the kayak collides with the right ship
if (
  kayak.x + kayak.w >= ship.right.x + 5 && // If the right edge of the kayak is further right than the left edge of the right ship + 5 pixels
  kayak.x <= ship.right.x + ship.right.w - 5 && // If the left edge of the kayak is further left than the right edge of the right ship - 5 pixels
  kayak.y + kayak.h > ship.right.y + 10 && // If the bottom edge of the kayak is further down than the top edge of the right ship + 10 pixels
  kayak.y <= ship.right.y + ship.right.h - 10 // If the top edge of the kayak is higher up than the bottom edge of the right ship - 10 pixels
) {
  changeLives(false); // Decrease the player's lives by 1
}

// Check if the kayak collides with the bottle item
if (
  kayak.x + kayak.w >= wins.bottle.x && // If the right edge of the kayak is further right than the left edge of the bottle
  kayak.x <= wins.bottle.x + wins.bottle.w && // If the left edge of the kayak is further left than the right edge of the bottle
  kayak.y + kayak.h > wins.bottle.y && // If the bottom edge of the kayak is further down than the top edge of the bottle
  kayak.y <= wins.bottle.y + wins.bottle.h // If the top edge of the kayak is higher up than the bottom edge of the bottle
) {
  wins.changeWinPosition(wins.bottle, 5); // Move the bottle to a new random position on the screen
  changeScore(1); // Increase the player's score by 1
}
// Check if the kayak collides with the burger item
if (
  kayak.x + kayak.w >= wins.burger.x && // if the right edge of the kayak is further to the right than the left edge of the burger
  kayak.x <= wins.burger.x + wins.burger.w && // and if the left edge of the kayak is to the left of the right edge of the burger
  kayak.y + kayak.h > wins.burger.y && // and if the bottom edge of the kayak is below the top edge of the burger
  kayak.y <= wins.burger.y + wins.burger.h // and if the top edge of the kayak is above the bottom edge of the burger
) {
  wins.changeWinPosition(wins.burger, 15); // move the burger to a new random position on the screen
  changeScore(3); // increase the score by 3 points
}
  // Check if the kayak collides with the burger item
  if (
    kayak.x + kayak.w >= wins.life.x && // if the right edge of the kayak is further to the right than the left edge of the life power-up
    kayak.x <= wins.life.x + wins.life.w && // and if the left edge of the kayak is to the left of the right edge of the life power-up
    kayak.y + kayak.h > wins.life.y && // and if the bottom edge of the kayak is below the top edge of the life power-up
    kayak.y <= wins.life.y + wins.life.h // and if the top edge of the kayak is above the bottom edge of the life power-up
  ) {
    wins.changeWinPosition(wins.life, 30); // move the life power-up to a new random position on the screen
    changeLives(true); // increase the player's lives by 1
  }
};


gameLoop = () => {
  drawStuff(); // Call the drawStuff function
  if (game) { // If the game variable is true
    moveStuff(); // Call the moveStuff function
  }
  collisions(); // Call the collisions function
  requestAnimationFrame(gameLoop); // Request the next animation frame and call the gameLoop function again
};

gameLoop(); // Call the gameLoop function to start the game loop
