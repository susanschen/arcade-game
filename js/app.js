// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Start enemy offscreen on the left at a negative value between X1 and X2
    var X1 = 100;
    var X2 = 700;
    this.x = -(Math.floor(Math.random() * (X2 - X1) + X1));

     // Select row 1, 2, or 3.
    var row = Math.floor((Math.random() * 3) + 1);

    // Each row is 83 px tall.
    // To "center" the enemy in each row, y is decreased by 40 px.
    this.y = row * 83 - 40;

    // Pick a number that is not too slow or fast.
    var fast = 200;
    var slow = 50;
    this.speed = Math.floor(Math.random() * (fast - slow) + slow);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // if enemy goes off screen on the right, move back off screen on the left
    if (this.x < 606){
        this.x += dt * this.speed;
    }else this.x = -100;
    //console.log ("Enemy update x: " +this.x);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// returns enemy's x,y value in an array
Enemy.prototype.getLocation = function(){
    var position = [];
    position[0] = this.x;
    position[1] = this.y;
    return position;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = "images/char-boy.png";
    //console.log("player sprite: " + this.sprite);
    this.x = "";
    this.y = "";
    this.reset();
};

// returns player's x,y value in an array
Player.prototype.getLocation = function(){
    var position = [];
    position[0] = this.x;
    position[1] = this.y;
    return position;
};

// Set the player's location at the bottom row and middle column
Player.prototype.reset = function(){
    // Each tile is 101 x 83 px.
    // (202, 415) is the top left coordinate for the tile at the third column and sixth row.
    // To place the player's feet at the center of the tile, the y coordinate is changed to 375
    this.x = 202;
    this.y = 375;
};

// Update the players's position, required method for game
Player.prototype.update = function(){
    // if the player reaches the water, the player won the game
    if (this.y < 10){
        ctx.font = "50px serif";
        ctx.fillText("You Won!",10,40);
    }
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
var numOfEnemies = 7;
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
