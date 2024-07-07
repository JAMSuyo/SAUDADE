export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;

        // Add enemy to scene and enable physics
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        // Set other properties like health, speed, etc.
        this.health = 100;
        this.speed = 10; // Adjust as needed

        this.setSize(20, 20);
        this.setOffset(8, 8);

        // Reference to the player
        this.player = this.scene.player; // Assuming player is already defined in the scene
    }

    takeDamage(damage) {
        this.health -= damage;

    }

    update() {
        // Move towards player if player exists and is within chase distance
        if (this.player) {
            const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
            this.chaseDistance = 80;

            if (distanceToPlayer <= this.chaseDistance) {
                this.scene.physics.moveToObject(this, this.player, this.speed);
                
            } else {
                // Optionally, add idle or patrolling behavior when player is out of range
                // Example: Stop moving and play idle animation
                this.setVelocity(0);
                
            }
        }
    }
}


export class Ghost extends Enemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Customize properties specific to Ghosts
        this.health = 50; // Ghosts have less health
        this.speed = 80; // Ghosts are faster

        this.setTexture('ghost'); 
        this.setSize(32, 32); 
        this.setOffset(0, 0);
        
    }

    // Override methods if needed
    takeDamage(damage) {
        super.takeDamage(damage); // Call parent method if necessary
        // Additional behavior specific to Ghosts when taking damage
    }

    update() {
        if (this.player) {
            this.scene.physics.moveToObject(this, this.player, this.speed);
        }
    }
}


export class Slime extends Enemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Customize properties specific to Slimes
        this.health = 100;
        this.speed = 60;

        // Additional properties or behaviors specific to Slimes
        this.anims.play('slimeIdle', true);  
    }

    // Override methods if needed
    takeDamage(damage) {
        // super.takeDamage(damage); // Call parent method if necessary
        
        if (this.health - damage <= 0) {
            this.anims.play('slimeDeath', true);
            this.destroy(); // or handle death logic
        } else {
            this.anims.play('slimeHurt', true);
        }
    }

    update() {
        super.update(); // Call parent update method if needed
        
    }
}