let canvas, ctx;
let birdY = 150, birdVY = 0, gravity = 0.5, flapPower = -8;
let isGameRunning = false;

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    setTimeout(() => {
        document.getElementById('introText').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('introText').style.display = 'none';
            document.getElementById('gameTitle').style.display = 'block';
            document.getElementById('playButton').style.display = 'inline-block';
        }, 2000);
    }, 2000);

    document.getElementById('playButton').onclick = () => {
        document.getElementById('gameTitle').style.display = 'none';
        document.getElementById('playButton').style.display = 'none';
        canvas.style.display = 'block';
        canvas.addEventListener('click', flap);
        startGameLoop();
    };
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

    if (birdY < 0 || birdY > canvas.height) {
        endGame();
        return;
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(100, birdY, 15, 0, Math.PI * 2);
    ctx.fill();
}

function endGame() {
    isGameRunning = false;
    alert("Game Over!");
    location.reload();
}