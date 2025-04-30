document.addEventListener('DOMContentLoaded', () => {
    let gameStarted = false;

    const startButton = document.getElementById('startButton');
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');
    const bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, velocity: 0, lift: -15 };
    
    // Setup gameCanvas size
    gameCanvas.width = 320;
    gameCanvas.height = 480;

    startButton.addEventListener('click', () => {
        if (!gameStarted) {
            startGame();
        }
    });

    function startGame() {
        gameStarted = true;
        startButton.style.display = 'none';  // Hide the start button
        bird.y = 150; // Reset bird position
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
        ctx.fillStyle = '#ff0'; // Bird color
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    }

    // Control bird movement with spacebar
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameStarted) {
            bird.velocity = bird.lift;
        }
    });
});