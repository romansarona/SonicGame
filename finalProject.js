let sonic;
let background1;
let background2;
let background3;
let rings;
let buzzer;
let motobug;
let sonicrunning;
let sonicdancing;
let sonicThumbsUp;
let eggDrone;
let deathCount = 0;

let sonicring;
let victoryScreenMusic;
let greenHillMusic;
let chemicalPlantMusic;
let finalBossMusic;


let buzzerxSpeed = [];
let buzzerySpeed = [];
let buzzerX = [];
let buzzerY = [];

let motobugxSpeed = [];
let motobugySpeed = [];
let motobugX = [];
let motobugY = [];

let eggDronexSpeed = [];
let eggDroneySpeed = [];
let eggDroneX = [];
let eggDroneY = [];

let customFont;

let x = [];
let y = [];

let score = 0;
let sonicX;
let sonicY;

let homeScreenBool = true;
let easyGameBool = false;
let mediumGameBool = false;
let hardGameBool = false;
let easywinScreenBool = false;
let mediumwinScreenBool = false;
let hardwinScreenBool = false;
let instructionBool = false;
let deathScreenBool = false;

let victoryScreenMusicBool = false;

let i = [];

/**
 * Loads all images, sounds, and fonts before the game starts.
 */
function preload() {
  sonic = loadImage("sonic.png");
  background1 = loadImage("background1.png");
  rings = loadImage("sonicRing.gif");
  buzzer = loadImage("buzzer.png");
  background2 = loadImage("background2.png");
  background3 = loadImage("background3.png");
  motobug = loadImage("motobug.png");
  eggDrone = loadImage("eggDrone.png");
  customFont = loadFont("gamefont.ttf");
  sonicrunning = loadImage("sonicRunning.gif");
  sonicdancing = loadImage("sonicDancing.gif");
  sonicThumbsUp = loadImage("sonicThumbsUp.png");
  sonicring = loadSound("sonicRing.mp3");
  greenHillMusic = loadSound("greenHillZone.mp3");
  chemicalPlantMusic = loadSound("chemicalPlant.mp3");
  victoryScreenMusic = loadSound("victorySound.mp3");
  finalBossMusic = loadSound("finalBoss.mp3");

}

/**
 * Initializes the game window and spawns rings and enemies.
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
 

  for (let i = 0; i < 10; i++) {
    x.push(random(20, windowWidth - 20));

    y.push(random(60, windowHeight - 30));
  }

  for (let i = 0; i < 5; i++) {
    buzzerX.push(random(windowWidth));
    buzzerY.push(random(windowHeight));
    buzzerxSpeed.push(3);
    buzzerySpeed.push(3);
  }

  for (let i = 0; i < 7; i++) {
    motobugX.push(random(windowWidth));
    motobugY.push(random(windowHeight));
    motobugxSpeed.push(5);
    motobugySpeed.push(5);
  }

  for (let i = 0; i < 8; i++) {
    eggDroneX.push(random(windowWidth));
    eggDroneY.push(random(windowHeight));
    eggDronexSpeed.push(7);
    eggDroneySpeed.push(7);
  }

  sonicX = windowWidth / 2;
  sonicY = windowHeight / 2;


}

/**
 * Runs the main game loop and displays the appropriate game screen
 * based on the current game state.
 */
function draw() {
  if (easyGameBool == true) {
    easyGame();
    if(!greenHillMusic.isPlaying()){
      greenHillMusic.setVolume(.2);
      greenHillMusic.play();
    }
  }

  if (mediumGameBool == true) {
    mediumGame();
    if(!chemicalPlantMusic.isPlaying()){
      chemicalPlantMusic.setVolume(.2);
      chemicalPlantMusic.play();
    }
  }

  if (hardGameBool == true) {
    hardGame();
    if(!finalBossMusic.isPlaying()){
      finalBossMusic.setVolume(.2);
      finalBossMusic.play();
      finalBossMusic.jump(15);
    }
  }

  if (easywinScreenBool == true) {
    easywinScreen();
   if(victoryScreenMusicBool===false){
    victoryScreenMusic.setVolume(.3);
      victoryScreenMusic.play();
      victoryScreenMusicBool = true;
    }
  }
  if (mediumwinScreenBool == true) {
    mediumwinScreen();
    if(victoryScreenMusicBool===false){
      victoryScreenMusic.setVolume(.3);
      victoryScreenMusic.play();
      victoryScreenMusicBool = true;
    }
  }

  if (hardwinScreenBool == true) {
    hardwinScreen();
    if(victoryScreenMusicBool === false){
      victoryScreenMusic.setVolume(.3);
      victoryScreenMusic.play();
      victoryScreenMusicBool = true;
    }
  }

  if (homeScreenBool == true) {
    homeScreen();
  }
  if (instructionBool == true) {
    instructionscreen();
  }
}

