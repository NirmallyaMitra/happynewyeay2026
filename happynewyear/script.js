const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let stardust = [];

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Create initial stardust
  for (let i = 0; i < 100; i++) {
    stardust.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
    });
  }
}
window.addEventListener("resize", init);
init();

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      this.particles.push({
        x: x,
        y: y,
        velX: Math.cos(angle) * speed,
        velY: Math.sin(angle) * speed,
        alpha: 1,
      });
    }
  }
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Static Stardust
  stardust.forEach((s) => {
    ctx.fillStyle = `rgba(255, 215, 0, 0.3)`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    s.y -= s.speed;
    if (s.y < 0) s.y = canvas.height;
  });

  // Draw/Update Fireworks
  particles.forEach((f, fIdx) => {
    f.particles.forEach((p, pIdx) => {
      p.x += p.velX;
      p.y += p.velY;
      p.velY += 0.05; // gravity
      p.alpha -= 0.01;

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = f.color;
      ctx.fillRect(p.x, p.y, 2, 2);
    });
    if (f.particles[0].alpha <= 0) particles.splice(fIdx, 1);
  });

  if (Math.random() < 0.03) {
    const colors = ["#FFD700", "#FFFFFF", "#00E5FF", "#FF007F"];
    particles.push(
      new Firework(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.5,
        colors[Math.floor(Math.random() * colors.length)]
      )
    );
  }

  requestAnimationFrame(draw);
}

// Sparkle mouse effect
window.addEventListener("mousemove", (e) => {
  const colors = ["#FFD700", "#fff"];
  particles.push(
    new Firework(
      e.clientX,
      e.clientY,
      colors[Math.floor(Math.random() * colors.length)]
    )
  );
});

draw();
