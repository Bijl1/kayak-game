document.addEventListener("keydown", keyPush);
let control = document.getElementById("controlButton");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const speed = 5;
canvas.width = 350;
canvas.height = 400;
let stream = 1;
let game = false;
let end = false;
let score = 0;
let level = 0;
let lives = 3;
let scoreBoard = document.getElementById("score");
let levelBoard = document.getElementById("level");
let livesBoard = document.getElementById("lives");
scoreBoard.innerHTML = score;
levelBoard.innerHTML = level + 1;
livesBoard.innerHTML = lives;

// control button
control.onclick = function (event) {
  event.preventDefault();
  if (game) {
    stopGame();
  } else {
    if (end) {
      location.reload();
    } else {
      startGame();
    }
  }
};
startGame = () => {
  game = true;
  control.innerHTML = control.innerHTML.replace("start", "stop");
};
stopGame = () => {
  game = false;
  control.innerHTML = control.innerHTML.replace("stop", "start");
};

// kayak control
function keyPush(event) {
  if (game === true) {
    switch (event.key) {
      case "ArrowUp":
        kayak.y -= speed;
        break;
      case "ArrowDown":
        kayak.y += speed;
        break;
      case "ArrowRight":
        kayak.x += speed;
        break;
      case "ArrowLeft":
        kayak.x -= speed;
        break;
    }
  }
}

const elemLeft = canvas.offsetLeft + canvas.clientLeft,
  elemTop = canvas.offsetTop + canvas.clientTop;

// Add event listener for `click` events.
canvas.addEventListener(
  "click",
  function (event) {
    var x = event.pageX,
      y = event.pageY;
    if (game) {
      //up
      if (
        x > elemLeft + canvas.width / 3 &&
        x < elemLeft + (canvas.width * 2) / 3 &&
        y > elemTop &&
        y < elemTop + canvas.height / 3
      ) {
        kayak.y -= speed * 2;
      }
      //down
      if (
        x > elemLeft + canvas.width / 3 &&
        x < elemLeft + (canvas.width * 2) / 3 &&
        y > elemTop + (canvas.height * 2) / 3 &&
        y < elemTop + canvas.height
      ) {
        kayak.y += speed;
      }
      //left
      if (
        x > elemLeft &&
        x < elemLeft + canvas.width / 2 &&
        y > elemTop + canvas.height / 3 &&
        y < elemTop + (canvas.height * 2) / 3
      ) {
        kayak.x -= speed * 2;
      }
      //right
      if (
        x < elemLeft + canvas.width &&
        x > elemLeft + canvas.width / 2 &&
        y > elemTop + canvas.height / 3 &&
        y < elemTop + (canvas.height * 2) / 3
      ) {
        kayak.x += speed * 2;
      }
      //up - left
      if (
        x > elemLeft &&
        x < elemLeft + canvas.width / 3 &&
        y > elemTop &&
        y < elemTop + canvas.height / 3
      ) {
        kayak.y -= speed * 2;
        kayak.x -= speed * 2;
      }

      //up - right
      if (
        x > elemLeft + (canvas.width * 2) / 3 &&
        x < elemLeft + canvas.width &&
        y > elemTop &&
        y < elemTop + canvas.height / 3
      ) {
        kayak.y -= speed * 2;
        kayak.x += speed * 2;
      }

      //down - right
      if (
        x > elemLeft + (canvas.width * 2) / 3 &&
        x < elemLeft + canvas.width &&
        y > elemTop + (canvas.height * 2) / 3 &&
        y < elemTop + canvas.height
      ) {
        kayak.y += speed * 2;
        kayak.x += speed * 2;
      }
      //down - left
      if (
        x > elemLeft &&
        x < elemLeft + canvas.width / 3 &&
        y > elemTop + (canvas.height * 2) / 3 &&
        y < elemTop + canvas.height
      ) {
        kayak.y += speed * 2;
        kayak.x -= speed * 2;
      }
    }
  },
  false
);

drawStuff = () => {
  // draw river
  river.draw(canvas.width, canvas.height);
  //draw wins
  wins.drawWin(wins.bottle);
  wins.drawWin(wins.burger);
  wins.drawWin(wins.life);
  // draw kayak
  kayak.draw();
  // draw logs
  log.drawLeft(canvas.width, river.water.w);
  log.drawRight(canvas.width, river.water.w);
  // draw ships
  ship.drawShip(ship.right);
  ship.drawShip(ship.left);
  // draw buoys
  buoy.drawBuoys();
};

