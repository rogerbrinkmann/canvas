// definition of a circle prototype
function Circle(x, y, r, velocity, color){
  this.x = x; // x-coordinate
  this.y = y; // y-coordinate
  this.velocity = velocity;
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
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

class Vector{
  constructor(mag, direction){
    this.magVal = mag;
    this.dVal = direction;
    this.xVal = mag * Math.sin(direction);
    this.yVal = mag * Math.cos(direction);
  }

  set magnitude(value){
    this.magVal = value;
    this.xVal = value * Math.sin(this.dVal);
    this.yVal = value * Math.cos(this.dVal);
  }

  set direction(value){
    this.dVal = value;
    this.xVal = this.magVal * Math.sin(value);
    this.yVal = this.magVal * Math.cos(value);
  }

  set x(value){
    this.xVal = value;
    this.dVal = Math.atan2(value, this.yVal);
    this.magVal = Math.sqrt(this.yVal * this.yVal + value * value);
  }

  get x(){
    return this.xVal;
  }

  set y(value){
    this.yVal = value;
    this.dVal = Math.atan2(this.xVal, value);
    this.magVal = Math.sqrt(this.xVal * this.xVal + value * value);
  }

  get y(){
    return this.yVal;
  }

}
