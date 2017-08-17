// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //console.log("Enemy sprite: " + this.sprite);
    // Each row is 83 px tall. First row is at 0.
    // Enemy are allowed on rows 1, 2, and 3 only.
    // To "center" the enemy in each row, y is decreased by 40 px. (83 - 40 = 43)
    this.x = 0;
    this.y = 43;
    this.speed = 2;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var move = 10;
    this.x += move * dt * this.speed;
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

// handle keys input
// e values are "left", "right", "up", and "down"
// the values 101 and 83 are from engine.js render()
Player.prototype.handleInput = function(e){
    console.log("Player handleInput: " + e);
    switch (e){
        case ("left"):
            this.x -= 101;
            break;
        case ("right"):
            this.x += 101;
            break;
        case ("up"):
            this.y -= 83;
            break;
        case ("down"):
            this.y += 83;
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
    allEnemies[i] = new Enemy();
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
