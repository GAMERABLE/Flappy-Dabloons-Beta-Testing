const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameStarted = false;
let gameOver = false;
let birdY = canvas.height / 2;
let birdVelocity = 0;
let gravity = 0.6;
let flapStrength = -10;
let dabloons = 0;
let pipes = [];

document.getElementById('playButton').onclick = () => {
  document.querySelector('.logo').style.display = 'none';
  document.getElementById('playButton').style.display = 'none';
  startGame();
};

document.addEventListener('keydown', () => {
  if (!gameStarted) return;
  birdVelocity = flapStrength;
});

function startGame() {
  gameStarted = true;
  gameOver = false;
  birdY = canvas.height / 2;
  birdVelocity = 0;
  dabloons = 0;
  pipes = [];
  document.getElementById('gameOverScreen').style.display = 'none';
  requestAnimationFrame(gameLoop);
}

function drawBird() {
  ctx.beginPath();
  ctx.arc(60, birdY, 20, 0, Math.PI * 2);
  ctx.fillStyle = 'gold';
  ctx.fill();
}

function drawPipes() {
  pipes.forEach(pipe => {
    ctx.fillStyle = 'green';
    ctx.fillRect(pipe.x, 0, 60, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + 200, 60, canvas.height);
  });
}

function updatePipes() {
  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 300) {
    let topHeight = Math.random() * (canvas.height - 300);
    pipes.push({ x: canvas.width, top: topHeight });
  }

  pipes.forEach(pipe => pipe.x -= 2);
  pipes = pipes.filter(pipe => pipe.x + 60 > 0);
}

function detectCollisions() {
  for (const pipe of pipes) {
    if (60 + 20 > pipe.x && 60 - 20 < pipe.x + 60) {
      if (birdY - 20 < pipe.top || birdY + 20 > pipe.top + 200) {
        endGame();
      }
    }
  }
  if (birdY + 20 > canvas.height || birdY - 20 < 0) endGame();
}

function gameLoop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePipes();
  drawPipes();
  birdVelocity += gravity;
  birdY += birdVelocity;
  drawBird();
  detectCollisions();
  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameOver = true;
  document.getElementById('gameOverScreen').style.display = 'block';
}

document.getElementById('retryBtn').onclick = () => startGame();
document.getElementById('shopBtn').onclick = () => alert('Shop coming soon!');
document.getElementById('casinoBtn').onclick = () => alert('Casino coming soon!');
