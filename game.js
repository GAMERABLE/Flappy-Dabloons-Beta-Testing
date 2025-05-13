let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bird = {
    x: 80,
    y: canvas.height / 2,
    width: 40,
    height: 40,
    velocity: 0,
    gravity: 0.5,
    lift: -9
};

let pipes = [];
let pipeGap = 160;
let pipeWidth = 60;
let pipeSpeed = 3;
let frame = 0;
let score = 0;
let dabloons = 0;
let gameOver = false;
let gameStarted = false;

function resetGame() {
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes = [];
    frame = 0;
    score = 0;
    dabloons = 0;
    gameOver = false;
}

function createPipe() {
    let topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
    pipes.push({
        x: canvas.width,
        top: topHeight,
        bottom: topHeight + pipeGap
    });
}

function drawBird() {
    ctx.fillStyle = 'gold';
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.width / 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawPipes() {
    ctx.fillStyle = 'green';
    for (let pipe of pipes) {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Dabloons: ${dabloons}`, 20, 40);
}

function update() {
    if (!gameStarted) return;

    if (gameOver) return;

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (frame % 90 === 0) {
        createPipe();
    }

    pipes.forEach((pipe, index) => {
        pipe.x -= pipeSpeed;

        // Collision detection
        if (
            bird.x + bird.width / 2 > pipe.x &&
            bird.x - bird.width / 2 < pipe.x + pipeWidth &&
            (bird.y - bird.height / 2 < pipe.top || bird.y + bird.height / 2 > pipe.bottom)
        ) {
            gameOver = true;
        }

        if (pipe.x + pipeWidth < 0) {
            pipes.splice(index, 1);
            score++;
            dabloons += 5;
        }
    });

    if (bird.y + bird.height / 2 > canvas.height || bird.y < 0) {
        gameOver = true;
    }

    frame++;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();
    drawScore();

    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '40px Comic Sans MS';
        ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
        ctx.font = '20px Comic Sans MS';
        ctx.fillText('Tap to try again', canvas.width / 2 - 70, canvas.height / 2 + 40);
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (!gameStarted) gameStarted = true;
        if (!gameOver) bird.velocity = bird.lift;
        else resetGame();
    }
});

canvas.addEventListener('click', () => {
    if (!gameStarted) gameStarted = true;
    if (!gameOver) bird.velocity = bird.lift;
    else resetGame();
});

gameLoop();