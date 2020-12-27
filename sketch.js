var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground, jungle, jungleImage;
var foodGroup, obstacleGroup, survivalTimeScore;
var survivalTime=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var x;
var y;
function preload(){
  monkey_running = loadAnimation("images/sprite_0.png","images/sprite_1.png","images/sprite_2.png","images/sprite_3.png","images/sprite_4.png","images/sprite_5.png","images/sprite_6.png","images/sprite_7.png","images/sprite_8.png");
  bananaImage = loadImage("images/banana.png");
  obstacleImage = loadImage("images/obstacle.png");
  jungleImage = loadImage("images/jungle.jpg");
 
}

function setup() {
  createCanvas(displayWidth, displayHeight);
   jungle = createSprite(displayWidth*4, displayHeight);
  jungle.addImage(jungleImage);
  jungle.scale = 3;
  monkey = createSprite(80, height-75, 20, 20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  ground = createSprite(70, height-50, displayWidth-20, 10);
  console.log(ground.x);
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  monkey.setCollider("rectangle",0,0,10, monkey.height);
  survivalRate = 0;
}


function draw() {
background(0);
camera.position.x = displayWidth+x;
camera.position.y = displayHeight/2;
  if(gameState===PLAY){
    // monkey jumps if space is pressed
  if(keyDown("space")|| touches.length>0) {
        monkey.velocityY = -12;
    touches=[];
  }
   monkey.velocityY = monkey.velocityY+1.2;
  if(obstaclesGroup.isTouching(monkey)){
    gameState=END;
  }
   // obstacle.collide(ground);
  spawnObstacles();
  spawnBananas();
  ground.visible = true;
  }
  
  else if(gameState===END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    jungle.velocityX = 0;
     obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);  
  
   
  }
  monkey.collide(ground);
  ground.visible=false;
  drawSprites();
  survivalTimeScore();
}
function survivalTimeScore(){
  stroke("red");
  textSize(20);
  fill("red");
  if(monkey.isTouching(foodGroup)){
    survivalTime = survivalTime+1; 
    foodGroup.destroyEach();
  }
  text("Survival time:"+ survivalTime,displayWidth/2,displayHeight-800);
}

function spawnObstacles(){
   camera.position.x = displayWidth - 20;
   camera.position.y = displayHeight/2;
   obstacle = createSprite(500, height-70, 10, 40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }

function spawnBananas(){
    camera.position.x = Math.round(random(120,300));
    banana = createSprite(width-40, height-85, 20, 20);
    banana.y = Math.round(random(120,300));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    foodGroup.add(banana);
  }
