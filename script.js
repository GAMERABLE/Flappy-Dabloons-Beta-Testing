const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const birdImg = new Image();
birdImg.src = "images/bird.png";

const pipeImg = new Image();
pipeImg.src = "images/pipe.png";

const bgImg = new Image();
bgImg.src = "images/background.png";

let birdY = 250;
let velocity = 0;
let gravity = 0.6;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(birdImg, canvas.width * 0.28, birdY, 40, 40);
  ctx.drawImage(pipeImg, canvas.width * 0.8, canvas.height * 0.6, 50, canvas.height * 0.4);
}

function update() {
  velocity += gravity;
  birdY += velocity;

  draw();
  requestAnimationFrame(update);
}

canvas.addEventListener("click", () => {
  velocity = -8;
});

birdImg.onload = () => {
  update();
};
