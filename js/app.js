// Enemies our player must avoid
"use strict";
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = x;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is nt passed boundary
    if(this.x < this.boundary){
        //  Move forward
        // Increment x by speed * dt
        this.x += this.speed * dt;
    } else {
        //Reset positions to start
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Create a Hero Class
class Hero {
    // Create a Constructor
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2; 
        this.startY = (this.jump * 4) + 55; 
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }

    // Draw hero sprite on current x and y co-ordinate position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Update hero's x and y property according to input
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if(this.y > 0) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if(this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if(this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }
    } 

    update() {
        // Check collisioni here
        for(let enemy of allEnemies) {
            //Did player x and y collide with enemy?
            if(this.y === enemy.y && (enemy.x + 75 > this.x && enemy.x < this.x + 75)) {
                this.reset();
            }            
        }
        // Check Win here
        // did player x and y reach final tile?
        if(this.y === -28) {
            this.victory = true;;
        }
    }
    // Reset Hero
    reset() {
        // Set x and y to the starting x and y
        this.x = this.startX;
        this.y = this.startY;
    }
}

const player = new Hero();
const allEnemies = [
    new Enemy(-101, 0, 200),
    new Enemy(-101, 83, 300),
    new Enemy((-101 * 2.5), 83, 300),
    new Enemy((-101 * 1.5), 166, 250)
];


