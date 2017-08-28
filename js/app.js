// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    // The enemy's actual width and height. (Not the image file size.)
    this.w = 90;
    this.h = 63;
    this.reset();
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    // if enemy goes off screen on the right, reset it
    if (this.x < 606){
        this.x += dt * this.speed;
    }else this.reset();
};

// Reset Enemy's position and speed
Enemy.prototype.reset = function(){
    // Start enemy offscreen on the left at a negative value between X1 and X2
    var X1 = 75;
    var X2 = 500;
    this.x = -(Math.floor(Math.random() * (X2 - X1) + X1));

    // Select row 1, 2, or 3.
    var row = Math.floor((Math.random() * 3) + 1);

    // Each row is 83 px tall.
    // To 'center' the enemy in each row, y is decreased by 40 px.
    this.y = row * 83 - 40;

    // Pick a number that is not too slow or fast.
    var fast = 200;
    var slow = 75;
    this.speed = Math.floor(Math.random() * (fast - slow) + slow);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.w = 50;
    this.h = 70;
    this.x = '';
    this.y = '';
    this.tile = '';
    this.reset();
};

// Set the player's location at the bottom row and third column
Player.prototype.reset = function(){
    // Each tile is 101 x 83 px.
    // (202, 415) is the top left coordinate for the tile at the third column and sixth row.
    // To place the player's feet at the center of the tile, the y coordinate is changed to 375
    this.x = 202;
    this.y = 375;
    this.tile = xyTileNum(this.x, this.y);
};

// Update the players's position
Player.prototype.update = function(){
    // if the player reaches the water, the player won the game
    if (this.y < 10){
        ctx.font = '50px serif';
        ctx.fillText('You Won!',10,40);

        // Wait 2 seconds, and then clear the message and reset the player
        setTimeout(function(){ return clearMessage();}, 2000);
        setTimeout(function(){ return player.reset();}, 2000);
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle arrow keys input
// The e values are 'left', 'right', 'up', and 'down'
Player.prototype.handleInput = function(e){
    // Once player moves, clear any status messages.
    clearMessage();
    // The player can not go beyond the canvas size of 505 x 606.
    // Each tile size is 101 x 83
    switch (e){
        case ('left'):
            if (this.x > 0){
                this.x -= 101;
                this.tile = xyTileNum(this.x, this.y);
                // if obstacle, undo
                if (tracker.hasObstacle(this.tile)){
                    this.x += 101;
                    this.tile = xyTileNum(this.x, this.y);
                }
            }
            break;
        case ('right'):
            if (this.x < 404){
                this.x += 101;
                this.tile = xyTileNum(this.x, this.y);
                // if obstacle, undo
                if (tracker.hasObstacle(this.tile)){
                    this.x -= 101;
                    this.tile = xyTileNum(this.x, this.y);
                }
            }
            break;
        case ('up'):
            if (this.y > 0){
                this.y -= 83;
                this.tile = xyTileNum(this.x, this.y);
                // if obstacle, undo
                if (tracker.hasObstacle(this.tile)){
                    this.y += 83;
                    this.tile = xyTileNum(this.x, this.y);
                }
            }
            break;
        case ('down'):
            if (this.y < 332){
                this.y += 83;
                this.tile = xyTileNum(this.x, this.y);
                // if obstacle, undo
                if (tracker.hasObstacle(this.tile)){
                    this.y -= 83;
                    this.tile = xyTileNum(this.x, this.y);
                }
            }
            break;
    }
};

// Obstacle class
// This is the rock that blocks the player from entering a tile.
var Obstacle = function() {
    this.sprite = 'images/Rock.png';
    this.reset();
};

// Draw the obstacle on the screen
Obstacle.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Change Obstacle position
Obstacle.prototype.reset = function(){
    // Select a column
    var col = Math.floor(Math.random() * 5);
    this.x = col * 101;
    // Row 4 * tile height 83 - "centering" 40
    this.y = 292;
    this.tile = xyTileNum(this.x, this.y);
    tracker.setTileTrue(this.tile);
};

// Tracker tracks where the Obstacles are located
// New Trackers are set to false for all 30 tiles
var Tracker = function(){
    this.tiles = [];
    this.numTiles = 30;
    this.reset();
}

// Resets all tiles to be false, which means no Obstacles are tracked on the tiles.
Tracker.prototype.reset = function(){
    for (var i = 0; i < this.numTiles; i++){
        this.tiles[i] = false;
    }
}

// Pass in the tile number to set it to true
Tracker.prototype.setTileTrue = function(tileNum){
    this.tiles[tileNum] = true;
}

// Returns whether the parameter is true or false
Tracker.prototype.hasObstacle = function(tileNum) {
    return this.tiles[tileNum];
}

// Instantiate the objects.
var allEnemies = [];
var numOfEnemies = 7;
for (var i = 0; i < numOfEnemies; i++){
    allEnemies[i] = new Enemy();
}
var tracker = new Tracker();
var allObstacles = [];
for (var j = 0; j < 3; j++){
    allObstacles[j] = new Obstacle();
}
var player = new Player();

// Clear messages at the top of the canvas
function clearMessage(){
    ctx.clearRect(0,0,505,50);
}

// Converts the x, y coordinate parameters and
// returns a corresponding tile number.
// The first row are the tiles 0, 1, 2, 3, and 4.
// The last row are the tiles 25, 26, 27, 28, amd 29.
// The first row is row 0, and the first column is column 0
function xyTileNum(x, y) {
    var col = x / 101;
    var row = (y + 40) / 83;
    var tile = row * 5 + col;
    return tile;
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
