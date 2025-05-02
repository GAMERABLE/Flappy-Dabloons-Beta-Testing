
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById('playBtn');
const intro = document.getElementById('intro');
const gameTitle = document.getElementById('gameTitle');

let bird = new Image();
bird.src = 'bird.png';

let pipeTop = new Image();
pipeTop.src = 'pipeTop.png';

let pipeBottom = new Image();
pipeBottom.src = 'pipeBottom.png';

let pipes = [{ x: 400, y: -100 }];
let birdY = 150;
let gravity = 2;
let flap = -30;
let velocity = 0;
let isGameRunning = false;

function startGame() {
    canvas.style.display = 'block';
    intro.style.display = 'none';
    isGameRunning = true;
    requestAnimationFrame(draw);
}

playBtn.onclick = startGame;

function draw() {
    if (!isGameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let pipe of pipes) {
        pipe.x -= 2;
        if (pipe.x + 50 < 0) pipe.x = 400, pipe.y = Math.random() * -150;
        ctx.drawImage(pipeTop, pipe.x, pipe.y);
        ctx.drawImage(pipeBottom, pipe.x, pipe.y + 320);
    }

    velocity += gravity;
    birdY += velocity;
    ctx.drawImage(bird, 80, birdY);

    if (birdY + bird.height > canvas.height || birdY < 0) {
        isGameRunning = false;
        alert("Game Over");
        location.reload();
    }

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', () => velocity = flap);

setTimeout(() => {
    gameTitle.style.display = 'block';
    playBtn.style.display = 'inline-block';
}, 1500);
