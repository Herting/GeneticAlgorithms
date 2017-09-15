var population;
var lifespan = 400;
var lifeP;
var count = 0;
var target;
var maxforce = 0.2;

var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

function setup(){
  createCanvas(400, 300);
  rocket = new Rocket();
  population = new Population();
  lifeP = createP();
  target = createVector(width/2, 50);
}

function draw(){
  background(0);
  population.run();
  lifeP.html(count);

  count++;
  if(count == lifespan){
    population.evaluate();
    population.selection();
    //population = new Population();
    count = 0;
  }

  rect(100, 150, 200, 10);

  fill(255);
  ellipse(target.x, target.y, 16, 16);
}

function Population(){
  this.rockets = [];
  this.popsize = 25;
  this.matingpool = [];

  for(var i = 0; i < this.popsize; i++){
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function(){

    var maxfit = 0;
    for(var i = 0; i < this.popsize; i++){
      this.rockets[i].calcFitness();
      if(this.rockets[i].fitness > maxfit){
        maxfit = this.rockets[i].fitness;
      }
    }
    createP(maxfit);

    for(var i = 0; i < this.popsize; i++){
      this.rockets[i].fitness /= maxfit;
    }

    this.matingpool = [];
    for(var i = 0; i < this.popsize; i++){
      var n = this.rockets[i].fitness * 100;
      for(var j = 0; j < n; j++){
        this.matingpool.push(this.rockets[i]);
      }
    }
  }

  this.selection = function(){
    var newRockets = [];
    for(var i = 0; i < this.rockets.length; i++){
      var parentA = random(this.matingpool).dna;
      var parentB = random(this.matingpool).dna;
      var child = parentA.crossover(parentB);
      child.mutation();
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }

  this.run = function(){
    for(var i = 0; i < this.popsize; i++){
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}

function DNA(genes){
  if(genes){
    this.genes = genes;
  } else {
    this.genes = [];
    for(var i = 0; i < lifespan; i++){
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxforce);
    }
}


  this.crossover = function(partner){
    var newgenes = [];
    var mid = floor(random(this.genes.length));
    for(var i = 0; i < this.genes.length; i++){
      if(i > 0){
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  this.mutation = function(){
    for(var i = 0; i < this.genes.length; i++){
      if(random(1) < 0.01){
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }

}
