var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var kayak = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  speed: 5,
  score: 0
};

var obstacle = {
  x: Math.random() * canvas.width,
  y: 0,
  width: 50,
  height: 50,
  speed: 5
};

let isGameOver = false;
let gameOverScreen;
let gameOverScreenBeingActivated = false;
let shake = 0;

let date = new Date();
let time = date.getTime();
let secondsBetweenRockSpawns = 1;

const FPS = 60;

let scoreKeeper;

var restartButton = document.createElement("button");
restartButton.id = "restart-button";
restartButton.innerHTML = "Restart Game";
document.body.appendChild(restartButton);

restartButton.addEventListener("click", function() {
  window.location.reload();
});

function showRestartButton() {
  restartButton.style.display = "block";
}

function hideRestartButton() {
  restartButton.style.display = "none";
}

function drawKayak() {
  ctx.fillStyle = "blue";
  ctx.fillRect(kayak.x, kayak.y, kayak.width, kayak.height);
}

function drawObstacle() {
  ctx.fillStyle = "red";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function updateKayak() {
  if (kayak.x < 0) {
    kayak.x = 0;
  } else if (kayak.x > canvas.width - kayak.width) {
    kayak.x = canvas.width - kayak.width;
  }
}

function updateObstacle() {
  obstacle.y += obstacle.speed;
  if (obstacle.y > canvas.height) {
    obstacle.x = Math.random() * canvas.width;
    obstacle.y = 0;
  }
}

function checkCollision() {
  if (
    obstacle.x < kayak.x + kayak.width &&
    obstacle.x + obstacle.width > kayak.x &&
    obstacle.y < kayak.y + kayak.height &&
    obstacle.y + obstacle.height > kayak.y
  ) {
    isGameOver = true;
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + kayak.score, 10, 30);
}

function updateScore() {
  kayak.score++;
}

function gameLoop() {
  if (!isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawKayak();
    drawObstacle();
    updateKayak();
    updateObstacle();
    checkCollision();
    drawScore();
    updateScore();
    requestAnimationFrame(gameLoop);
  } else {
    if (!gameOverScreenBeingActivated) {
      gameOverScreenBeingActivated = true;
      showRestartButton();
    }
    if (shake < 20) {
      ctx.translate(Math.random() * 10 - 5, Math.random() * 10 - 5);
      shake++;
    } else {
      ctx.translate(0, 0);
      shake = 0;
    }
    if (!gameOverScreen) {
      gameOverScreen = document.createElement("div");
      gameOverScreen.id = "game-over-screen";
      gameOverScreen.innerHTML = "Game Over! Your score is: " + kayak.score;
      document.body.appendChild(gameOverScreen);
    }
  }
}

function endGame() {
  isGameOver = true;
}

gameLoop();
