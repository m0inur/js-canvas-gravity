var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

var gravity = 0.95;
var friction = 0.99;
var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener('click', function () {
  clickTextEffect()
})

function clickTextEffect() {
  requestAnimationFrame(clickTextEffect);
  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  objects.forEach(object => {
    object.update()
  })
}
// Utility Functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomCol(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Objects
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = function () {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx
    this.y += this.dy;
    this.draw();
    // gravity
  };


  this.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  };
}
var ball;
var ballArr = [];

function init() {
  ballArr = []
  ball = new Ball(canvas.width / 2, canvas.height / 2, dx, dy, radius, 'red', randomCol(colors));
  var radius = randomInt(5, 20);
  for (var i = 0; i < 60; i++) {
    var x = randomInt(radius, canvas.width - radius);
    var y = randomInt(0, canvas.height - radius);
    var dx = randomInt(-2, 2)
    var dy = randomInt(-2, 2)
    ballArr.push(new Ball(x, y, dx, 2, radius, randomCol(colors)));
  }
}


// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < ballArr.length; i++) {
    ballArr[i].update();
  }

  ball.update();
}

init()
animate()