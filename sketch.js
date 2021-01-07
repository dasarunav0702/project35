var database, dog, happyDog, dogImg, happyDogImg
var foodS, foodStock


function preload()
{
  dogImg= loadImage("images/dogImg.png");
  happyDogImg= loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500, 500);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.5;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  fill ("black")
  text("Food Remaining: "+foodS,170,100)

}
   
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if (x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
})
}