/**
 * Displays the game's home screen and menu options.
 */
function homeScreen() {
  textAlign(LEFT, BASELINE);
  background(0);
  fill(250);
  textFont(customFont);
  textSize(50);
  text("Ring Conqueror", windowWidth / 2.7, windowHeight / 6);
  textSize(23);
  text("Press E to play Easy Mode", windowWidth / 2.5, windowHeight / 3);
  text("Press M to play Medium Mode", windowWidth / 2.5, windowHeight / 2);
  text("Press H to play Hard Mode", windowWidth / 2.5, windowHeight / 1.5);
  text("Press I for Instructions", windowWidth / 2.5, windowHeight / 1.2);
}

/**
 * Handles keyboard input for navigating menus and changing game states.
 */
function keyPressed() {
  if (homeScreenBool) {
    if (key === "e" || key === "E") {
      easyGameBool = true;
      homeScreenBool = false;
    }

    if (key === "m" || key === "M") {
      mediumGameBool = true;
      homeScreenBool = false;
    }

    if (key === "h" || key === "H") {
      hardGameBool = true;
      homeScreenBool = false;
    }

    if (key === "i" || key === "I") {
      instructionBool = true;
      homeScreenBool = false;
    }
  }

  if (easywinScreenBool) {
    if (key === "q" || key === "Q") {
      victoryScreenMusic.stop();
      victoryScreenMusicBool = false;
      homeScreenBool = true;
      easywinScreenBool = false;
      deathCounter = 0;
      resetRings();
    }
    if (key == "n" || key === "N") {
      victoryScreenMusic.stop();
      victoryScreenMusicBool = false;
      deathCount = 0;
      resetRings();
      mediumGameBool = true;
      easywinScreenBool = false;
    }
  }

  if (mediumwinScreenBool) {
    if (key === "q" || key === "Q") {
      victoryScreenMusic.stop();
      victoryScreenMusicBool = false;
      deathCount = 0;
      homeScreenBool = true;
      mediumwinScreenBool = false;
      resetRings();
    }
    if (key == "n" || key === "N") {
      victoryScreenMusic.stop();
      victoryScreenMusicBool = false;
      deathCount = 0;
      resetRings();
      hardGameBool = true;
      mediumwinScreenBool = false;
    }
  }

  if (hardwinScreenBool) {
    if (key === "q" || key === "Q") {
      victoryScreenMusic.stop();
      victoryScreenMusicBool = false;
      deathCount = 0;
      homeScreenBool = true;
      hardwinScreenBool = false;
      resetRings();
    }
  }

  if (instructionBool == true && (key === "l" || key === "L")) {
    homeScreenBool = true;
    instructionBool = false;
  }

  if (homeScreenBool) {
    if (key === "o") {
      easywinScreenBool = true;
      homeScreenBool = false;
    }
    if(key === "n"){
      mediumwinScreenBool = true;
      homeScreenBool = false;
    }
    if(key === "k"){
      hardwinScreenBool = true;
      homeScreenBool = false;
    }
  }
}

/**
 * Displays the instructions screen and explains how to play the game.
 */
function instructionscreen() {
  background(0);
  fill(250);
  
  let maxWidth = windowWidth * 0.8;
  let maxHeight = 200;
  let textX = windowWidth * 0.1; 
  
  textAlign(CENTER, TOP);


  textSize(45);
  text("How To Play", 0, windowHeight * 0.08, windowWidth);
  
  textSize(26);
  
  text(
    "Use the arrow keys to move Sonic.",
    textX,
    windowHeight * 0.28,
    maxWidth,
    maxHeight
  );
  
  text(
    "Collect all the rings in each level to win.",
    textX,
    windowHeight * 0.40,
    maxWidth,
    maxHeight
  );
  
  text(
    "You only have one life, so avoid enemies or you'll lose.",
    textX,
    windowHeight * 0.52,
    maxWidth,
    maxHeight
  );
  
  text(
    "Have fun!",
    textX,
    windowHeight * 0.68,
    maxWidth,
    maxHeight
  );
  
  textSize(22);
  fill(180); 
  text(
    "Press L to return back to home screen",
    textX,
    windowHeight * 0.82,
    maxWidth,
    maxHeight
  );
}

