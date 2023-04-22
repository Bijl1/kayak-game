class Game {
    constructor(){
      // DOM elements
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("game-end");
      this.gameScore = document.getElementById("score");
      this.gameLives = document.getElementById("lives");
  
      // initialize player object
      this.player = new Player(
        this.gameScreen,
        200,
        500,
        50,
        100,
        "./images/kayak.png"
      );
  
      // game dimensions
      this.height = 600;
      this.width = 500;
  
      // game variables
      this.obstacles = [];
      this.score = 0;
      this.lives = 3;
      this.gameIsOver = false;
      this.obstacleSpeed = 1; // initial obstacle speed
      this.speedIncreaseInterval = 10000; // interval to increase obstacle speed in milliseconds
      this.lastSpeedIncreaseTime = Date.now(); // time of last speed increase
      this.playerSpeedIncrement = 1; // speed increment for player
      this.lastPlayerSpeedIncreaseTime = Date.now(); // time of last player speed increase
      this.playerSpeedIncreaseInterval = 10000; // interval to increase player speed in milliseconds
  }
  
    // start the game loop
    start() {
      // set game screen dimensions
      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;
  
      // hide start screen, show game screen
      this.startScreen.style.display = "none";
      this.gameScreen.style.display = "block";
  
      // start game loop
      this.gameLoop()
    }
  
    // main game loop
    gameLoop() {
      // exit loop if game is over
      if(this.gameIsOver){
        return;
      }
  
      // update game state and request next animation frame
      this.update();
      window.requestAnimationFrame(() => this.gameLoop());
    }
  
    // update game state
    update() {
      // check if it's time to increase obstacle speed
      const currentTime = Date.now();
      const timeSinceLastIncrease = currentTime - this.lastSpeedIncreaseTime;
      if (timeSinceLastIncrease > this.speedIncreaseInterval) {
        // increase obstacle speed by 1
        this.obstacleSpeed += 1;
        // update last speed increase time
        this.lastSpeedIncreaseTime = currentTime;
      }

      const timeSinceLastPlayerSpeedIncrease = currentTime - this.lastPlayerSpeedIncreaseTime;
    if (timeSinceLastPlayerSpeedIncrease > this.playerSpeedIncreaseInterval) {
    // increase player speed by playerSpeedIncrement
    this.player.speed += this.playerSpeedIncrement;
    // update last player speed increase time
    this.lastPlayerSpeedIncreaseTime = currentTime;
  }
  
      // update obstacle speed
      this.obstacles.forEach(obs => obs.speed = this.obstacleSpeed);
  
      // move player and obstacles, check for collisions
      this.player.move();
      for(let i = 0; i < this.obstacles.length; i++){
        const obstacle = this.obstacles[i];
  
        obstacle.move();
  
        if(obstacle.top > this.height){
          // remove obstacle and update score if it has passed the player
          this.score ++;
          this.gameScore.innerText = this.score;
  
          obstacle.element.remove();
          this.obstacles.splice(0, 1);
          i--;
        } else if (this.player.didCollide(obstacle)){
          // remove obstacle and update lives if player has collided with it
          this.lives --;
          this.gameLives.innerText = this.lives;
  
          obstacle.element.remove();
          this.obstacles.splice(0, 1);
          i--;
        }
      }
  
      // end game if player has no lives left
      if(this.lives === 0){
        this.endGame();
      }
  
      // add new obstacle with a small chance if there are no obstacles on the screen
      if(Math.random() > 0.98 && this.obstacles.length < 1){
        this.obstacles.push(new Obstacle(this.gameScreen))
      }
    }
  
    // end the game
    endGame() {
      // remove player and obstacles
      this.player.element.remove();
      this.obstacles.forEach(obs => obs.element.remove());
      
      // set gameIsOver to true
    this.gameIsOver = true;

    // hide game screen and show game end screen
    this.gameScreen.style.display = "none";      
    this.gameEndScreen.style.display = "block";
    }
}