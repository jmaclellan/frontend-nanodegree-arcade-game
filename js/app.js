//Enemy class with x,y, and speed for parameters
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};


//Delta time times speed for bug on canvas.
//Loops enemy instances to repeat once they go off the canvas.
Enemy.prototype.update = function(dt) {
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -10;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.x = 205;
    this.y = 425;
    this.sprite = 'images/char-boy.png';
};


//Reset player back to starting position 
Player.prototype.reset = function() {
    this.x = 205;
    this.y = 425;
};

//Mozilla documentation that helped in creating collision function:
//https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Player.prototype.collision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 50 &&
            this.y + 50 > allEnemies[i].y) {
                this.reset();
                break;
        }

    }
};

//Invokes collision in the update function
Player.prototype.update = function() {
    this.collision();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Adds player control by keyboard arrows plus confines player to game canvas
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x > 10) {
                this.x -= 25;
                break;
            }
        case 'right':
            if (this.x < 400) {
                this.x += 25;
                break;
            }
        case 'up':
            if (this.y > 10) {
                this.y -= 25;
                break;
            } else if (this.y <= 100) {
                this.reset();
                break;
            }
        case 'down':
            if (this.y < 425) {
                this.y += 25;
                break;
            }
    }

};

//Instantiates three enemy objects
var enemy1 = new Enemy(-20, 60, 75);
var enemy2 = new Enemy(-100, 135, 90);
var enemy3 = new Enemy(-75, 215, 55);

//Places enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];


// Place the player object in a variable called player
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