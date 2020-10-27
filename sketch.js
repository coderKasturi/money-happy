//create sprite
    var PLAY=1;
    var END=0;
    var gameState=PLAY;

    var monkey , monkey_running;

    var banana ,bananaImage, obstacle, obstacleImage;

    var FoodGroup, obstacleGroup;

    var score;

    var ground;

    var SurvivalTime;

function preload(){
    
      monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

      bananaImage = loadImage("banana.png");
      obstacleImage = loadImage("obstacle.png"); 
    }

function setup() {
      createCanvas(600,400);

      ground=createSprite(400,350,900,10);

      monkey=createSprite(80,315,25,20);
      monkey.addAnimation("moving",monkey_running);
      monkey.scale=0.1;

      FoodGroup=new Group();
      obstacleGroup=new Group();

      monkey.setCollider("circle",50,150,120);
      monkey.debug = false;

      SurvivalTime=0;  
    }

function draw() {
  
      background("white");

      stroke("black");
      textSize(20);
      fill("white");
      text("Survival Time: "+SurvivalTime,400,50);
  
  
    if(gameState===PLAY){

      ground.velocityX=-4;

      SurvivalTime=Math.ceil(frameCount/frameRate());

      if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      }  

      if(keyDown("space")&& monkey.y >= 200) {
          monkey.velocityY = -12;
      }

      //add gravity
      monkey.velocityY = monkey.velocityY + 0.8;

     }else if(gameState===END){

      FoodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);

      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);

      ground.velocityX=0;
      monkey.velocityY=0;

     }

      if(monkey.isTouching(obstacleGroup)){
         gameState=END;    
     }

      if(ground.x<450){
         ground.x = ground.width/2;
     }

      monkey.collide(ground);

      food();
      Obstacle();

      drawSprites();
     }

function food(){
    if(frameCount%80===0){  
      var banana=createSprite(650,Math.round(random(120,200)),5,5);
      banana.addImage(bananaImage);
      banana.scale=0.1;
      banana.velocityX=-3; 
      banana.lifetime=230;
      
      banana.depth = monkey.depth;
      monkey.depth = monkey.depth + 1;
               
      FoodGroup.add(banana);
    }
    }

function Obstacle(){
    if(frameCount%300===0){  
      var obstacle=createSprite(650,330,5,5);
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.1;
      obstacle.velocityX=-3; 
      obstacle.lifetime=230;

      obstacleGroup.add(obstacle);
    }
    } 
