
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let birdY = canvas.height / 2;
let birdVelocity = 0;
const gravity = 0.5;
const jump = -10;
let gameStarted = false;

document.getElementById("playButton").addEventListener("click", () => {
    document.getElementById("intro").style.display = "none";
    canvas.style.display = "block";
    gameStarted = true;
    requestAnimationFrame(gameLoop);
});

window.addEventListener("touchstart", () => {
    if (gameStarted) birdVelocity = jump;
});

window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && gameStarted) birdVelocity = jump;
});

function drawBird() {
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(60, birdY, 20, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    if (!gameStarted) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    birdVelocity += gravity;
    birdY += birdVelocity;

    drawBird();

    if (birdY > canvas.height || birdY < 0) {
        gameStarted = false;
        alert("Game Over");
        location.reload();
    } else {
        requestAnimationFrame(gameLoop);
    }
}
