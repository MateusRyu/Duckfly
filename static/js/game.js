var player;
const board = document.getElementById("board");

var game = {
  canvas: board,
  gravity: 0.2,
  start: function() {
    this.canvas.width = 480;
    this.canvas.height =270;
    this.context = this.canvas.getContext("2d");
    this.interval = requestAnimationFrame(updateCanvas);
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
  this.accelerationY = game.gravity;
  this.x = x;
  this.y = y;
  this.jumping = false,
  this.updatePosition = function() {
    this.speedY += this.accelerationY;
    this.x += this.speedX;
    this.y += this.speedY;
    this.hitBottom();
  };

  this.hitBottom = function() {
    var floor = game.canvas.height - this.height;
    if (this.y > floor) {
      this.jumping = false;
      this.speedY = 0;
      this.y = floor;
    }
  }

  this.jump = function() {
    if (this.jumping == false) {
      this.jumping = true;
      this.accelerationY = -1;
      setTimeout(() => {
        this.accelerationY = game.gravity;
      }, 100)
    }
  }

  this.update = function() {
    MainPlayer.speedX = 0;
    if (game.keys && game.keys[37]){ MainPlayer.speedX = -1; }
    if (game.keys && game.keys[39]) {MainPlayer.speedX = 1; } 
    if (game.keys && game.keys[38]) {MainPlayer.jump() }
 
    this.updatePosition();
    ctx = game.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function updateCanvas() {
  game.clear();
  MainPlayer.update();
  requestAnimationFrame(updateCanvas)
}

startGame();

