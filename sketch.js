
var monkey , monkey_running,InvisibleGround;
var banana ,bananaImage, obstacle, obstacleImage,ground,groundImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;
var PLAY;
var END;
var gameState = PLAY;
var score = 0;



function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("jing.fm-ground-rules-clipart-2465504.png")
}



function setup() {
 createCanvas(500,500)
  
  monkey = createSprite(200,460,10,10);  
  monkey.addAnimation("running",monkey_running); 
  monkey.scale=0.1;

  
  ground = createSprite(200,605,500,30);  
  ground.addImage(groundImage); 
  ground.x = ground.width /2;
  ground.velocityX = -4
 ground.scale=1;
  
    
  invisibleGround = createSprite(200,465,600,10);
  invisibleGround.visible = false;
  
  
   bananaGroup = createGroup();
  obstacleGroup = createGroup();
    
  monkey.setCollider("circle",0,0);
  monkey.debug = false;
  
   
}


function draw() {
background("pink")


 
  
  
      if (ground.x < 205){
        
      ground.x = ground.width/2;
    }
    
  
  
  
   //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 420) {
        monkey.velocityY = -20;

    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
  
  
  if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 1;
    }    
 
//
   
  
  
  if (monkey.isTouching(obstacleGroup)){
  
     obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     bananaGroup.destroyEach();
   
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    

     ground.velocityX = 0;
     monkey.velocityY = 0
    

    
     
     //displaying game over
  stroke ("darkblue");
  textSize (20);
  fill ("darkblue")
  textFont ("Comic Sans MS")
  text("Game Over",200,200);
    
     //displaying press r to restart
  
    obstacleGroup.setVelocityXEach(0);
    
    
    
     survivalTime = 0;
   
  
  
  
   
  }
  
  
  stroke ("darkblue");
  textSize (20);
  fill ("darkblue")
  textFont ("Comic Sans MS")
   survivalTime = + Math.round(frameCount/20);
  text("survivalTime : " + survivalTime ,30,50)

  
  
  
  
  
   monkey.collide(invisibleGround);
    
   
  
  edges =createEdgeSprites();
  
  
Spawnbanana();
Spawnobstacle()

drawSprites();  
}


function Spawnbanana(){
 if(World.frameCount%80===0)  {
   banana = createSprite(400,200,20,20); 
   banana.addImage(bananaImage)
   banana.scale=0.10;
   r=Math.round(random(1,2))
  
    banana.y=Math.round(random(150,340))
    banana.velocityX=-7;
    banana.lifetime =100;
    
    
   
   bananaGroup.add(banana)
    
 }
   
   
 }



function Spawnobstacle(){
 if(World.frameCount%80===0)  {
   obstacle = createSprite(480,445,20,20); 
   obstacle.addImage(obstacleImage)
   obstacle.scale=0.20;
 
    obstacle.velocityX= 7;
    obstacle.lifetime =100;
    obstacle.bounceOff(edges);
    obstacleGroup.add(obstacle)
   obstacle.setCollider("circle",0,0,195);
  obstacle.debug = false;
 }
   
   
 }




