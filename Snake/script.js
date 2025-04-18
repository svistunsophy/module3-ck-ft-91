const boardSize = 10;
const gameBoard = document.getElementById('game-board');
const cells = [];

let snake = [{ x: 0, y: 0 }];
let food = { x: 5, y: 5 };
let direction = 'right';
let speed = 800;

function initializeGameBoard() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cells.push(cell);
      gameBoard.appendChild(cell);
    }
  }
}

function render() {
  cells.forEach((cell) => cell.classList.remove('snake', 'food'));

  snake.forEach((segment) => {
    const index = segment.x + segment.y * boardSize;
    cells[index].classList.add('snake');
  });

  const foodIndex = food.x + food.y * boardSize;
  cells[foodIndex].classList.add('food');
}

function update() {
  const head = Object.assign({}, snake[0]);

  switch (direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }

  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    resetGame();
    return;
  }

  if (isCollisionWithSelf(head)) {
    resetGame();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head);
    generateFood();
  } else {
    snake.pop();
    snake.unshift(head);
  }
}

function isCollisionWithSelf(head) {
  return snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
}

function resetGame() {
  snake = [{ x: 0, y: 0 }];
  direction = 'right';
  generateFood();
  updateScore(snake.length);
}

initializeGameBoard();

function gameLoop() {
  update();
  render();
  updateScore(snake.length);
  setTimeout(gameLoop, speed);
}

document.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 37: 
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 38:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 39: 
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 40:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
});

const updateDirection = (newDir) => {
  const oppositeDirections = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left',
  };

  if (newDir === oppositeDirections[direction]) return;
  direction = newDir;
};

document.querySelectorAll('.joystick button').forEach((button) => {
  button.addEventListener('click', () => {
    const dir = button.getAttribute('data-direction');
    updateDirection(dir);
  });
});

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      updateDirection('left');
      break;
    case 38:
      updateDirection('up');
      break;
    case 39:
      updateDirection('right');
      break;
    case 40:
      updateDirection('down');
      break;
  }
});

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 82 || event.key === 'r' || event.key === 'R') {
    resetGame();
  }
});

function updateScore(score) {
  const scoreElement = document.querySelector('#scoreboard');
  scoreElement.textContent = `Очки: ${score}`;
}

document.querySelector('#speed-input').addEventListener('change', function(event) {
  speed = parseInt(event.target.value, 10);

  restartGameWithNewSpeed(speed);
});

updateScore(snake.length);
gameLoop();

