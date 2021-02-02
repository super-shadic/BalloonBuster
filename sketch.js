var PLAY = 1
var END = 0
var gameState = PLAY;
var redBalloon, redGroup, redBalloonImage, rBalloon;
var arrow, arrowImage;
var greenBalloon, greenGroup, greenBalloonImage, gBalloon;
var blueBalloon, blueGroup, blueballoonImage, bBalloon;
var pinkBalloon, pinkGroup, pinkBalloonImage, pBalloon;
var bow, bowImage;
var rand;
var score = 0, scoreboard;
var info, infoImage;
var selectBalloon;
var ground, groundImage;

//load your images here 
function preload(){

  bowImage = loadImage("bow0.png");
  groundImage = loadImage("background0.png")
  arrowImage = loadImage("arrow0.png")
  blueBalloonImage = loadImage("blue_balloon0.png");
  greenBalloonImage = loadImage("green_balloon0.png");
  pinkBalloonImage = loadImage("pink_balloon0.png");
  redBalloonImage = loadImage("red_balloon0.png");
  infoImage = loadImage("BalloonBuster - 19_1_2020.PNG")
}

function setup() {
  createCanvas(600, 600);

  //creating background
  ground = createSprite(300, 100, 10, 10);
  ground.addImage(groundImage);
  ground.scale = 3;
  ground.velocityX = -5
  
  border = createSprite (0, 300, 1, 600);
  border.visible = 0;
  
  //creating info screen
  info = createSprite(300, 300, 1, 1);
  info.addImage(infoImage);
  info.visible = 0
  info.scale = 0.85;
  
  //creating bow
  bow = createSprite(550, 250, 20, 20);
  bow.addImage(bowImage);
  bow.scale = 1.25;

  //creating arrow
  arrow = createSprite(550, 250, 2, 1);
  arrow.addImage(arrowImage);
  arrow.scale = 0.3;
  arrow.setCollider ("rectangle", 5, 0, 4, 0, 0);
  
  redBalloon = createSprite(0, 0, 0, 0);
  blueBalloon = createSprite(0, 0, 0, 0);
  greenBalloon = createSprite(0, 0, 0, 0);
  pinkBalloon = createSprite(0, 0, 0, 0);
  
  redBalloon.visible = 0;
  blueBalloon.visible = 0;
  greenBalloon.visible = 0;
  pinkBalloon.visible = 0;
  gameState = PLAY;
/*   for (i = 70; i < 550; i = i+100){
  redBalloon = createSprite(25, i, 60, 50)
  redBalloon.addImage(redBalloonImage);
  redBalloon.scale = 0.11;
} */
  
/*   for (i = 100; i < 500; i = i+100){
  //creating blueBalloon
  blueBalloon = createSprite(75, i, 20, 20);
  blueBalloon.addImage(blueBalloonImage);
  blueBalloon.scale = 0.125;
   } */
  
/*   for (i = 150; i < 450; i = i+100){
  //creating green balloon
  greenBalloon = createSprite(135, i, 100, 160);
  greenBalloon.addImage(greenBalloonImage);
  greenBalloon.scale = 0.12;
   } */

/*   for (i = 200; i < 400; i = i+100){
  //creating pink balloon
  pinkBalloon = createSprite(185, i, 100, 120);
  pinkBalloon.addImage(pinkBalloonImage);
  pinkBalloon.scale = 1.5;
   } */
}

function draw() {
  background (0);
  redGroup = new Group();
  blueGroup = new Group();
  greenGroup = new Group();
  pinkGroup = new Group();
  
  redGroup.add (redBalloon);
  blueGroup.add (blueBalloon);
  greenGroup.add (greenBalloon);
  pinkGroup.add (pinkBalloon);
  
  if (gameState === PLAY){
    
    if (keyDown("space")) {

    arrow.velocityX = -10;
    arrow.addImage(arrowImage);
    arrow.scale = 0.3;
    }

  if (ground.x < 0) {
    
    ground.x = ground.width/2
  }
    
    bow.y = mouseY;
    ground.velocityX = -5;
    
    scoreBoard();
    summonArrow();
    spawnBalloon();
    interaction();
    
    if (arrow.isTouching(bow))  {
    arrow.y = mouseY
    }
    
    if (score >= 50) {

      gameState = END
    } 
  }
  
  if (gameState === END) {
    
      info.visible = 1;
      arrow.destroy();
      bow.destroy(); 
    
  }
  
  drawSprites();
  scoreBoard();
}

function rBalloon(){
  
  redBalloon = createSprite(25, rand, 20, 20)
  redBalloon.addImage(redBalloonImage);
  redBalloon.scale = 0.11;
  redBalloon.velocityX = 15;
  redBalloon.lifetime = 300;
  
}

function bBalloon(){
  
  blueBalloon = createSprite(75, rand, 20, 20);
  blueBalloon.addImage(blueBalloonImage);
  blueBalloon.scale = 0.125;
  blueBalloon.velocityX = 12;
  blueBalloon.lifetime = 300;
  
}

function gBalloon(){
  
  greenBalloon = createSprite(135, rand, 20, 20);
  greenBalloon.addImage(greenBalloonImage);
  greenBalloon.scale = 0.12;
  greenBalloon.velocityX = 12;
  greenBalloon.lifetime = 300;
}

function pBalloon(){
  
  pinkBalloon = createSprite(185, rand, 20, 20);
  pinkBalloon.addImage(pinkBalloonImage);
  pinkBalloon.scale = 1.5;
  pinkBalloon.velocityX = 10;
  pinkBalloon.lifetime = 300;
  
}

function interaction(){
  
  if (arrow.isTouching (blueBalloon)){
      score = score + 2;
      blueBalloon.destroy();
  }
  
  if (arrow.isTouching (redBalloon)){
      score = score + 3;
      redBalloon.destroy();
  }
  
  if (arrow.isTouching (greenBalloon)){
      score = score + 2;
      greenBalloon.destroy();
  }
  
  if (arrow.isTouching (pinkBalloon)){
      score = score + 1;
      pinkBalloon.destroy();
  }
  
  if (arrow.isTouching (bow)){
  arrow.lifetime = 300}
  }

function summonArrow (){
  
   if (arrow.isTouching(border)) {
    
    arrow.x = bow.x;
    arrow.y = bow.y;
    arrow.velocityX = 0;
  } 
}

function scoreBoard () {

  text ("score: " + score, 300, 50)
  
}

function spawnBalloon() {
    
  if (frameCount%80 == 0) {
    
    selectBalloon = Math.round(random(1,4));
    
    if (selectBalloon == 1) {
      rBalloon();
      
    } else if (selectBalloon == 2){
      bBalloon();
      
    } else if (selectBalloon == 3) {
      gBalloon();
      
    } else if (selectBalloon == 4) {
      pBalloon();
      
    }
    
    rand = Math.round(random (15, 550));
  }
}