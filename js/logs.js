
  class Logs {
    constructor() {
      // set the image URL for the log
      this.logImg = "./img/log.png";
      // set the width of the log
      this.w = 28;
      // set the height of the log
      this.h = 125;
      // set the starting position of the left anchor point of the log
      this.left = {
        x: 0,
        y: -50,
      };
      // set the starting position of the right anchor point of the log
      this.right = {
        x: 0,
        y: 100,
      };
      // set the spacing between the log and the anchor ropes
      this.spacing = 10;
    }
  
    // generate a random delay for the log movement
    logRandomDelay() {
      return Math.floor(Math.random() * 5) * 100;
    }
  
    // draw the log on the left side of the river
    drawLeft(width, river) {
      // create a new image object for the log
      let img = new Image();
      // set the source of the image object to the log image URL
      img.src = this.logImg;
      // draw the log on the left side of the river with the specified spacing
      ctx.drawImage(img, width / 2 - river / 2 + this.spacing, this.left.y);
      // update the x coordinate of the left anchor point of the log
      this.left.x = width / 2 - river / 2 + this.spacing;
    }
  
    // draw the log on the right side of the river
    drawRight(width, river) {
      // create a new image object for the log
      let img = new Image();
      // set the source of the image object to the log image URL
      img.src = this.logImg;
      // draw the log on the right side of the river with the specified spacing
      ctx.drawImage(
        img,
        width / 2 + river / 2 - this.w - this.spacing,
        this.right.y
      );
      // update the x coordinate of the right anchor point of the log
      this.right.x = width / 2 + river / 2 - this.w - this.spacing;
  }

  moveLeft(height, stream) {
    this.left.y += stream;
    if (this.left.y > height) {
      this.left.y = (this.h + this.logRandomDelay()) * -1;
    }
  }

  moveRight(height, stream) {
    this.right.y += stream;
    if (this.right.y > height) {
      this.right.y = (this.h + this.logRandomDelay()) * -1;
    }
  }
}

const log = new Logs();
