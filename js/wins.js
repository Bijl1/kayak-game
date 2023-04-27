class Wins {
  constructor() {
    // Initialize the three different win objects with their properties
    // Each object has a width, height, x position, y position, and image URL
    this.life = {
      w: 20,
      h: 20,
      x: 90,
      y: -1000,
      url: "./img/heart.png",
    };
    this.bottle = {
      w: 21,
      h: 21,
      x: 75,
      y: 300,
      url: "./img/bottle.png",
    };
    this.burger = {
      w: 20,
      h: 20,
      x: 270,
      y: -200,
      url: "./img/burger.png",
    };
  }

  // Define a function to generate a random delay for when the win object will appear on the screen
  // The input is a number that determines the range of possible delays
  winRandomDelay(number) {
    return Math.floor(Math.random() * number) * 100;
  }

  // Define a function to generate a random x position for the win object
  winRandomPosition() {
    // Choose a random number between 35 and 295 (the x bounds of the game)
    let newX = Math.floor(Math.random() * (295 - 35) + 35);

    // If the new x position is in the middle safe zone (between 155 and 195),
    // randomly move it to the left or right by 50 pixels
    if (newX > 155 && newX < 195) {
      if (Math.random() < 0.5) {
        newX = newX + 50;
      } else {
        newX = newX - 50;
      }
    }

    // If the new x position is in the left safe zone (between 73 and 110),
    // move it to the right by 37 pixels
    if (newX > 73 && newX < 110) {
      newX = newX + 37;
    }

    // If the new x position is in the right safe zone (between 240 and 277),
    // move it to the left by 37 pixels
    if (newX > 240 && newX < 277) {
      newX = newX - 37;
    }

    // Return the new x position
    return newX;
  }

  // Define a function to draw a win object on the canvas
  // The input is the name of the object (i.e., "life", "bottle", or "burger")
  drawWin(name) {
    let img = new Image();
    img.src = name.url;
    // Use the canvas context (ctx) to draw the image at the object's x and y position
    ctx.drawImage(img, name.x, name.y);
  }

  // Define a function to change the position of a win object when it goes off the bottom of the screen
  // The inputs are the win object and the delay range for the new position
  changeWinPosition(object, objectDelay) {
    // Move the object above the top of the screen by its height plus a random delay
    object.y = (object.h + this.winRandomDelay(objectDelay)) * -1;
    // Generate a new random x position for the object
    object.x = this.winRandomPosition();
  }
    // Define a function to move a win object down the screen
  // The inputs are the name of the object, the delay range for the new position, the height
  moveWin(name, delay, height, stream) {
    // Update the y position of the win object by adding the "stream" input value
    name.y += stream;
    // Check if the win object has reached the bottom of the screen
    if (name.y > height) {
      // If the object has reached the bottom, reset its position by calling the "changeWinPosition" function
      // The function takes the object and the delay range as inputs
      this.changeWinPosition(name, delay);
    }
  }
}

const wins = new Wins();
