document.addEventListener('DOMContentLoaded', () => {
    let gameStarted = false;

    const startButton = document.getElementById('startButton');
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

    // Set canvas to full window size
    function resizeCanvas() {
        gameCanvas.width = window.innerWidth;
        gameCanvas.height = window.innerHeight - 60; // leave space for button
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial size

    const bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, velocity: 0, lift: -15 };

    startButton.addEventListener('click', () => {
        if (!gameStarted) {
            startGame();
        }
    });

    function startGame() {
        gameStarted = true;
        startButton.style.display = 'none';
        bird.y = 150;
        bird.velocity = 0;
        gameLoop();
    }

    function gameLoop() {
        if (gameStarted) {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }
    }

    function update() {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        if (bird.y > gameCanvas.height - bird.height) {
            bird.y = gameCanvas.height - bird.height;
            bird.velocity = 0;
        }

        if (bird.y < 0) {
            bird.y = 0;
            bird.velocity = 0;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.fillStyle = '#ff0';
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameStarted) {
            bird.velocity = bird.lift;
        }
    });
});