// Game settings
var settings = {
    board: {col: 5, row: 6},
    tile: {width: 101, height: 83},
    enemy: {movement: 60,   // px, the greater the faster
            count: 5}
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += settings.enemy.movement * this.speed * dt;

    if (this.x > ctx.canvas.width) {
        this.init();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

// Init/Reset the enemy position
Enemy.prototype.init = function() {
    this.speed = getRandomInt(1, 6);  // 5 possible speed
    this.x = -2 * settings.tile.width;
    this.y = 63 + getRandomInt(0, 3) * settings.tile.height;  // random row between 1-3
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.init();
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    var x = this.col * settings.tile.width;
    var y = this.row * settings.tile.height - 10;
    ctx.drawImage(Resources.get(this.sprite), x, y);
}

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if (this.col > 0) { 
                this.col--;
            }
            break;
        case 'up' :
            if (this.row > 0) {
                this.row--;
            }
            break;
        case 'right':
            if (this.col < settings.board.col - 1) {    // 0-index based
                this.col++;
            }
            break;
        case 'down':
            if (this.row < settings.board.row - 1) {    // 0-index based
                this.row++;
            }
            break;
        default:

    }
}

// Init/Reset player position
Player.prototype.init = function() {
    this.col = Math.floor(settings.board.col / 2);
    this.row = settings.board.row - 1;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = new Array();
for (var i = 0; i < settings.enemy.count; ++i) {   
    allEnemies.push(new Enemy());
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Helper functions

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}