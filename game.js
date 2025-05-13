let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let birdY = 250;
let velocity = 0;
let gravity = 0.4;
let flapPower = -7;
let dabloons = 0;
let playing = false;

function flap() {
  velocity = flapPower;
}

function updateGame() {
  if (!playing) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  velocity += gravity;
  birdY += velocity;

  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.arc(100, birdY, 20, 0, Math.PI * 2);
  ctx.fill();

  // Check if out of bounds
  if (birdY > canvas.height || birdY < 0) {
    gameOver();
  }

  requestAnimationFrame(updateGame);
}

function gameOver() {
  playing = false;
  alert("Game Over! You earned " + dabloons + " dabloons!");
  document.getElementById("menu").style.display = "block";
  canvas.style.display = "none";
}

function startGame() {
  birdY = 250;
  velocity = 0;
  dabloons += 10;
  updateDabloons();
  playing = true;
  canvas.style.display = "block";
  document.getElementById("menu").style.display = "none";
  updateGame();
}

function showShop() {
  document.getElementById("shop").style.display = "block";
}

function closeShop() {
  document.getElementById("shop").style.display = "none";
}

function buyItem() {
  if (dabloons >= 100) {
    alert("You bought Golden Wings!");
    dabloons -= 100;
    updateDabloons();
  } else {
    alert("Not enough dabloons!");
  }
}

function updateDabloons() {
  document.getElementById("dabloons").textContent = dabloons;
}

setTimeout(() => {
  document.getElementById("intro").style.display = "none";
  document.getElementById("menu").style.display = "block";
}, 3000);

document.getElementById("playBtn").onclick = startGame;
document.getElementById("shopBtn").onclick = showShop;
window.addEventListener("touchstart", flap);
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") flap();
});