var canvas = document.getElementById('draw');
var context = canvas.getContext('2d');

setCanvasFullScreen();

// define a function to run when the canvas is resized
window.onresize=function(){
  setCanvasFullScreen();
}

// create circle object
var circle = new Circle(100,50,25, '#000000');
circle.velocityX = 2;

animate();

// function to fill the background of the canvas with a certain color. e.g.: '#ffffff'
function fillCanvasBackground(color){
  context.fillStyle = color;
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

// function to set the width of the canvas to the same width of the inner width and height of the window
function setCanvasFullScreen(){
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
}


// definition of a circle prototype
function Circle(x, y, r, color){
  this.x = x; // x-coordinate
  this.y = y; // y-coordinate
  this.velocityX = 0;
  this.velocityY = 0;
  this.r = r;	// radius
  this.color = color	// color

  // draw function of the circle
  this.draw = function(){
    context.strokeStyle=this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0 , 2 * Math.PI);
    context.stroke();
  }

  this.update = function(){
    this.x = this.x + this.velocityX;
    this.y = this.y + this.velocityY;
  }
}

function animate(){
  requestAnimationFrame(animate);

  fillCanvasBackground('#ffffff');
  circle.update();
  circle.draw();
}