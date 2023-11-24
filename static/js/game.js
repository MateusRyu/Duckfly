const board = document.getElementById("board");
const state = {
  gravity: 0.2,
  canvas: {
    width: 480,
    height: 400,
    contest: false
  }
}

var game = {
  canvas: board,
  animation: false,
  running: false,
  start: function() {
    state.canvas.context = game.canvas.getContext("2d");
    board.width = state.canvas.width;
    board.height = state.canvas.height
    game.animation = requestAnimationFrame(updateCanvas);
    window.addEventListener("keydown", function(event) {
      game.keys = (game.keys || []);
      game.keys[event.key] = true;
      console.log(event.key);
    });
    window.addEventListener("keyup", function(event) {
      game.keys = (game.keys || []);
      game.keys[event.key] = false;
      if (event.key == "ArrowUp") {
        MainPlayer.jumping = 0;
      }
      else if (event.key == "Escape") {
        game.pause();
      }
    });
    game.running = true;
  },

  pause: function() {
    if (game.running == true) {
      game.running = false;
      cancelAnimationFrame(game.animation);
    } else {
      game.running = true;
      game.animation = requestAnimationFrame(updateCanvas);
    }
  },

  clear: function() {
    state.canvas.context.clearRect(0, 0, state.canvas.width, state.canvas.height)
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
  this.accelerationY = state.gravity;
  this.x = x;
  this.y = y;
  this.jumping = 0,
  this.restoreJump = function() {
    this.jumping = 8;
  }
  this.updatePosition = function() {
    this.speedY += this.accelerationY;
    this.x += this.speedX;
    this.y += this.speedY;
    this.hitBottom();
  };

  this.hitBottom = function() {
    var floor = state.canvas.height - this.height;
    if (this.y > floor) {
      this.jumping = false;
      this.speedY = 0;
      this.y = floor;
      this.restoreJump()
    }
  }

  this.jump = function() {
    if (this.jumping > 0) {
      console.log(this.jumping)
      this.accelerationY = -.8;
      this.jumping -= 1;
    }
  }
}

function updateCanvas() { 
  if (game.running == true) {
    MainPlayer.speedX = 0;
    MainPlayer.accelerationY = state.gravity;
    if (game.keys && game.keys["ArrowLeft"]){ MainPlayer.speedX = -5; }
    if (game.keys && game.keys["ArrowRight"]) {MainPlayer.speedX = 5; } 
    if (game.keys && game.keys["ArrowUp"]) {MainPlayer.jump() }
    game.clear();
    MainPlayer.updatePosition();
    ctx = state.canvas.context;
    ctx.fillStyle = MainPlayer.color;
    ctx.fillRect(MainPlayer.x, MainPlayer.y, MainPlayer.width, MainPlayer.height);
    game.animation = requestAnimationFrame(updateCanvas);
  }
}

startGame();

