class Ships {
  constructor() {
    this.right = {
      w: 40,                        // width of the right ship
      h: 111,                       // height of the right ship
      x: 190,                       // x-coordinate of the right ship's starting position
      y: 1000,                      // y-coordinate of the right ship's starting position
      url: "./img/shipleft.png",   // URL of the image file for the right ship
      speed: 1,                     // speed of the right ship
    };
    this.left = {
      w: 40,                        // width of the left ship
      h: 111,                       // height of the left ship
      x: 120,                       // x-coordinate of the left ship's starting position
      y: -200,                      // y-coordinate of the left ship's starting position
      url: "./img/shipleft.png",    // URL of the image file for the left ship
      speed: 1,                     // speed of the left ship
    };
  }
  
  shipRandomDelay() {
    return Math.floor(Math.random() * 8) * 100;   // generate a random delay for the ship's movement
  }
  
  drawShip(name) {
    var img = new Image();
    img.src = name.url;
    ctx.drawImage(img, name.x, name.y);           // draw the ship based on its position and URL
  }
  
  moveRightShip(height, stream) {
    this.right.y += this.right.speed; // Move the right ship down by a certain amount
    if (this.right.y > height) { // If the ship goes off the bottom of the canvas
      this.right.y = -this.right.h - this.shipRandomDelay(); // Set its position to the top with a random delay
      this.right.speed = Math.floor(Math.random() * 3) + 1; // Update its speed randomly
      this.right.x = Math.floor(Math.random() * (canvas.width - this.right.w)); // Update its starting position randomly
    }
  }
  
  moveLeftShip(height, stream) {
    this.left.y += this.left.speed; // Move the left ship down by a certain amount
    if (this.left.y > height) { // If the ship goes off the bottom of the canvas
      this.left.y = -this.left.h - this.shipRandomDelay(); // Set its position to the top with a random delay
      this.left.speed = Math.floor(Math.random() * 3) + 1; // Update its speed randomly
      this.left.x = Math.floor(Math.random() * (canvas.width - this.left.w)); // Update its starting position randomly
    }
  }
  
}

const ship = new Ships();                       // create a new instance of the Ships class

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);   // clear the canvas

  stream += 1;                                   // increase the stream counter
  drawBackground();                              // draw the game background
  drawFrog();                                     // draw the frog
  ship.moveRightShip(canvas.height, stream);     // move the right ship
  ship.moveLeftShip(canvas.height, stream);      // move the left ship
  ship.drawShip(ship.right);                     // draw the right ship
  ship.drawShip(ship.left);                      // draw the left ship

  if (frogCollision()) {                          // check for a collision with the frog
    console.log("collision detected");     
  } else {
    requestAnimationFrame(loop);
  }
}
loop();