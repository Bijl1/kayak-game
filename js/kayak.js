// This is a class definition for a Kayak object.
class Kayak {
  constructor() {
    // The kayak's width is 16 pixels and its height is 74 pixels.
    this.w = 16;
    this.h = 74;
    // The kayak's initial position is at x = 167 and y = 200.
    this.x = 167;
    this.y = 200;
  }
  // This method draws the kayak on the canvas.
  draw() {
    // Create a new Image object.
    var img = new Image();
    // Set the source of the image to the file path "./img/kayak.png".
    img.src = "./img/kayak.png";
    // Draw the image at the kayak's current position.
    ctx.drawImage(img, this.x, this.y);
  }
}

// Create a new instance of the Kayak class.
const kayak = new Kayak();
