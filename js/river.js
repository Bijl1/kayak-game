class River {
  constructor() {
    // Define properties for the river, such as the size and color of the water and shore
    this.water = {
      w: 280,
      color1: "#136c89",
      color2: "#4892aa",
    };
    this.shore = {
      w: 10,
      color1: "#1e7707",
      color2: "#296f17",
    };
  }

  draw(width, height) {
    //Water
    // Create a linear gradient for the water from color1 to color2
    var grd = ctx.createLinearGradient(0, 0, height, this.water.w);
    grd.addColorStop(0, this.water.color1);
    grd.addColorStop(1, this.water.color2);
    // Set the fill style to the gradient and fill a rectangle for the water
    ctx.fillStyle = grd;
    ctx.fillRect(width / 2 - this.water.w / 2, 0, this.water.w, height);

    //Shore left
    // Set the fill style to color1 and fill a rectangle for the left side of the shore
    ctx.fillStyle = this.shore.color1;
    ctx.fillRect(0, 0, width / 2 - this.water.w / 2 - this.shore.w, height);
    // Set the fill style to color2 and fill a rectangle for the right side of the shore
    ctx.fillStyle = this.shore.color2;
    ctx.fillRect(
      width / 2 - this.water.w / 2 - this.shore.w,
      0,
      this.shore.w,
      height
    );
    //Shore right
    // Set the fill style to color1 and fill a rectangle for the left side of the shore
    ctx.fillStyle = this.shore.color1;
    ctx.fillRect(
      width / 2 + this.water.w / 2,
      0,
      width / 2 - this.water.w / 2,
      height
    );
    // Set the fill style to color2 and fill a rectangle for the right side of the shore
    ctx.fillStyle = this.shore.color2;
    ctx.fillRect(width / 2 + this.water.w / 2, 0, this.shore.w, height);
  }
}

// Create a new instance of the River class
const river = new River();

