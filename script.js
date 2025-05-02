let canvas, ctx;
let bird, pipes = [], gravity = 0.5, lift = -10, pipeSpeed = 2;
let score = 0, gameOver = false;

function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  canvas = document.getElementById("gameCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");
  canvas.style.display = "block";

  bird = {
    x: 80,
    y: canvas.height / 2,
    radius: 20,
    velocity: 0
  };

  pipes = [];
  score = 0;
  gameOver = false;

  for (let i = 0; i < 3; i++) {
    addPipe(i * 300 + 400);
  }

  window.addEventListener("touchstart", flap);
  window.addEventListener("keydown", e => { if (e.code === "Space") flap(); });

  loop();
}

function flap() {
  if (!gameOver) bird.velocity = lift;
}

function addPipe(x) {
  let gap = 200;
  let topHeight = Math.random() * (canvas.height - gap - 100) + 50;
  pipes.push({ x, top: topHeight, bottom: topHeight + gap });
}

function loop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird physics
  bird.velocity += gravity;
  bird.y += bird.velocity;

  // Draw bird
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
  ctx.fillStyle = "gold";
  ctx.fill();

  // Draw and move pipes
  for (let i = 0; i < pipes.length; i++) {
    let p = pipes[i];
    p.x -= pipeSpeed;

    ctx.fillStyle = "green";
    ctx.fillRect(p.x, 0, 60, p.top);
    ctx.fillRect(p.x, p.bottom, 60, canvas.height - p.bottom);

    // Collision
    if (
      bird.x + bird.radius > p.x &&
      bird.x - bird.radius < p.x + 60 &&
      (bird.y - bird.radius < p.top || bird.y + bird.radius > p.bottom)
    ) {
      endGame();
      return;
    }

    // Score
    if (p.x + 60 < bird.x && !p.scored) {
      score += 5;
      p.scored = true;
    }

    // Recycle pipes
    if (p.x < -60) {
      pipes.splice(i, 1);
      addPipe(canvas.width);
    }
  }

  // Bird hits top/bottom
  if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
    endGame();
    return;
  }

  // Score
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Dabloons: ${score}`, 20, 40);

  requestAnimationFrame(loop);
}

function endGame() {
  gameOver = true;
  canvas.style.display = "none";
  document.getElementById("shop").classList.remove("hidden");
  document.getElementById("scoreDisplay").textContent = score;
}

function restartGame() {
  document.getElementById("shop").classList.add("hidden");
  startGame();
}