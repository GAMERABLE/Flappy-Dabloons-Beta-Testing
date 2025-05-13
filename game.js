const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let bird, pipes = [], dabloons = 0;
let gravity = 0.3, flapStrength = -6, gameRunning = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

document.getElementById("playButton").onclick = () => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
  startGame();
};

function startGame() {
  gameRunning = true;
  bird = { x: 80, y: canvas.height / 2, vy: 0 };
  pipes = [];
  dabloons = 10;
  document.getElementById("currencyDisplay").innerText = dabloons;
  setInterval(spawnPipe, 2000);
  requestAnimationFrame(gameLoop);
}

function flap() {
  if (!gameRunning) return;
  bird.vy = flapStrength;
}
document.addEventListener("touchstart", flap);
document.addEventListener("keydown", e => {
  if (e.code === "Space") flap();
});

function spawnPipe() {
  if (!gameRunning) return;
  let gap = 150;
  let topHeight = Math.random() * (canvas.height - gap - 200);
  pipes.push({ x: canvas.width, top: topHeight, bottom: topHeight + gap });
}

function drawBird() {
  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, 20, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, 60, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, 60, canvas.height - pipe.bottom);
  });
}

function updateGame() {
  bird.vy += gravity;
  bird.y += bird.vy;

  pipes.forEach(pipe => {
    pipe.x -= 2;

    // Scoring
    if (pipe.x + 60 < bird.x && !pipe.scored) {
      dabloons += 5;
      pipe.scored = true;
      document.getElementById("currencyDisplay").innerText = dabloons;
    }

    // Collision
    if (
      bird.x + 20 > pipe.x && bird.x - 20 < pipe.x + 60 &&
      (bird.y - 20 < pipe.top || bird.y + 20 > pipe.bottom)
    ) {
      endGame();
    }
  });

  if (bird.y + 20 > canvas.height || bird.y - 20 < 0) endGame();
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  drawPipes();
}

function gameLoop() {
  if (!gameRunning) return;
  updateGame();
  drawGame();
  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameRunning = false;
  document.getElementById("shop").style.display = "block";
}

function buyItem(cost) {
  if (dabloons >= cost) {
    dabloons -= cost;
    document.getElementById("currencyDisplay").innerText = dabloons;
    alert("Purchase successful!");
  } else {
    alert("Not enough dabloons!");
  }
}

function closeShop() {
  document.getElementById("shop").style.display = "none";
  document.getElementById("intro").style.display = "block";
  document.getElementById("gameTitle").style.display = "block";
  document.getElementById("playButton").style.display = "block";
}