/**
 * Resets all ring locations and sets the player's score back to zero.
 */
function resetRings() {
  x = []; 
  y = []; 
  score = 0;


  for (let i = 0; i < 10; i++) {
    x.push(random(20, windowWidth - 20));

    y.push(random(60, windowHeight - 30));
  }
}

/**
 * Resets the game after the player dies by repositioning the player,
 * respawning enemies and rings, and updating the death counter.
 */
function resetGame() {
  deathCount++;
  sonicX = windowWidth / 2;
  sonicY = windowHeight / 2;

  buzzerX = [];
  buzzerY = [];
  buzzerxSpeed = [];
  buzzerySpeed = [];
  motobugX = [];
  motobugY = [];
  motobugxSpeed = [];
  motobugySpeed = [];
  eggDroneX = [];
  eggDroneY = [];
  eggDronexSpeed = [];
  eggDroneySpeed = [];

  x = [];
  y = [];

  for (let i = 0; i < 5; i++) {
    buzzerX.push(random(windowWidth));
    buzzerY.push(random(windowHeight));
    buzzerxSpeed.push(3);
    buzzerySpeed.push(3);
  }
  for (let i = 0; i < 7; i++) {
    motobugX.push(random(windowWidth));
    motobugY.push(random(windowHeight));
    motobugxSpeed.push(5);
    motobugySpeed.push(5);
  }

  for (let i = 0; i < 8; i++) {
    eggDroneX.push(random(windowWidth));
    eggDroneY.push(random(windowHeight));
    eggDronexSpeed.push(7);
    eggDroneySpeed.push(7);
  }

  for (let i = 0; i < 10; i++) {
    x.push(random(20, windowWidth - 20));
    y.push(random(60, windowHeight - 30)); 
  }

  score = 0;
  
  deathScreenBool = false;
}

/**
 * Runs the easy difficulty level
 */
function easyGame() {
  
  background(background1);
  fill(0);
  textSize(40);
  fill(23, 114, 222);
  text("Score: " + score, 20, 50);
  fill(255, 50, 50);
  text(" Deaths: " + deathCount, 250, 50);

  if (score >= 10) {
    easyGameBool = false;
    easywinScreenBool = true;
    score = 0;
  }


  for (let i = 0; i < buzzerX.length; i++) {
    image(buzzer, buzzerX[i], buzzerY[i], 20, 20);

    // Update the Buzzer's position based on its current movement speed.
    buzzerX[i] = buzzerX[i] + buzzerxSpeed[i];
    buzzerY[i] = buzzerY[i] + buzzerySpeed[i];

    // if buzzer hits screen edge then reverse its direction
    if (buzzerX[i] >= windowWidth - 20) {
      buzzerX[i] = windowWidth - 20;
      buzzerxSpeed[i] = buzzerxSpeed[i] * -1;
    }

    if (buzzerX[i] <= 0) {
      buzzerX[i] = 0;
      buzzerxSpeed[i] = buzzerxSpeed[i] * -1;
    }

    if (buzzerY[i] >= windowHeight - 20) {
      buzzerY[i] = windowHeight - 20;
      buzzerySpeed[i] = buzzerySpeed[i] * -1;
    }

    
    if (buzzerY[i] <= 0) {
      buzzerY[i] = 0;
      buzzerySpeed[i] = buzzerySpeed[i] * -1;
    }

    if (dist(sonicX, sonicY, buzzerX[i], buzzerY[i]) < 30) {
      sonicX = windowWidth / 2;
      sonicY = windowHeight / 2;
      deathScreenBool = true;
      resetGame();
    }
  }

  for (let i = 0; i < x.length; i++) {
    image(rings, x[i], y[i], 20, 20);
    if (dist(sonicX, sonicY, x[i], y[i]) < 30) {
      x.splice(i, 1);
      y.splice(i, 1);
      score++;
      sonicring.setVolume(.4);
      sonicring.play();
      print(x.length);
    }
  }

  image(sonic, sonicX, sonicY, 50, 50);

  if (keyIsDown(LEFT_ARROW)) {
    sonicX -= 8;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    sonicX += 8;
  }

  if (keyIsDown(UP_ARROW)) {
    sonicY -= 8;
  }

  if (keyIsDown(DOWN_ARROW)) {
    sonicY += 8;
  }

  if (sonicX < 0) {
    sonicX = 0;
  }
  if (sonicX > windowWidth - 50) {
    sonicX = windowWidth - 50;
  }

  if (sonicY < 0) {
    sonicY = 0;
  }
  if (sonicY > windowHeight - 50) {
    sonicY = windowHeight - 50;
  }
}

