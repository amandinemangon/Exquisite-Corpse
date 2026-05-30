let bgImages = [];
let headImages = [];
let torsoImages = [];
let legImages = [];
let feetImages = [];

let bgSounds = [];
let headSounds = [];
let torsoSounds = [];
let legSounds = [];
let feetSounds = [];

let bgIndex = 0;
let headIndex = 0;
let torsoIndex = 0;
let legIndex = 0;
let feetIndex = 0;

let artX = 250;
let artY = 60;
let artW = 500;
let artH = 700;

let headY = 120;
let torsoY = 260;
let legY = 420;
let feetY = 590;

let partW = 360;
let headH = 140;
let torsoH = 170;
let legH = 170;
let feetH = 110;

function preload() {
  soundFormats("mp3", "wav");

  for (let i = 1; i <= 6; i++) {
    bgImages.push(loadImage("assets/background" + i + ".jpg"));
    headImages.push(loadImage("assets/head" + i + ".png"));
    torsoImages.push(loadImage("assets/torso" + i + ".png"));
    legImages.push(loadImage("assets/legs" + i + ".png"));
    feetImages.push(loadImage("assets/feet" + i + ".png"));

    bgSounds.push(loadSound("assets/backgroundSound" + i + ".mp3"));
    headSounds.push(loadSound("assets/headSound" + i + ".mp3"));
    torsoSounds.push(loadSound("assets/torsoSound" + i + ".mp3"));
    legSounds.push(loadSound("assets/legsSound" + i + ".mp3"));
    feetSounds.push(loadSound("assets/feetSound" + i + ".mp3"));
  }
}

function setup() {
  createCanvas(1000, 820);
  imageMode(CENTER);
  textFont("Helvetica");
}

function draw() {
  background(0);

  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("CLICK EACH BODY PART TO CHANGE IMAGE AND SOUND", 40, 40);

  drawBackgroundLayer();
  drawBody();
}

function drawBackgroundLayer() {
  imageMode(CORNER);

  let border = 40;

  image(
    bgImages[bgIndex],
    artX + border,
    artY + border,
    artW - border * 2,
    artH - border * 2
  );

  noFill();
  stroke(0);
  strokeWeight(border);
  rect(artX, artY, artW, artH);

  noStroke();
}

function drawBody() {
  imageMode(CENTER);

  let centerX = artX + artW / 2;

  drawImageSameHeight(headImages[headIndex], centerX, headY + headH / 2, headH);
  drawImageSameHeight(torsoImages[torsoIndex], centerX, torsoY + torsoH / 2, torsoH);
  drawImageSameHeight(legImages[legIndex], centerX, legY + legH / 2, legH);
  drawImageSameHeight(feetImages[feetIndex], centerX, feetY + feetH / 2, feetH);
}

function drawImageSameHeight(img, x, y, targetH) {
  let ratio = img.width / img.height;
  let targetW = targetH * ratio;
  image(img, x, y, targetW, targetH);
}

function mousePressed() {
  userStartAudio();

  let centerX = artX + artW / 2;
  let leftX = centerX - partW / 2;
  let rightX = centerX + partW / 2;

  if (mouseX > artX && mouseX < artX + artW && mouseY > artY && mouseY < artY + 60) {
    bgIndex = nextIndex(bgIndex);
    switchSound(bgSounds, bgIndex);
  }

  if (mouseX > leftX && mouseX < rightX && mouseY > headY && mouseY < headY + headH) {
    headIndex = nextIndex(headIndex);
    switchSound(headSounds, headIndex);
  }

  if (mouseX > leftX && mouseX < rightX && mouseY > torsoY && mouseY < torsoY + torsoH) {
    torsoIndex = nextIndex(torsoIndex);
    switchSound(torsoSounds, torsoIndex);
  }

  if (mouseX > leftX && mouseX < rightX && mouseY > legY && mouseY < legY + legH) {
    legIndex = nextIndex(legIndex);
    switchSound(legSounds, legIndex);
  }

  if (mouseX > leftX && mouseX < rightX && mouseY > feetY && mouseY < feetY + feetH) {
    feetIndex = nextIndex(feetIndex);
    switchSound(feetSounds, feetIndex);
  }
}

function nextIndex(currentIndex) {
  return (currentIndex + 1) % 6;
}

function switchSound(soundArray, currentIndex) {
  for (let i = 0; i < soundArray.length; i++) {
    if (soundArray[i].isPlaying()) {
      soundArray[i].stop();
    }
  }

  soundArray[currentIndex].loop();
}