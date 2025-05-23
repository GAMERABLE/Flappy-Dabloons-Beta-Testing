
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
resizeCanvas();

const playButton = document.getElementById('playButton');
const introText = document.getElementById('introText');
const restartButton = document.getElementById('restartButton');
const shopButton = document.getElementById('shopButton');
const shopDiv = document.getElementById('shop');
const coinsDisplay = document.getElementById('coins');
const flapSound = document.getElementById('flapSound');

let gravity = 0.6;
let flapStrength = -8;
let bird, pipes, frame, score, dabloons;
let isGameRunning = false;

function resetGame() {
  bird = { x: 80, y: canvas.height / 2, width: 40, height: 40, velocity: 0 };
  pipes = [];
  frame = 0;
  score = 0;
  isGameRunning = true;
  restartButton.style.display = "none";
  shopButton.style.display = "none";
}

function drawBird() {
  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.width / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipe.gap, pipe.width, canvas.height - pipe.top - pipe.gap);
  });
}

function update() {
  bird.velocity += gravity;
  bird.y += bird.velocity;

  if (frame % 100 === 0) {
    const topHeight = Math.random() * (canvas.height / 2);
    pipes.push({ x: canvas.width, width: 60, top: topHeight, gap: 170, scored: false });
  }

  pipes.forEach(pipe => pipe.x -= 3);
  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);

  pipes.forEach(pipe => {
    if (bird.x + bird.width / 2 > pipe.x && bird.x - bird.width / 2 < pipe.x + pipe.width &&
      (bird.y - bird.height / 2 < pipe.top || bird.y + bird.height / 2 > pipe.top + pipe.gap)) {
      gameOver();
    }
    if (!pipe.scored && pipe.x + pipe.width < bird.x) {
      score++;
      dabloons++;
      pipe.scored = true;
    }
  });

  if (bird.y > canvas.height || bird.y < 0) gameOver();
  frame++;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "26px Comic Sans MS";
  ctx.fillText("Score: " + score, 20, 40);
  ctx.fillText("Dabloons: " + dabloons, 20, 70);
}

function gameOver() {
  isGameRunning = false;
  restartButton.style.display = "block";
  shopButton.style.display = "block";
  localStorage.setItem('dabloons', dabloons);
}

function gameLoop() {
  if (!isGameRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawPipes();
  drawBird();
  drawScore();
  requestAnimationFrame(gameLoop);
}

function startGame() {
  dabloons = parseInt(localStorage.getItem('dabloons')) || 0;
  resetGame();
  gameLoop();
}

function flap() {
  if (!isGameRunning) return;
  bird.velocity = flapStrength;
  flapSound.currentTime = 0;
  flapSound.play();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function buyItem() {
  if (dabloons >= 10) {
    dabloons -= 10;
    alert("You bought a cool hat!");
    localStorage.setItem('dabloons', dabloons);
    coinsDisplay.textContent = dabloons;
  } else {
    alert("Not enough dabloons!");
  }
}

function openShop() {
  coinsDisplay.textContent = dabloons;
  shopDiv.style.display = "block";
}

function closeShop() {
  shopDiv.style.display = "none";
}

playButton.addEventListener("click", () => {
  playButton.style.display = "none";
  startGame();
});

restartButton.addEventListener("click", startGame);
shopButton.addEventListener("click", openShop);
window.addEventListener("mousedown", flap);
window.addEventListener("touchstart", flap);
window.addEventListener("resize", resizeCanvas);

setTimeout(() => {
  introText.style.opacity = 0;
  setTimeout(() => {
    introText.style.display = 'none';
    playButton.style.display = "block";
  }, 1500);
}, 2000);
