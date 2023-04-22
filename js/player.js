class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        // Set the game screen element
        this.gameScreen = gameScreen;
        // Set the initial position and dimensions of the player
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        // Set the initial movement direction of the player
        this.directionX = 50;
        this.directionY = 50;

        // Create an image element for the player
        this.element = document.createElement("img");
        this.element.src = imgSrc;

        // Set the CSS styles for the player element
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        // Append the player element to the game screen element
        this.gameScreen.appendChild(this.element);

            // initialize speed
        this.speed = 5;
        this.timeSinceLastPlayerSpeedIncrease = 0.7;
    }

    // Method to move the player element
    move() {
        // Update the position of the player element
        this.left += this.directionX;
        this.top += this.directionY;

        // Set boundaries for the player element
        if (this.left < 30) {
            this.left = 30;
        }
        if (this.top < 10) {
            this.top = 10;
        }
        if (this.left + this.width > this.gameScreen.offsetWidth - 10) {
            this.left = this.gameScreen.offsetWidth - this.width - 10;
        }
        if (this.top + this.height > this.gameScreen.offsetHeight - 10) {
            this.top = this.gameScreen.offsetHeight - this.height - 10;
        }
// adding comment to try the pusj
        // Update the position of the player element
        this.updatePosition();
    }

    // Method to update the CSS position of the player element
    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    // Method to detect collisions with an obstacle element
    didCollide(obstacle) {
        // Get the bounding rectangles for the player and obstacle elements
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        // Check if the player and obstacle rectangles overlap
        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        ) {
            console.log("COLLISION@ 💥💥💥💥💥");
            return true;
        } else {
            return false;
        }
    }
}
