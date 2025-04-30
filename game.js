window.onload = () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 20,
    height: 20,
    velocity: 0,
    gravity: 0.6,
    lift: -10
  };

  document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
      bird.velocity = bird.lift;
    }
  });

  function update() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Keep bird within screen
    if (bird.y + bird.height > canvas.height) {
      bird.y = canvas.height - bird.height;
      bird.velocity = 0;
    }
    if (bird.y < 0) {
      bird.y = 0;
      bird.velocity = 0;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff0';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  loop();
};