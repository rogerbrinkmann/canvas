var canvas = document.getElementById('draw');
var context = canvas.getContext('2d');

setCanvasFullScreen();

// define a function to run when the canvas is resized
window.onresize=function(){
  setCanvasFullScreen();
}

// create circle object
var circle = new Circle(100,50,25, new Vector(1,0), '#000000');


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


function animate(){
  requestAnimationFrame(animate);

  fillCanvasBackground('#ffffff');
  circle.update();
  circle.draw();
}
