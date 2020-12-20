var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground, jungle, jungleImage;
var foodGroup, obstacleGroup, survivalTimeScore;
var survivalTime=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  monkey_running = loadAnimation("Images/sprite_0.png","Images/sprite_1.png","Images/sprite_2.png","Images/sprite_3.png","Images/sprite_4.png","Images/sprite_5.png","Images/sprite_6.png","Images/sprite_7.png","Images/sprite_8.png");
  bananaImage = loadImage("Images/banana.png");
  obstacleImage = loadImage("Images/obstacle.png");
  jungleImage = loadImage("Images/jungle.jpg");
 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
   jungle = createSprite(width, height);
  jungle.addImage(jungleImage);
  jungle.scale = 3;
  
  monkey = createSprite(80, height-75, 20, 20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(70, height-50, 900, 10);
 
  console.log(ground.x);
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,10, monkey.height);
  survivalRate = 0;
}


function draw() {
background(0);
  if(gameState===PLAY){
  if(keyDown(UP_ARROW)|| touches.length>0) {
        monkey.velocityY = -5;
    touches=[];
  }
  if(keyDown(DOWN_ARROW)){
    monkey.velocityY = 5;
  }
  if(obstaclesGroup.isTouching(monkey)){
    gameState=END;
  }
    spawnObstacles();
  spawnBananas();
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
  /*obstacle.x = x;
  obstacle.y = y;
  camera.position.x = obstacle.x;*/
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
  text("Survival time:"+ survivalTime, 100, 50);
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
   obstacle = createSprite(500, height-70, 10, 40);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
   obstacle.velocityX = -6;
    obstacle.lifetime = 300;
  
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBananas(){
  if (frameCount % 100 === 0) {
    banana = createSprite(width-40, height-85, 20, 20);
    banana.y = Math.round(random(120,300));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
    //add each cloud to the group
    foodGroup.add(banana);
  }
}