moveStuff = () => {
  wins.moveWin(wins.bottle, 5, canvas.height, stream);
  wins.moveWin(wins.burger, 20, canvas.height, stream);
  wins.moveWin(wins.life, 30, canvas.height, stream);
  log.moveLeft(canvas.height, stream);
  log.moveRight(canvas.height, stream);
  ship.moveRightShip(canvas.height, stream);
  ship.moveLeftShip(canvas.height, stream);
  buoy.moveBuoy(canvas.height, stream);
};

gameOver = () => {
  let gameover = new Image();
  gameover.src = "./img/gameover.png";
  ctx.drawImage(gameover, 0, 0);
  lives = 0;
  livesBoard.innerHTML = lives;
  if (!end) {
    game = false;
    end = true;
    control.innerHTML = control.innerHTML.replace("stop", "restart");
  }
};

changeLives = (life) => {
  if (life) {
    lives += 1;
    livesBoard.innerHTML = lives;
  } else {
    lives -= 1;
    if (lives <= 0) {
      gameOver();
    } else {
      livesBoard.innerHTML = lives;
      kayak.x = 167;
      kayak.y = 200;
    }
  }
};

changeLevel = () => {
  level++;
  stream = stream + 0.5;
  levelBoard.innerHTML = level + 1;
};

changeScore = (value) => {
  score = score + value;
  scoreBoard.innerHTML = score;
  if (Math.floor(score / 10) > level) {
    changeLevel();
  }
};


collisions = () => {
  //left shore
  if (kayak.x <= canvas.width / 2 - river.water.w / 2) {
    kayak.x = kayak.x + speed;
  }
  //right shore
  if (kayak.x + kayak.w >= canvas.width / 2 + river.water.w / 2) {
    kayak.x = kayak.x - speed;
  }
  //top border
  if (kayak.y <= 0) {
    kayak.y = kayak.y + speed;
  }
  //bottom border
  if (kayak.y + kayak.h >= canvas.height) {
    kayak.y = kayak.y - speed;
  }
  //left log
  if (
    kayak.x < log.left.x + log.w &&
    kayak.y < log.left.y + log.h &&
    kayak.y > log.left.y
  ) {
    changeLives(false);
  }
  //right log
  if (
    kayak.x + kayak.w > log.right.x &&
    kayak.y < log.right.y + log.h &&
    kayak.y > log.right.y
  ) {
    changeLives(false);
  }
  // bouys
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
    changeLives(false);
  }
  // left ship
  if (
    kayak.x + kayak.w >= ship.left.x + 5 &&
    kayak.x <= ship.left.x + ship.left.w - 5 &&
    kayak.y + kayak.h > ship.left.y + 10 &&
    kayak.y <= ship.left.y + ship.left.h - 10
  ) {
    changeLives(false);
  }
  // right ship
  if (
    kayak.x + kayak.w >= ship.right.x + 5 &&
    kayak.x <= ship.right.x + ship.right.w - 5 &&
    kayak.y + kayak.h > ship.right.y + 10 &&
    kayak.y <= ship.right.y + ship.right.h - 10
  ) {
    changeLives(false);
  }
  // bottle
  if (
    kayak.x + kayak.w >= wins.bottle.x &&
    kayak.x <= wins.bottle.x + wins.bottle.w &&
    kayak.y + kayak.h > wins.bottle.y &&
    kayak.y <= wins.bottle.y + wins.bottle.h
  ) {
    wins.changeWinPosition(wins.bottle, 5);
    changeScore(1);
  }
  // burger
  if (
    kayak.x + kayak.w >= wins.burger.x &&
    kayak.x <= wins.burger.x + wins.burger.w &&
    kayak.y + kayak.h > wins.burger.y &&
    kayak.y <= wins.burger.y + wins.burger.h
  ) {
    wins.changeWinPosition(wins.burger, 15);
    changeScore(3);
  }
  // burger
  if (
    kayak.x + kayak.w >= wins.life.x &&
    kayak.x <= wins.life.x + wins.life.w &&
    kayak.y + kayak.h > wins.life.y &&
    kayak.y <= wins.life.y + wins.life.h
  ) {
    wins.changeWinPosition(wins.life, 30);
    changeLives(true);
  }
};


gameLoop = () => {
  drawStuff();
  if (game) {
    moveStuff();
  }
  collisions();
  requestAnimationFrame(gameLoop);
};

gameLoop();
