class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
      this.gameScreen = gameScreen;
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
      this.directionX = 50;
      this.directionY = 50;
  
      this.element = document.createElement("img");
      this.element.src = imgSrc;
  
      this.element.style.position = "absolute";
  
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      this.gameScreen.appendChild(this.element);
    }
  
    move() {
      this.left += this.directionX;
      this.top += this.directionY;
  
      // sets boundary to left hand side
      if(this.left < 30){
        this.left = 30;
      }
  
      // sets boundary to top side
      if (this.top < 10){
        this.top = 10;
      }
  
      // sets boundary to right hand side
      if(this.left + this.width > this.gameScreen.offsetWidth - 30){
        this.left = this.gameScreen.offsetWidth - this.width - 30;
      }
  
      // sets boundary to down side
      if(this.top + this.height > this.gameScreen.offsetHeight - 10){
        this.top = this.gameScreen.offsetHeight - this.height - 10;
      }    
  
      this.updatePosition();
    }
  
    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    didCollide(obstacle) {
      const playerRect = this.element.getBoundingClientRect();
      const obstacleRect = obstacle.element.getBoundingClientRect();
  
      if(
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left && 
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
      ){
        console.log("COLLISION@ 💥💥💥💥💥");
        return true
      } else {
        return false;
      }
    }
  }