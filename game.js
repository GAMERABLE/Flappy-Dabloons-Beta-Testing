
let canvas, ctx;
let birdY = 150, birdVY = 0, gravity = 0.5, flapPower = -8;
let isGameRunning = false;

window.onload = () => {
    document.body.innerHTML = '<canvas id="gameCanvas" width="400" height="600"></canvas>';
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    canvas.addEventListener('click', flap);
    startGameLoop();
};

function startGameLoop() {
    isGameRunning = true;
    requestAnimationFrame(update);
}

function flap() {
    birdVY = flapPower;
}

function update() {
    if (!isGameRunning) return;

    birdVY += gravity;
    birdY += birdVY;

    // Check boundaries
    if (birdY < 0 || birdY > canvas.height) {
        endGame();
        return;
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFD700'; // golden bird
    ctx.beginPath();
    ctx.arc(100, birdY, 15, 0, Math.PI * 2);
    ctx.fill();
}

function endGame() {
    isGameRunning = false;
    alert("Game Over!");
    location.reload();
}