/**
 * Runs the medium difficulty level
 */
function mediumGame() {
  background(background3);
  fill(0);
  textSize(40);
 textAlign(LEFT, BASELINE);
  fill(23, 114, 222);
  text("Score: " + score, 20, 50);
  fill(255, 50, 50);
  text(" Deaths: " + deathCount, 250, 50);

  if (score >=10) {
    mediumGameBool = false;
    mediumwinScreenBool = true;
    score = 0;
  }

  for (let i = 0; i < motobugX.length; i++) {
    image(motobug, motobugX[i], motobugY[i], 20, 20);

    // Update the Motobug's position based on its current movement speed.
    motobugX[i] = motobugX[i] + motobugxSpeed[i];
    motobugY[i] = motobugY[i] + motobugySpeed[i];

    // if motobug his screen edge then reverse its direction
    if (motobugX[i] >= windowWidth - 20) {
      motobugX[i] = windowWidth - 20;
      motobugxSpeed[i] = motobugxSpeed[i] * -1;
    }

    
    if (motobugX[i] <= 0) {
      motobugX[i] = 0;
      motobugxSpeed[i] = motobugxSpeed[i] * -1;
    }

    if (motobugY[i] >= windowHeight - 20) {
      motobugY[i] = windowHeight - 20;
      motobugySpeed[i] = motobugySpeed[i] * -1;
    }

    
    if (motobugY[i] <= 0) {
      motobugY[i] = 0;
      motobugySpeed[i] = motobugySpeed[i] * -1;
    }

    if (dist(sonicX, sonicY, motobugX[i], motobugY[i]) < 30) {
      sonicX = windowWidth / 2;
      sonicY = windowHeight / 2;
      deathScreenBool = true;
      resetGame();
    }
  }

  for (let i = 0; i < x.length; i++) {
    image(rings, x[i], y[i], 20, 20);
    if (dist(sonicX, sonicY, x[i], y[i]) < 30) {
      x.splice(i, 1);
      y.splice(i, 1);
      sonicring.setVolume(.4);
      sonicring.play();
      score++;
    }
  }

  image(sonic, sonicX, sonicY, 50, 50);

  if (keyIsDown(LEFT_ARROW)) {
    sonicX -= 8;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    sonicX += 8;
  }

  if (keyIsDown(UP_ARROW)) {
    sonicY -= 8;
  }

  if (keyIsDown(DOWN_ARROW)) {
    sonicY += 8;
  }

  if (sonicX < 0) {
    sonicX = 0;
  }
  if (sonicX > windowWidth - 50) {
    sonicX = windowWidth - 50;
  }

  if (sonicY < 0) {
    sonicY = 0;
  }
  if (sonicY > windowHeight - 50) {
    sonicY = windowHeight - 50;
  }
}

/**
 * Runs the hard difficulty level
 */
function hardGame() {
  background(background2);
  fill(0);
  textAlign(LEFT, BASELINE);
  textSize(40);
  fill(23, 114, 222);
  text("Score: " + score, 20, 50);
  fill(255, 50, 50);
  text(" Deaths: " + deathCount, 250, 50);


  if (score >= 10) {
    hardGameBool = false;
    hardwinScreenBool = true;
    score = 0;
  }

  for (let i = 0; i < eggDroneX.length; i++) {
    image(eggDrone, eggDroneX[i], eggDroneY[i], 20, 20);
    // Update the EggDrone's position based on its current movement speed.
    eggDroneX[i] = eggDroneX[i] + eggDronexSpeed[i];
    eggDroneY[i] = eggDroneY[i] + eggDroneySpeed[i];

    // if eggdrone hits wall then reverse its direction
    if (eggDroneX[i] >= windowWidth - 20) {
      eggDroneX[i] = windowWidth - 20;
      eggDronexSpeed[i] = eggDronexSpeed[i] * -1;
    }

    
    if (eggDroneX[i] <= 0) {
      eggDroneX[i] = 0;
      eggDronexSpeed[i] = eggDronexSpeed[i] * -1;
    }

    if (eggDroneY[i] >= windowHeight - 20) {
      eggDroneY[i] = windowHeight - 20;
      eggDroneySpeed[i] = eggDroneySpeed[i] * -1;
    }

   
    if (eggDroneY[i] <= 0) {
      eggDroneY[i] = 0;
      eggDroneySpeed[i] = eggDroneySpeed[i] * -1;
    }

    if (dist(sonicX, sonicY, eggDroneX[i], eggDroneY[i]) < 30) {
      sonicX = windowWidth / 2;
      sonicY = windowHeight / 2;
      deathScreenBool = true;
      resetGame();
    }
  }

  for (let i = 0; i < x.length; i++) {
    image(rings, x[i], y[i], 20, 20);
    if (dist(sonicX, sonicY, x[i], y[i]) < 30) {
      x.splice(i, 1);
      y.splice(i, 1);
      sonicring.setVolume(.4);
      sonicring.play();
      score++;
    }
  }

  image(sonic, sonicX, sonicY, 50, 50);

  if (keyIsDown(LEFT_ARROW)) {
    sonicX -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    sonicX += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    sonicY -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    sonicY += 5;
  }

  if (sonicX < 0) {
    sonicX = 0;
  }
  if (sonicX > windowWidth - 50) {
    sonicX = windowWidth - 50;
  }

  if (sonicY < 0) {
    sonicY = 0;
  }
  if (sonicY > windowHeight - 50) {
    sonicY = windowHeight - 50;
  }
}

