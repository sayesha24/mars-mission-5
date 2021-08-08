var rover, rover_img, astronaut;
var gold, gold_img;
var rocket, rocket_img;
var alien, aliens_img;
var asteroids, asteroids_img;
var bg_img;
var laserbeem, laserbeem_img;
var tickmark1, tickmark2, tickmark3, tickmark4, tickmark_img;
var cross1, cross2, cross_img;

var security, system, code, ab;

var score= 10;
var answerScore= 0;
var PLAY= 1;
var END= 0;
var gameState= PLAY;

var goldGroup;
var alienGroup;
var asteroidGroup;

//var Rocketbutton;


function preload(){

 bg_img= loadImage("images/mars.jpg");

 rover_img= loadImage("images/rover.png");
 gold_img= loadImage("images/gold.png");
 asteroids_img= loadImage("images/asteroid.png");
 aliens_img= loadImage("images/alien.png");
 laserbeem_img= loadImage("images/laserbeem.png");
 rocket_img= loadImage("images/rocket.png");
 astronaut= loadImage("images/astronaut.png");
 tickmark_img= loadImage("images/tickmark.png");
 cross_img= loadImage("images/cross.png");
}

function setup(){

  createCanvas(1900, 1010)
  
  rover= createSprite(200, 800);
  rover.addImage(rover_img);
 // rover.debug= true;
  rover.scale= 0.9;
  rover.setCollider('circle', 0, 0, 150);

  rocket= createSprite(550, 710);
  rocket.visible= false;
 rocket.scale= 0.9;
  rocket.addImage(rocket_img);
  

  goldGroup= createGroup();
  alienGroup= createGroup();
  asteroidGroup= createGroup();

  tickmark1= createSprite(1030, 190);
  tickmark1.addImage(tickmark_img);
  tickmark1.visible= false;
  tickmark1.scale= 0.1;

  tickmark2= createSprite(1030, 340);
  tickmark2.addImage(tickmark_img);
  tickmark2.visible= false;
  tickmark2.scale= 0.1;

  tickmark3= createSprite(1030, 440);
  tickmark3.addImage(tickmark_img);
  tickmark3.visible= false;
  tickmark3.scale= 0.1;

  tickmark4= createSprite(1030, 750);
  tickmark4.addImage(tickmark_img);
  tickmark4.visible= false;
  tickmark4.scale= 0.1;

  cross1= createSprite(1030, 540);
  cross1.visible= false;
  cross1.scale= 0.2;
  cross1.addImage(cross_img);

  cross2= createSprite(1030, 650);
  cross2.visible= false;
  cross2.scale= 0.2;
  cross2.addImage(cross_img);

  laserbeem= createSprite(400, 800, 100, 20);
  laserbeem.addImage(laserbeem_img);
  laserbeem.visible= false;
  laserbeem.collide(alienGroup);
 // laserbeem.debug= true;
  laserbeem.setCollider('circle', 68, 72, 26);

  
  system = new System();
  security= new Security();


}

function draw(){

  background(bg_img);

  
  if(gameState === PLAY){

    //behid();
  if(score < 10){
  SpawnGold();
  }

  SpawnAliens();
  SpawnAsteroids();
  mouseMoved();

if(score >= 10){

  security.display();

  //security.beHid()
  //ab.visible= true;
 


}

//if(score <= 9){

  //security.beHid();
//}
  if(keyDown("UP_ARROW")){
  
    rover.y += -5;
  }


  if(keyDown("LEFT_ARROW")){

    rover.x += -5;
    
  }

  if(keyDown("RIGHT_ARROW")){

    rover.x += 5;
    
  }

  if(keyDown("DOWN_ARROW")){

    rover.y += 5;
    
  }

  
 // if(score === 10){

   // Rocketbutton= createButton('GO TO ROCKET');
   // Rocketbutton.position(800, 400);
    
  //}


  if(rover.isTouching(goldGroup)){

    score ++;
    goldGroup.destroyEach();
  }

  if(rover.isTouching(asteroidGroup)){
    fill("black");
    textSize(25);
    text("MISSION ABORDED: THE ASTEROID HIT YOU", 500, 400);
    gameState= END;
  }

  if(score >= 3 && score <= 5){
    fill("black");
    textSize(25);
    text("USE THE LASER BEEM TO MAKE THE ALIENS DISAPPEAR", 500, 400);
  }

  if(score >= 7 && score <= 9){

    fill("black");
    textSize(25);
    text("MAKE SURE THE ASTEROIDS DON'T HIT YOU, OTHERWISE THE MISSION WILL BE ABORDED", 500, 400);


  }

  if(score >= 5){

    alienGroup.destroyEach();
  }


if(score < 10){

  fill("black");
  textSize(23);
  text("SCORE: " + score, 100, 130);
  text("TOTAL GOLD: 10", 100, 80);

}

if(score >= 10){

  rocket.visible= true;
  rover.addImage(astronaut);
  rover.scale= 0.2;
}

if(score >= 3 && score <= 5){

laserbeem.visible= true;

}
else{

  laserbeem.visible= false;
}

if(keyDown("SPACE")){

  laserbeem.width= 600;
}

if(laserbeem.isTouching(alienGroup)){

  alienGroup.destroyEach();
}

if(rover.isTouching(alienGroup)){

  gameState= END;
}
 }
else if(gameState === END){

  textSize(40);
  fill("black");
  text("GAME OVER", 700, 400);
}
  drawSprites();
}

function SpawnGold(){

  if (frameCount % 200 === 0 && score <= 10) {
    gold = createSprite(200, 800, 70,70);
    gold.x = Math.round(random(rover.x + 120, rover.x + 300));
    gold.y= Math.round(random(600,900));

    gold.addImage(gold_img);
    gold.scale= 0.3;
    gold.lifeTime= 25;
  
  goldGroup.add(gold);
  }
}

function SpawnAliens(){

  if(frameCount% 150=== 0 && score >= 3 && score <=5){

    alien= createSprite(600, 800, 100, 100);
  //alien.x= Math.round(random(rover.x + 120, rover.x + 600));
  alien.x= Math.round(random(700, 1500));
  alien.addImage(aliens_img);
  alien.scale= 0.5;
  alien.lifeTime= 25;
    alienGroup.add(alien);
  }
}

function SpawnAsteroids(){

  if(frameCount% 150=== 0 && score >= 7 && score <= 9){

    asteroids= createSprite(400, 100, 100, 100);
    asteroids.x= Math.round(random(100, 1600));

    asteroids.velocityY= 7;
    asteroids.addImage(asteroids_img);
    asteroids.scale= 0.3;

    asteroidGroup.add(asteroids);
  }
}

function mouseMoved(){

  laserbeem.x= mouseX;
  laserbeem.y= mouseY;
}

