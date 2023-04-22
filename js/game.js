class Game {
    constructor(){
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("game-end");
      this.gameScore = document.getElementById("score");
      this.gameLives = document.getElementById("lives");
      this.player = new Player( // gameScreen, left, top, width, height, imgSrc
        this.gameScreen,
        200,
        500,
        50,
        100,
        "./images/kayak.png"
      );
      this.height = 600;
      this.width = 500;
      this.obstacles = [];
      this.score = 0;
      this.lives = 3;
      this.gameIsOver = false;
    }
  
    start() {
      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;
    
      // hide start screen
      this.startScreen.style.display = "none";
      // show game screen
      this.gameScreen.style.display = "block";
  
      this.gameLoop()
    }
  
    gameLoop() {
      console.log("in the game loop");
    
      if(this.gameIsOver){
        return;
      }
  
      this.update();
      window.requestAnimationFrame(() => this.gameLoop());
    }
  
    update() {
      console.log("in the update");
  
      this.player.move();
  
      for(let i = 0; i < this.obstacles.length; i++){
        const obstacle = this.obstacles[i];
  
        obstacle.move();
  
        if(obstacle.top > this.height){
          
          this.score ++;
          this.gameScore.innerText = this.score;
  
          obstacle.element.remove();
          this.obstacles.splice(0, 1);
          i--;
        } else if (this.player.didCollide(obstacle)){
          
          this.lives --;
          this.gameLives.innerText = this.lives;
  
          obstacle.element.remove();
          this.obstacles.splice(0, 1);
          i--;
        }
      }
  
      if(this.lives === 0){
        this.endGame();
      }
  
      if(Math.random() > 0.98 && this.obstacles.length < 1){
        this.obstacles.push(new Obstacle(this.gameScreen))
      }
    }
  
    endGame() {
      this.player.element.remove();
      this.obstacles.forEach(obs => obs.element.remove());
  
      this.gameIsOver = true;
  
      // hide game screen
      this.gameScreen.style.display = "none";      
      // show end ga screen
      this.gameEndScreen.style.display = "block";
    }
  }