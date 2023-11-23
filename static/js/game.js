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
  this.x = x;
  this.y = y;
  this.fall = function() {
    if (this.y + this.height <= game.canvas.height) {
      this.y += 5;
    }
  };
  this.update = function() {
    this.fall();
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

