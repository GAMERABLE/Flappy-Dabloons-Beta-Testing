let dabloons = 50;

function buySkin(skin) {
  const prices = { gold: 20, doge: 30, troll: 25 };
  if (dabloons >= prices[skin]) {
    dabloons -= prices[skin];
    alert(`You bought the ${skin} skin!`);
    document.getElementById('dabloonCount').textContent = dabloons;
    // Later: save skin choice
  } else {
    alert("Not enough Dabloons!");
  }
}

function restartGame() {
  bird.y = 200;
  bird.velocity = 0;
  pipes = [];
  dabloons += 1; // Reward player 1 Dabloon per play
  document.getElementById('dabloonCount').textContent = dabloons;
  document.getElementById('shop').style.display = 'none';
  canvas.style.display = 'block';
  gameRunning = true;
  updateGame();
}