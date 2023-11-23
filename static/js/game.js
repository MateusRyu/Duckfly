var player;
const board = document.getElementById("board");

function fpsToMiliseconds(fps) {
  return 1000/fps;
}

var game = {
  canvas: board,
  start: function() {
    this.canvas.width = 480;
    this.canvas.height =270;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateCanvas, fpsToMiliseconds(45));
    window.addEventListener("keydown", function(event) {
      game.keys = (game.keys || []);
      game.keys[event.keyCode] = true;
      console.log(event.keyCode);
    });
    window.addEventListener("keyup", function(event) {
      game.keys = (game.keys || []);
      game.keys[event.keyCode] = false;
    });
  },

  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
};

function startGame() {
  game.start();
  MainPlayer = new Player(20, 10, "yellow", 10, 20);
}

function Player(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.x = x;
  this.y = y;
  this.updatePosition = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed ;
    this.hitBottom();
  };

  this.hitBottom = function() {
    var floor = game.canvas.height - this.height;
    if (this.y > floor) {
      this.gravitySpeed = 0;
      this.y = floor;
    }
  }

  this.update = function() {
    MainPlayer.speedX = 0;
    MainPlayer.speedY = 0;
    MainPlayer.gravity = 0.1;
    if (game.keys && game.keys[37]){ MainPlayer.speedX = -1; }
    if (game.keys && game.keys[39]) {MainPlayer.speedX = 1; } 
    if (game.keys && game.keys[38]) {MainPlayer.speedY = -1; MainPlayer.gravity = -0.2}
    if (game.keys && game.keys[40]) {MainPlayer.speedY = 1; } 
 
    this.updatePosition();
    ctx = game.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function updateCanvas() {
  game.clear();
  MainPlayer.update();
}

startGame();

