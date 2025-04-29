const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let birdY = canvas.height / 2;
let gravity = 0.6;
let velocity = 0;
let flapPower = -10;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    velocity += gravity;
    birdY += velocity;

    // Draw the bird
    ctx.beginPath();
    ctx.arc(100, birdY, 20, 0, Math.PI * 2);
    ctx.fillStyle = "gold";
    ctx.fill();

    requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", () => {
    velocity = flapPower;
});

gameLoop();
