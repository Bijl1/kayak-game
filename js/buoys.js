class Buoy {
  constructor() {
    // Initialize the left buoy object with random x and y positions, width, color, and swing speed
    this.left = {
      x: Math.random() * 50 + 100, // Random x position between 100 and 150
      y: Math.random() * 100 + 10, // Random y position between 10 and 110
      w: 4, // Width of the buoy
      color: "green", // Color of the buoy
      swing_speed: -0.2, // Speed at which the buoy swings back and forth
    };
    
    // Initialize the right buoy object with random x and y positions, width, color, and swing speed
    this.right = {
      x: Math.random() * 50 + 220, // Random x position between 220 and 270
      y: Math.random() * 100 + 10, // Random y position between 10 and 110
      w: 4, // Width of the buoy
      color: "red", // Color of the buoy
      swing_speed: 0.2, // Speed at which the buoy swings back and forth
    };
  }
  
  // Function to draw the buoys on the canvas
  drawBuoys() {
    // Draw the left buoy
    ctx.beginPath(); // Begin the path
    ctx.arc(this.left.x, this.left.y, this.left.w, 0, 2 * Math.PI); // Draw a circle at the left buoy's x and y position with a radius of w
    ctx.strokeStyle = "#666"; // Set the stroke color to dark gray
    ctx.stroke(); // Stroke the path
    ctx.fillStyle = this.left.color; // Set the fill color to the left buoy's color
    ctx.fill(); // Fill the path
    
    // Draw the right buoy
    ctx.beginPath(); // Begin the path
    ctx.arc(this.right.x, this.right.y, this.right.w, 0, 2 * Math.PI); // Draw a circle at the right buoy's x and y position with a radius of w
    ctx.strokeStyle = "#666"; // Set the stroke color to dark gray
    ctx.stroke(); // Stroke the path
    ctx.fillStyle = this.right.color; // Set the fill color to the right buoy's color
    ctx.fill(); // Fill the path
  }
  
  // Function to return a random delay for the buoy to reset its position
  buoyRandomDelay() {
    return Math.floor(Math.random() * 5) * 100; // Return a random multiple of 100 between 0 and 400
  }
  
  // Function to move the buoys based on the height of the canvas and the speed of the water stream
  moveBuoy(height, stream) {
    // left buoy
    this.left.y += stream; // Move the left buoy up or down based on the speed of the stream
    if (this.left.y + this.left.w > height) { // If the left buoy has reached the height of the canvas
      this.left.y = (this.left.w + this.buoyRandomDelay()) * -1; // Reset the position of the left buoy to the top of the canvas with a random delay
    }
    this.left.x = this.left.x + this.left.swing_speed; // Move the left buoy horizontally based on its swing speed
    if (this.left.x <= 110 || this.left.x > 115) { // If the left buoy has reached its left or right limit
      this.left.swing_speed = this.left.swing_speed * -1; // Reverse the swing direction of the left buoy
    }
    // right buoy
    this.right.y += stream; // Move the right buoy up or down based on the speed of the stream
    if (this.right.y + this.right.w > height) { // If the right buoy has reached the height of the canvas
      this.right.y = (this.right.w + this.buoyRandomDelay()) * -1; // Reset the position of the right buoy to the top of the canvas with a random delay
    }
    this.right.x = this.right.x + this.right.swing_speed; // Move the right buoy horizontally based on its swing speed
    if (this.right.x > 240 || this.right.x < 235) { // If the right buoy has reached its left or right limit
      this.right.swing_speed = this.right.swing_speed * -1; // Reverse the swing direction of the right buoy
    }
  }
}

const buoy = new Buoy();
