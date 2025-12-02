let video;
let prevFrame;
let motionAmount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // Start camera
  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();
}

function draw() {
  background(0);

  // Read video frames
  video.loadPixels();

  if (prevFrame) {
    motionAmount = calculateMotion(video.pixels, prevFrame);
  }

  prevFrame = video.pixels.slice();

  // Map motion to bloom level
  let bloom = map(motionAmount, 0, 50000, 20, width / 2);
  bloom = constrain(bloom, 20, width / 2);

  // Draw the blooming flower
  drawFlower(width / 2, height / 2, bloom);
}

// --- MOTION DETECTION FUNCTION ---
function calculateMotion(current, previous) {
  let motion = 0;

  for (let i = 0; i < current.length; i += 4) {
    let r1 = current[i], g1 = current[i+1], b1 = current[i+2];
    let r2 = previous[i], g2 = previous[i+1], b2 = previous[i+2];

    motion += abs(r1 - r2) + abs(g1 - g2) + abs(b1 - b2);
  }

  return motion;
}

// --- DRAW FLOWER ---
function drawFlower(x, y, size) {
  push();
  translate(x, y);

  let petals = 10;
  let petalLength = size;
  let petalWidth = size / 3;

  for (let i = 0; i < petals; i++) {
    rotate(360 / petals);

    let c = color(
      map(size, 20, width/2, 150, 255),
      map(size, 20, width/2, 80, 160),
      map(size, 20, width/2, 200, 255)
    );

    fill(c);
    noStroke();

    ellipse(petalLength / 2, 0, petalLength, petalWidth);
  }

  // center
  fill(255, 200, 0);
  ellipse(0, 0, size / 3);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
