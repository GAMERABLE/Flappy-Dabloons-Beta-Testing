const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let birdY = canvas.height / 2;
let velocity = 0;
const gravity = 0.5;
const flapPower = -10;
const birdRadius = 20;

function drawBird() {
  ctx.beginPath();
  ctx.arc(60, birdY, birdRadius, 0, Math.PI * 2);
  ctx.fillStyle = "gold";
  ctx.fill();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  velocity += gravity;
  birdY += velocity;

  // Prevent bird from going offscreen
  if (birdY + birdRadius > canvas.height || birdY - birdRadius < 0) {
    birdY = canvas.height / 2;
    velocity = 0;
  }

  drawBird();
  requestAnimationFrame(update);
}

// Controls
window.addEventListener("keydown", () => {
  velocity = flapPower;
});
window.addEventListener("touchstart", () => {
  velocity = flapPower;
});
window.addEventListener("mousedown", () => {
  velocity = flapPower;
});

update();