/**
 * Shows the win screen after completing the easy difficulty level
 */
function easywinScreen() {
  greenHillMusic.stop();

  background(0);
  fill(225);
  textSize(35);
  textAlign(CENTER, TOP);
  textSize(32);
  fill(255); 

let maxWidth = windowWidth * 0.8; 
let textX = windowWidth * 0.1; 
let textY = windowHeight * 0.08; 
let maxHeight = windowHeight * 0.35; 
text(
    "Good job, but that was too easy. Now go beat the next level!\nPress Q to quit, or press N for the next level.",
    textX,
    textY,
    maxWidth,
    maxHeight,
  );

let spaceStart = textY + maxHeight; 
let availableHeight = windowHeight - spaceStart; 

let gifSize = windowWidth * 0.25; 
gifSize = constrain(gifSize, 120, availableHeight * 0.8); 


let gifX = (windowWidth / 2) - (gifSize / 2);
let gifY = spaceStart + (availableHeight / 2) - (gifSize / 2);
  image(sonicdancing, gifX, gifY, gifSize, gifSize);
  
}

/**
 * Shows the win screen after completing the medium diffuculty level
 */
function mediumwinScreen() {
  chemicalPlantMusic.stop();
  background(0);
  textAlign(CENTER, TOP);
  textSize(32);
  fill(255); 

let maxWidth = windowWidth * 0.8;
let textX = windowWidth * 0.1;
let textY = windowHeight * 0.08; 

let maxHeight = windowHeight * 0.35; 
  text(
    "Nice! It seems like you're ready for the hardest level, but do you have what it takes?\n\nPress Q to quit or press N for the next level",
    textX,
    textY,
    maxWidth,
    maxHeight,
  );



let spaceStart = textY + maxHeight; 
let availableHeight = windowHeight - spaceStart; 


let gifSize = windowWidth * 0.25; 
gifSize = constrain(gifSize, 120, availableHeight * 0.8); 

let gifX = (windowWidth / 2) - (gifSize / 2);
let gifY = spaceStart + (availableHeight / 2) - (gifSize / 2);
  image(sonicrunning, gifX, gifY, gifSize, gifSize);
}

/**
 * Shows the win screen after completing the hard difficulty level
 */
function hardwinScreen() {
  finalBossMusic.stop();
  background(0);
  textAlign(CENTER, TOP);
  textSize(32);
  fill(255); 

let maxWidth = windowWidth * 0.8;
let textX = windowWidth * 0.1;
let textY = windowHeight * 0.08; 

let maxHeight = windowHeight * 0.35; 
  text(
    "Congratulations! You have collected all the rings. You are now an official Ring Conqueror!\nPress Q to return to the main menu.",
    textX,
    textY,
    maxWidth,
    maxHeight,
  );


let spaceStart = textY + maxHeight; 
let availableHeight = windowHeight - spaceStart; 


let gifSize = windowWidth * 0.25; 
gifSize = constrain(gifSize, 120, availableHeight * 0.8); 

let gifX = (windowWidth / 2) - (gifSize / 2);
let gifY = spaceStart + (availableHeight / 2) - (gifSize / 2);

  image(sonicThumbsUp, gifX, gifY, gifSize, gifSize);
}

/**
 * Resizes the game canvas whenever the browser window changes size.
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
