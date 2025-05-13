const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let birdY = 150;
let birdVelocity = 0;
const gravity = 0.5;
const flapStrength = -8;
const birdSize = 20;
let pipes = [];
const pipeWidth = 60;
const pipeGap = 120;
let frame = 0;
let gameStarted = false;

function startGame() {
  document.getElementById('intro').classList.add('hidden');
  canvas.classList.remove('hidden');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  pipes = [];
  birdY = canvas.height / 2;
  birdVelocity = 0;
  frame = 0;
  gameStarted = true;
  animate();
}

function drawBird() {
  ctx.fillStyle = 'gold';
  ctx.beginPath();
  ctx.arc(60, birdY, birdSize, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = 'green';
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height);
  });
}

function updatePipes() {
  if (frame % 90 === 0) {
    const topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
    pipes.push({ x: canvas.width, top: topHeight });
  }
  pipes.forEach(pipe => pipe.x -= 3);
  pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
}

function checkCollision() {
  for (let pipe of pipes) {
    if (
      60 + birdSize > pipe.x &&
      60 - birdSize < pipe.x + pipeWidth &&
      (birdY - birdSize < pipe.top || birdY + birdSize > pipe.top + pipeGap)
    ) {
      gameOver();
    }
  }
  if (birdY + birdSize > canvas.height || birdY - birdSize < 0) {
    gameOver();
  }
}

function gameOver() {
  gameStarted = false;
  alert('Game Over!');
  location.reload();
}

function animate() {
  if (!gameStarted) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frame++;
  birdVelocity += gravity;
  birdY += birdVelocity;
  drawBird();
  updatePipes();
  drawPipes();
  checkCollision();
  requestAnimationFrame(animate);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && gameStarted) {
    birdVelocity = flapStrength;
  }
});

document.getElementById('playButton').addEventListener('click', startGame);

// Intro sequence
setTimeout(() => {
  document.getElementById('gameTitle').classList.remove('hidden');
  document.getElementById('playButton').classList.remove('hidden');
}, 2000);