const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let birdY, birdVelocity, dabloons = 0, pipes = [], gameStarted = false, gameOver = false;
const gravity = 0.6, flapStrength = -10;

document.getElementById('playButton').onclick = () => {
  document.getElementById('titleScreen').style.display = 'none';
  startGame();
};

document.addEventListener('keydown', () => {
  if (gameStarted) birdVelocity = flapStrength;
});

function startGame() {
  birdY = canvas.height / 2;
  birdVelocity = 0;
  dabloons = 0;
  pipes = [];
  gameStarted = true;
  gameOver = false;
  document.getElementById('gameOverScreen').style.display = 'none';
  gameLoop();
}

function gameLoop() {
  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird
  birdVelocity += gravity;
  birdY += birdVelocity;
  ctx.beginPath();
  ctx.arc(60, birdY, 20, 0, Math.PI * 2);
  ctx.fillStyle = 'gold';
  ctx.fill();

  // Pipes
  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 300) {
    let top = Math.random() * (canvas.height - 300);
    pipes.push({ x: canvas.width, top });
  }
  pipes.forEach(p => p.x -= 3);
  pipes = pipes.filter(p => p.x + 60 > 0);
  pipes.forEach(p => {
    ctx.fillStyle = 'green';
    ctx.fillRect(p.x, 0, 60, p.top);
    ctx.fillRect(p.x, p.top + 200, 60, canvas.height);
    if (60 + 20 > p.x && 60 - 20 < p.x + 60) {
      if (birdY - 20 < p.top || birdY + 20 > p.top + 200) {
        return endGame();
      }
    }
  });

  // Edges
  if (birdY + 20 > canvas.height || birdY - 20 < 0) return endGame();

  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameOver = true;
  dabloons += 25;
  document.getElementById('dabloonCount').textContent = dabloons;
  document.getElementById('gameOverScreen').style.display = 'block';
}

// SHOP
function buyItem() {
  if (dabloons >= 20) {
    dabloons -= 20;
    alert('You bought the item!');
  } else {
    alert('Not enough dabloons!');
  }
}
function closeShop() {
  document.getElementById('shopScreen').style.display = 'none';
}
document.getElementById('shopBtn').onclick = () => {
  document.getElementById('shopScreen').style.display = 'block';
};

// CASINO
let bet = 10;
function adjustBet(amount) {
  bet = Math.max(10, bet + amount);
  document.getElementById('betAmount').textContent = bet;
}
function spinCasino() {
  if (dabloons < bet) {
    alert('Not enough dabloons!');
    return;
  }
  dabloons -= bet;
  let r1 = Math.floor(Math.random() * 3);
  let r2 = Math.floor(Math.random() * 3);
  let r3 = Math.floor(Math.random() * 3);
  let result = `${r1} ${r2} ${r3}`;
  if (r1 === r2 && r2 === r3) {
    dabloons += bet * 3;
    result += ' -> JACKPOT!';
  } else if (r1 === r2 || r2 === r3 || r1 === r3) {
    dabloons += bet * 2;
    result += ' -> WIN';
  } else {
    result += ' -> LOSE';
  }
  document.getElementById('casinoResult').innerText = result;
  document.getElementById('dabloonCount').textContent = dabloons;
}
function closeCasino() {
  document.getElementById('casinoScreen').style.display = 'none';
}
document.getElementById('casinoBtn').onclick = () => {
  document.getElementById('casinoScreen').style.display = 'block';
};
document.getElementById('retryBtn').onclick = () => startGame();
