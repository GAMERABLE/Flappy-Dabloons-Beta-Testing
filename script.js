const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bird = { x: 80, y: 200, width: 30, height: 30, velocity: 0 };
let pipes = [];
let gameRunning = false;
let gravity = 0.5;
let score = 0;

function drawBird() {
  ctx.fillStyle = 'gold';
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.width / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = 'green';
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  });
}

function updateGame() {
  if (!gameRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.velocity += gravity;
  bird.y += bird.velocity;

  pipes.forEach(pipe => {
    pipe.x -= 4;
  });

  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 300) {
    let top = Math.random() * 200 + 50;
    let bottom = Math.random() * 200 + 50;
    pipes.push({ x: canvas.width, width: 60, top: top, bottom: bottom });
  }

  drawBird();
  drawPipes();

  // Check collision
  for (let pipe of pipes) {
    if (
      bird.x + bird.width / 2 > pipe.x &&
      bird.x - bird.width / 2 < pipe.x + pipe.width &&
      (bird.y - bird.height / 2 < pipe.top || bird.y + bird.height / 2 > canvas.height - pipe.bottom)
    ) {
      endGame();
      return;
    }
  }

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    endGame();
    return;
  }

  requestAnimationFrame(updateGame);
}

function flap() {
  if (gameRunning) bird.velocity = -8;
}

function endGame() {
  gameRunning = false;
  document.getElementById('shop').style.display = 'block';
  canvas.style.display = 'none';
}

function restartGame() {
  bird.y = 200;
  bird.velocity = 0;
  pipes = [];
  document.getElementById('shop').style.display = 'none';
  canvas.style.display = 'block';
  gameRunning = true;
  updateGame();
}

document.body.addEventListener('touchstart', flap);
document.body.addEventListener('keydown', e => {
  if (e.code === 'Space') flap();
});

// Intro Screen Logic
const intro = document.getElementById('intro');
const gameTitle = document.getElementById('gameTitle');
const playButton = document.getElementById('playButton');

setTimeout(() => {
  intro.querySelector('h1').style.display = 'none';
  gameTitle.style.display = 'block';
  playButton.style.display = 'inline-block';
}, 2000);

playButton.onclick = () => {
  intro.style.display = 'none';
  canvas.style.display = 'block';
  gameRunning = true;
  updateGame();
};