var canvas = document.getElementById('draw');
var context = canvas.getContext('2d');

var qKey = false;
var aKey = false;
var pKey = false;
var lKey = false;

setCanvasFullScreen();

// define a function to run when the canvas is resized
window.onresize = function () {
  setCanvasFullScreen();
}

window.onkeydown = function (event) {
  switch (event.key) {
    case "q": qKey = true; break;
    case "a": aKey = true; break;
    case "p": pKey = true; break;
    case "l": lKey = true; break;
  }
};

window.onkeyup = function (event) {
  switch (event.key) {
    case "q": qKey = false; break;
    case "a": aKey = false; break;
    case "p": pKey = false; break;
    case "l": lKey = false; break;
  }
}

// create circle object
var circle = new Circle(100, 100, 4, 4, 0, 0, 25, '#000000');
var paddleLeft = new Paddle(100, canvas.height / 2 - 50, qKey, aKey, '#000000');
var paddleRight = new Paddle(canvas.width - 100, canvas.height / 2 - 50, pKey, lKey, '#000000');
animate();

// function to fill the background of the canvas with a certain
// color. e.g.: '#ffffff'
function fillCanvasBackground(color) {
  context.fillStyle = color;
  context.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  fillCanvasBackground('#ffffff');
  paddleLeft.update(qKey, aKey);
  paddleLeft.draw();
  paddleRight.update(pKey, lKey);
  paddleRight.draw();
  circle.update();
  circle.draw();
}

// definition of a circle prototype
function Circle(x, y, velX, velY, accX, accY, r, color) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.accX = accX;
  this.accY = accY;
  this.r = r;	// radius
  this.color = color	// color

  // draw function of the circle
  this.draw = function () {
    context.strokeStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.stroke();
  }

  this.update = function () {

    this.velX += this.accX;
    this.velY += this.accY;
    this.x += this.velX;
    this.y += this.velY;

    if (this.x > window.innerWidth - this.r) {
      this.x = window.innerWidth - this.r;
      this.velX *= -1;
    }

    if (this.y > window.innerHeight - this.r) {
      this.y = window.innerHeight - this.r;
      this.velY *= -1;
    }

    if (this.x < 0 + this.r) {
      this.x = this.r;
      this.velX *= -1;
    }

    if (this.y < 0 + this.r) {
      this.y = this.r;
      this.velY *= -1;
    }
  }
}

function Paddle(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.vel = 0;
  this.velMax = 5;

  this.update = function (upKey, downKey) {
    if (upKey) {
      this.vel = -this.velMax;
    }
    else if (downKey) {
      this.vel = this.velMax;
    }
    else{
      this.vel = 0;
    }
    this.y += this.vel;
  }

  this.draw = function () {
    context.strokeStyle = this.color;
    context.beginPath();
    context.rect(this.x, this.y, 10, 200);
    context.stroke();
  }
}

// function to set the width of the canvas to the same width
// of the inner width and height of the window
function setCanvasFullScreen() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}