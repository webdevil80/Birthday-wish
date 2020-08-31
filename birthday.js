
var force;
var firework =[] ;
function setup(){
createCanvas(windowWidth,windowHeight); 
  force= createVector(0,0.2);
  background(0); 
}
function mouseClicked(){
 let f = new fireworks(); 
 f.firework = new particle(mouseX,mouseY,true);
 firework.push(f);
}
function draw(){
   colorMode(RGB)  
   background(0,25); 
   if(frameCount%20==0){
      firework.push(new fireworks()); 
   }   
   for(var i =0;i< firework.length;i++){
      firework[i].update();
      firework[i].show();      
   } 
   textSize(30)
   textAlign(CENTER)
   text("Happy Birthday\nJayasree",width/2,height/2)    
}
function particle(x,y,col,firework){
    this.opacity = 255;
    this.pos = createVector(x,y);
    this.col = col;
    if(firework){
    this.vel = createVector(0,random(-10,-2));
    }
    else{
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(1,6));
    }
    this.acc = createVector(0,-4);
    this.show = function(){    
    if(!firework){
       strokeWeight(2);
       stroke(this.col,255,255,this.opacity);
     }
       else{
       strokeWeight(4);
       stroke(this.col,255,255);
       }
       point(this.pos.x,this.pos.y);         
    }
    this.applyForce = function(force){
        this.acc.add(force);        
    }
    this.update = function(){
    if(!firework){
        this.vel.mult(0.99);
        this.opacity -=7;
    }    
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);                
    }                
 }  
 

function fireworks(){
  this.firework = new particle(random(width),height-10,random(255),true);
 this.explode = false;
 this.particles = []; 
this.update = function() {
if(!this.explode){
   this.firework.applyForce(force);
   this.firework.show() ;
if(this.firework.vel.y>=0){
    this.explode = true;
    this.explore();
}
    }
for(var i =0;i< this.particles.length;i++){
      this.particles[i].update();
      this.particles[i].applyForce(force);       
    }
for(let i in this.particles){
    if(this.particles[i].opacity<=1){
        this.particles.splice(i,1);
    }
}       
}  
 this.show = function(){
     colorMode(HSB)
     if(!this.explode){
     this.firework.update();
     }
     for(var i =0;i< this.particles.length;i++){
     this.particles[i].show();
     }     
 } 
 this.explore = function() {
     for(var i =0;i<150;i++){
     this.particles.push(new particle(this.firework.pos.x,this.firework.pos.y,random(255),false));   
     }          
 }  
}    