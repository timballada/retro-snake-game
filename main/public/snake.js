//board
const tileSize = 30;
const rows = 20;
const cols = 20;
let board;
let context;
let highScore;
let saveScore;
let newScore;

//snake head
let snakeX = tileSize * 5;
let snakeY = tileSize * 5;
let snakeBody = [];
//food
let foodX;
let foodY;

let speedX = 0;
let speedY = 0;

let gameOver = false;

window.onload = function () {
  board = document.querySelector("#board");
  highScore = document.querySelector("#hs");
  saveScore = document.querySelector("#save");
  newScore = document.querySelector("#new");
  board.height = rows * tileSize;
  board.width = cols * tileSize;
  context = board.getContext("2d");
  placeFood();
  document.addEventListener("keydown", changeDirection);
  setInterval(update, 1000 / 10);
};

const update = () => {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "lime";
  context.font = "15px serif";
  context.textAlign = "center";
  context.fillText("Score: " + snakeBody.length, tileSize * 1.5, tileSize);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, tileSize, tileSize);
  if (gameOver) {
    if (snakeBody.length > highScore.textContent) {
      context.fillStyle = "green";
      context.font = "bold 48px serif";
      context.textAlign = "center";
      context.fillText("New High Score!", board.width / 2, board.height / 2.5);
    } else {
      context.fillStyle = "red";
      context.font = "bold 48px serif";
      context.textAlign = "center";
      context.fillText("Game Over", board.width / 2, board.height / 2.5);
    }
    context.fillStyle = "white";
    context.font = "25px serif";
    context.fillText('Press "R" to Restart', board.width / 2, board.height / 2);
  }
  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  context.fillStyle = "lime";
  snakeX += speedX * tileSize;
  snakeY += speedY * tileSize;
  context.fillRect(snakeX, snakeY, tileSize, tileSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], tileSize, tileSize);
  }
  //game over conditions
  if (
    snakeX < 0 ||
    snakeX >= cols * tileSize ||
    snakeY < 0 ||
    snakeY >= rows * tileSize
  ) {
    gameOver = true;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
    }
  }
};

const changeDirection = (e) => {
  if (!gameOver) {
    if (e.code == "KeyW" && speedY != 1) {
      speedX = 0;
      speedY = -1;
    } else if (e.code == "KeyS" && speedY != -1) {
      speedX = 0;
      speedY = 1;
    } else if (e.code == "KeyA" && speedX != 1) {
      speedX = -1;
      speedY = 0;
    } else if (e.code == "KeyD" && speedX != -1) {
      speedX = 1;
      speedY = 0;
    }
  } else {
    if (e.code == "KeyR") {
      if (snakeBody.length > highScore.textContent) {
        newScore.value = snakeBody.length;
        saveScore.submit();
      } else {
        gameOver = false;
        snakeX = tileSize * 5;
        snakeY = tileSize * 5;
        snakeBody = [];
        placeFood();
        speedX = 0;
        speedY = 0;
      }
    }
  }
};

const placeFood = () => {
  foodX = Math.floor(Math.random() * cols) * tileSize;
  foodY = Math.floor(Math.random() * rows) * tileSize;
};
