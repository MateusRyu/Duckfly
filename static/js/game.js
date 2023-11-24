const board = document.getElementById("board");
const socket = io();
const game = {
  canvas: board,
  animation: false,
  running: false,
  state: {},
};

let MainPlayer;

socket.on("connect", () => {
    socket.emit('start game', {player_id: 0});
});

socket.on("new game", (gameData) => {
  console.log(game, JSON.parse(gameData))
  game.state = JSON.parse(gameData);
  
  game.context = game.canvas.getContext("2d");
  board.width = game.state.width;
  board.height = game.state.height
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
  MainPlayer = new Player(20, 10, "yellow", 10, 20);
});

socket.on("pause", (data) => {
  game.running = false;
  cancelAnimationFrame(game.animation);
});

socket.on("continue", (data) => {
  game.running = true;
  game.animation = requestAnimationFrame(updateCanvas);
});

function clear() {
  game.context.clearRect(0, 0, game.state.width, game.state.height)
}

function Player(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.speedX = 0;
  this.speedY = 0;
  this.accelerationY = game.state.gravity;
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
    var floor = game.state.height - this.height;
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
    MainPlayer.accelerationY = game.state.gravity;
    if (game.keys && game.keys["ArrowLeft"]){ MainPlayer.speedX = -5; }
    if (game.keys && game.keys["ArrowRight"]) {MainPlayer.speedX = 5; } 
    if (game.keys && game.keys["ArrowUp"]) {MainPlayer.jump() }
    clear();
    MainPlayer.updatePosition();
    let ctx = game.context;
    ctx.fillStyle = MainPlayer.color;
    ctx.fillRect(MainPlayer.x, MainPlayer.y, MainPlayer.width, MainPlayer.height);
    game.animation = requestAnimationFrame(updateCanvas);
  }
}

