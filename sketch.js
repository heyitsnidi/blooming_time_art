let bloomProgress = 0;   // 0 = seed, 1 = full bloom
let bloomSpeed = 0.003;  // adjust speed for slower/faster growth

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  background(10, 10, 20, 40); // slight fade for trailing motion

  // Bloom progresses over time but slows as it gets close to full bloom
  bloomProgress += (1 - bloomProgress) * bloomSpeed;

  translate(width / 2, height / 2);

  drawFlower(bloomProgress);
}

function drawFlower(p) {
  let petalCount = 12;
  let radius = 20 + p * 80;  // grows smoothly
  let petalLength = 10 + p * 120;

  fill(255, 150 + p * 80, 200, 200);

  for (let i = 0; i < petalCount; i++) {
    let angle = i * (360 / petalCount);

    push();
    rotate(angle);

    // Each petal
    ellipse(radius, 0, petalLength, petalLength * 0.55);

    pop();
  }

  // Center (stigma)
  fill(255, 220, 90);
  ellipse(0, 0, 20 + p * 30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
