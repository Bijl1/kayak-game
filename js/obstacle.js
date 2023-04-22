class Obstacle {
    constructor(gameScreen) {
      // the game screen where the obstacle will be displayed
      this.gameScreen = gameScreen;
  
      // set the initial position, dimensions, and speed of the obstacle
      this.left = Math.floor(Math.random() * 501); // randomize position
      this.top = 5; // set initial top position
      this.width = 75; // set the width of the obstacle
      this.height = 100; // set the height of the obstacle
      this.speed = 3; // set the initial speed of the obstacle
      this.speedIncrement = 1; // set the increment of the speed of the obstacle
  
      // create an img element for the obstacle and set its attributes
      this.element = document.createElement("img");
      this.element.src = "./images/gator.png";
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      // append the obstacle to the game screen
      this.gameScreen.appendChild(this.element);
  
      // set a flag to indicate if the obstacle has passed a certain point
      this.hasPassedPoint = false;
    }
  
    // update the position of the obstacle on the game screen
    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    // move the obstacle down the game screen
    move() {
      this.top += this.speed;
      this.updatePosition();
  
      // if the obstacle has passed a certain point on the game screen,
      // increase its speed and set the flag to true
      if (this.top > 600 && !this.hasPassedPoint) {
        this.speed += this.speedIncrement; // increase speed
        this.hasPassedPoint = true; // set flag to true
      }
    }
  }
  