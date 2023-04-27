class Ships {
  constructor() {
    this.right = {
      w: 40,                        // width of the right ship
      h: 111,                       // height of the right ship
      x: 190,                       // x-coordinate of the right ship's starting position
      y: 1000,                      // y-coordinate of the right ship's starting position
      url: "./img/shipright.png",   // URL of the image file for the right ship
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
    this.right.y -= stream + this.right.speed;    // move the right ship up by a certain amount
    if (this.right.y + this.right.h < 0) {        // if the ship goes off the top of the canvas
      this.right.y = height + this.shipRandomDelay();  // set its position to the bottom with a random delay
      this.right.speed = Math.floor(Math.random() * 3) + 1; // update its speed randomly
      this.right.x = Math.floor(Math.random() * (canvas.width - this.right.w)); // update its starting position randomly
    }
  }
  
  moveLeftShip(height, stream) {
    this.left.y += stream + this.left.speed;     // move the left ship down by a certain amount
    if (this.left.y > height) {                  // if the ship goes off the bottom of the canvas
      this.left.y = (this.left.h + this.shipRandomDelay()) * -1;  // set its position to the top with a random delay
      this.left.speed = Math.floor(Math.random() * 3) + 1; // update its speed randomly
      this.left.x = Math.floor(Math.random() * (canvas.width - this.left.w)); // update its starting position randomly
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