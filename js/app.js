// Enemies our player must avoid
var Enemy = function(row, rate) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //console.log("Enemy sprite: " + this.sprite);
    this.x = 0;
    // Each row is 83 px tall. First row is at 0.
    // Enemy are allowed on rows 1, 2, and 3 only.
    // To "center" the enemy in each row, y is decreased by 40 px.
    this.y = row * 83 - 40;
    this.speed = rate;
    console.log("enemy row: " + row + "- speed: " + this.speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;
    //console.log ("Enemy update x: " +this.x);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = "images/char-boy.png";
    //console.log("player sprite: " + this.sprite);
    // Each column is 101 px wide. First column is at 0.
    // Each row is 83 px tall. First row is at 0.
    // Initial player position is at third column, sixth row.
    this.x = 202;
    // The sixth row starts at 415, but y is set to a lower number to move the image up, so it looks like the player is at the center of the tile image.
    this.y = 375;
};

// Update the players's position, required method for game
Player.prototype.update = function(){
//    var move = 1;
//    this.x = move;
    //console.log ("Player update x: " + this.x);
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle arrow keys input
// The e values are "left", "right", "up", and "down"
Player.prototype.handleInput = function(e){
    console.log("Player handleInput: " + e);
    // The player can not go beyond the canvas size of 505 x 606.
    // Each tile size is 101 x 83 (see engine.js render function)
    switch (e){
        case ("left"):
            if (this.x > 0){
                this.x -= 101;
            }
            break;
        case ("right"):
            if (this.x < 404){
                this.x += 101;
            }
            break;
        case ("up"):
            if (this.y > 0){
                this.y -= 83;
            }
            break;
        case ("down"):
            if (this.y < 332){
                this.y += 83;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
var numOfEnemies = 5;
for (var i = 0; i < numOfEnemies; i++){
    // Put enemy randomly in row 1, 2, or 3.
    var row = Math.floor((Math.random() * 3) + 1);
    // Pick a number between 20 and 90, not too slow or fast.
    var rate = Math.floor(Math.random() * (90 - 20) + 20);
    allEnemies[i] = new Enemy(row, rate);
}


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
