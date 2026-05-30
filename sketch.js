let heads = [];
let torsos = [];
let legs = [];
let feet = [];

let headSounds = [];
let torsoSounds = [];
let legSounds = [];
let feetSounds = [];

let headIndex = 0;
let torsoIndex = 0;
let legIndex = 0;
let feetIndex = 0;

let headBox = {};
let torsoBox = {};
let legBox = {};
let feetBox = {};

let started = false;

function preload() {
  soundFormats("mp3", "wav", "m4a");

  for (let i = 1; i <= 6; i++) {
    heads.push(loadImage("assets/head" + i + ".png"));
    torsos.push(loadImage("assets/torso" + i + ".png"));
    legs.push(loadImage("assets/legs" + i + ".png"));
    feet.push(loadImage("assets/feet" + i + ".png"));

    headSounds.push(loadSound("assets/headSound" + i + ".mp3"));
    torsoSounds.push(loadSound("assets/torsoSound" + i + ".mp3"));
    legSounds.push(loadSound("assets/legsSound" + i + ".mp3"));
    feetSounds.push(loadSound("assets/feetSound" + i + ".mp3"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(255);

  let centerX = width / 2;

  let totalH = height * 0.9;
  let startY = height * 0.05;

  let headH = totalH * 0.11;
  let torsoH = totalH * 0.33;
  let legH = totalH * 0.44;
  let feetH = totalH * 0.12;

  let gap = height * 0.01;

  let headY = startY + headH / 2;
  let torsoY = headY + headH / 2 + gap + torsoH / 2;
  let legY = torsoY + torsoH / 2 + gap + legH / 2;
  let feetY = legY + legH / 2 + gap + feetH / 2;

  drawPart(legs[legIndex], centerX, legY, legH, legBox);
  drawPart(torsos[torsoIndex], centerX, torsoY, torsoH, torsoBox);
  drawPart(feet[feetIndex], centerX, feetY, feetH, feetBox);
  drawPart(heads[headIndex], centerX, headY, headH, headBox);
}

function drawPart(img, x, y, targetH, box) {
  let ratio = img.width / img.height;
  let targetW = targetH * ratio;

  image(img, x, y, targetW, targetH);

  box.x = x - targetW / 2;
  box.y = y - targetH / 2;
  box.w = targetW;
  box.h = targetH;
}

function mousePressed() {
  userStartAudio();

  if (!started) {
    startAllSounds();
    started = true;
  }

  if (inside(headBox)) {
    headIndex = (headIndex + 1) % 6;
    switchSound(headSounds, headIndex);
  } else if (inside(torsoBox)) {
    torsoIndex = (torsoIndex + 1) % 6;
    switchSound(torsoSounds, torsoIndex);
  } else if (inside(legBox)) {
    legIndex = (legIndex + 1) % 6;
    switchSound(legSounds, legIndex);
  } else if (inside(feetBox)) {
    feetIndex = (feetIndex + 1) % 6;
    switchSound(feetSounds, feetIndex);
  }
}

function inside(box) {
  return (
    mouseX > box.x &&
    mouseX < box.x + box.w &&
    mouseY > box.y &&
    mouseY < box.y + box.h
  );
}

function startAllSounds() {
  headSounds[headIndex].loop();
  torsoSounds[torsoIndex].loop();
  legSounds[legIndex].loop();
  feetSounds[feetIndex].loop();
}

function switchSound(soundArray, index) {
  for (let s of soundArray) {
    if (s.isPlaying()) {
      s.stop();
    }
  }

  soundArray[index].loop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
