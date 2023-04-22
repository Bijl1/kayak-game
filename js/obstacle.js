class Obstacle {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;

      this.left = Math.floor(Math.random() * 250);
      this.top =   5;
      this.width = 75;
      this.height = 100;
      this.speed = 3;
      this.element = document.createElement("img");
      this.element.src = "./images/gator.png";
      
      this.element.style.position = "absolute";

      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;

      this.gameScreen.appendChild(this.element);
    }

    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
    
    move() {
        this.top += this.speed;
      this.updatePosition();
    }
}