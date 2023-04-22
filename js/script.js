// This code block runs when the window loads
window.onload = function () {
  // Get references to the start and restart buttons in the HTML
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  // Declare a variable to hold the Game object
  let game;

  // Add a click event listener to the start button that calls the startGame function
  startButton.addEventListener("click", function () {
    startGame();
  });

  // Add a click event listener to the restart button that calls the restartGame function
  restartButton.addEventListener("click", function () {
    restartGame();
  })

  // This function reloads the page, effectively restarting the game
  function restartGame() {
    location.reload();
  }

  // This function starts the game by creating a new Game object and calling its start() method
  function startGame() {
    console.log("start game");

    game = new Game();
    game.start();
  }

  // This function handles keydown events (i.e. when a key is pressed down)
  function handleKeydown(event) {
    const key = event.key;

    // console.log("key: ", key);

    // Declare an array of possible keystrokes (i.e. arrow keys)
    const possibleKeystrokes = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];

    // If the key that was pressed is a possible keystroke, prevent its default behavior (e.g. scrolling the page)
    // and update the player's direction based on the key that was pressed
    if(possibleKeystrokes.includes(key)){
      event.preventDefault();

      switch(key){
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  }

  // Add a keydown event listener to the window that calls the handleKeydown function
  window.addEventListener("keydown", handleKeydown);
};
