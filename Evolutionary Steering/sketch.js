// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Seeking "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/

var vehicles = [];
var food = [];
var poison = [];

var debug;

function setup() {
  createCanvas(640,360);
  for(var i = 0; i < 50; i++){
    var x = random(width);
    var y = random(height);
    vehicles[i] = new Vehicle(x, y);
  }
  for(var i = 0; i < 40; i++){
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }
  for(var i = 0; i < 20; i++){
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  debug = createCheckbox();
}

function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}

function draw() {
  background(51);

  if(random(1) < 0.1){
    var x = random(width);
    var y = random(height);
    food.push(createVector(x, y));
  }

  if(random(1) < 0.01){
    var x = random(width);
    var y = random(height);
    poison.push(createVector(x, y));
  }

  for(var i = 0; i < food.length; i++){
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4);
  }

  for(var i = 0; i < poison.length; i++){
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4, 4);
  }

  // Call the appropriate steering behaviors for our agents
  //for(var i = vehicles.length)
  for(var i = vehicles.length-1; i >= 0; i--){
    vehicles[i].boundaries();
    vehicles[i].behaviors(food, poison);
    vehicles[i].update();
    vehicles[i].display();

    var newVehicle = vehicles[i].clone();
    if(newVehicle != null){
      vehicles.push(newVehicle);
    }

    if(vehicles[i].dead()){
      var x = vehicles[i].position.x;
      var y = vehicles[i].position.y;
      food.push(createVector(x, y));
      vehicles.splice(i, 1);
    }
  }
}
