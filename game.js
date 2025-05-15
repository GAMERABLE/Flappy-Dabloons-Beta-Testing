const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let bird = { x: 60, y: canvas.height / 2, width: 30, height: 30, velocity: 0 };
let gravity = 0.5;
let jump = -10;
let pipes = [];
let pipeGap = 180;
let pipeWidth = 60;
let frame = 0;
let dabloons = 0;
let playing = false;

function resetGame() {
  bird.y = canvas.height / 2;
  bird.velocity = 0;
  pipes = [];
  frame = 0;
  dabloons = 0;
  document.getElementById('dabloonsCount').textContent = dabloons;
}

function drawBird() {
  ctx.fillStyle = 'gold';
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.width / 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = 'green';
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height);
  });
}

function update() {
  if (!playing) return;

  bird.velocity += gravity;
  bird.y += bird.velocity;

  // Pipe spawning
  if (frame % 100 === 0) {
    let minTop = 50;
    let maxTop = canvas.height - pipeGap - 150;
    let top = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
    pipes.push({ x: canvas.width, top, passed: false });
  }

  pipes.forEach(pipe => (pipe.x -= 3));

  // Remove off-screen pipes
  pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);

  // Collision detection
  for (let pipe of pipes) {
    if (
      bird.x + bird.width / 2 > pipe.x &&
      bird.x - bird.width / 2 < pipe.x + pipeWidth &&
      (bird.y - bird.height / 2 < pipe.top ||
        bird.y + bird.height / 2 > pipe.top + pipeGap)
    ) {
      endGame();
    }

    // Earn dabloons
    if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
      dabloons += 5;
      pipe.passed = true;
      document.getElementById('dabloonsCount').textContent = dabloons;
    }
  }

  if (
    bird.y + bird.height / 2 > canvas.height ||
    bird.y - bird.height / 2 < 0
  ) {
    endGame();
  }

  frame++;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  drawPipes();
}

function loop() {
  if (playing) {
    update();
    draw();
  }
  requestAnimationFrame(loop);
}

function flap() {
  bird.velocity = jump;
}

function startGame() {
  document.getElementById('intro').style.display = 'none';
  canvas.style.display = 'block';
  playing = true;
  resetGame();
}

function endGame() {
  playing = false;
  alert("Game Over! You earned " + dabloons + " dabloons.");
  document.getElementById('shop').classList.remove('hidden');
}

function buyItem() {
  if (dabloons >= 20) {
    dabloons -= 20;
    alert('You bought a funny hat!');
  } else {
    alert('Not enough dabloons!');
  }
  document.getElementById('dabloonsCount').textContent = dabloons;
}

function closeShop() {
  document.getElementById('shop').classList.add('hidden');
  startGame();
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') flap();
});

document.getElementById('playButton').addEventListener('click', () => {
  document.getElementById('gameTitle').style.display = 'block';
  setTimeout(() => {
    document.getElementById('gameTitle').style.display = 'none';
    startGame();
  }, 2000);
});

loop();