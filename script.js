const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 200, width: 20, height: 20, velocity: 0 };
let pipes = [];
let gravity = 0.5;
let gameRunning = false;
let dabloons = 50;

function drawBird() {
  ctx.fillStyle = "gold";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  for (let pipe of pipes) {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  }
}

function updateGame() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bird.velocity += gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    endGame();
    return;
  }

  for (let pipe of pipes) {
    pipe.x -= 2;
    if (bird.x < pipe.x + pipe.width &&
        bird.x + bird.width > pipe.x &&
        (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)) {
      endGame();
      return;
    }
  }

  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
    pipes.push({
      x: canvas.width,
      width: 50,
      top: Math.random() * 200 + 50,
      bottom: Math.random() * 200 + 50
    });
  }

  drawPipes();
  drawBird();
  requestAnimationFrame(updateGame);
}

function flap() {
  if (gameRunning) bird.velocity = -8;
}

document.addEventListener("keydown", flap);
document.addEventListener("touchstart", flap);

function startGame() {
  document.getElementById("intro").style.display = "none";
  canvas.style.display = "block";
  bird.y = 200;
  bird.velocity = 0;
  pipes = [];
  gameRunning = true;
  updateGame();
}

function endGame() {
  gameRunning = false;
  canvas.style.display = "none";
  document.getElementById("shop").style.display = "block";
  document.getElementById("dabloonCount").textContent = dabloons;
}

function buySkin(skin) {
  const prices = { gold: 20, doge: 30 };
  if (dabloons >= prices[skin]) {
    dabloons -= prices[skin];
    alert(`You bought the ${skin} skin!`);
    document.getElementById('dabloonCount').textContent = dabloons;
  } else {
    alert("Not enough Dabloons!");
  }
}

function restartGame() {
  document.getElementById("shop").style.display = "none";
  canvas.style.display = "block";
  bird.y = 200;
  bird.velocity = 0;
  pipes = [];
  gameRunning = true;
  updateGame();
}