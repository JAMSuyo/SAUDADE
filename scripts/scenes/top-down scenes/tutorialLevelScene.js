import Bullet from "./bullets.js";
import Enemy from "./enemy.js";
import { Ghost } from "./enemy.js";
import { Slime } from "./enemy.js";

export default class tutorialLevelScene extends Phaser.Scene {
    
    constructor() {
        super('tutorialLevelScene');
        this.isAttacking = false;
        this.isInvuln = false;
        
    }

    preload() {
        this.load.spritesheet( 'slimeAttack', '../assets/art/characters/spritesheets/enemies/slime/slimeAttack.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeDeath', '../assets/art/characters/spritesheets/enemies/slime/slimeDeath.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeHurt', '../assets/art/characters/spritesheets/enemies/slime/slimeHurt.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeIdle', '../assets/art/characters/spritesheets/enemies/slime/slimeIdle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeWalk', '../assets/art/characters/spritesheets/enemies/slime/slimeWalk.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet( 'magicBolt', '../assets/art/visual effects/magicBolt.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {

        this.lives = 3;
        
        

        /* TILE MAP */
        // Creating Tilemap
        const map = this.make.tilemap({ key: 'Tutorial' });
        const tileset = map.addTilesetImage("Tileset1", 'tiles1');
        
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Create layers
        const ground = map.createLayer('Ground', tileset, 0, 0);
        const collision = map.createLayer('Collision', tileset, 0, 0);
        this.barClosed = map.createLayer('Bar-Tome', tileset, 0, 0);
        this.tome = map.createLayer('Tome', tileset, 0, 0);
        const doorOpen = map.createLayer('Finish-Line', tileset, 0, 0);
        this.doorClose = map.createLayer('Door-Closed', tileset, 0, 0);
        this.leverUnpulled = map.createLayer('Lever-Unpulled', tileset, 0, 0);
        this.leverPulled = map.createLayer('Lever-Pulled', tileset, 0, 0);
        this.key = map.createLayer('Key', tileset, 0, 0);
        this.trapsOff = map.createLayer('Traps-Off', tileset, 0, 0);
        this.trapsOn = map.createLayer('Traps-On', tileset, 0, 0);

        this.hp = map.createLayer('HP', tileset, 0, 0 );
        this.shield = map.createLayer('Shield', tileset, 0, 0);
        this.dmg = map.createLayer('Dmg', tileset, 0, 0);

        const background = map.createLayer('Background', tileset, 0, 0);

        

        // Make the 'Lever-Pulled' layer invisible
        this.leverPulled.setVisible(false);
        this.trapsOff.setVisible(true);

        /* MAIN CHARACTER */
        this.player = this.physics.add.sprite(200, 100, 'frontIdle');

        // Camera follow the player
        this.cameras.main.startFollow(this.player);

        // > Back Anims
        this.anims.create({
            key: 'backAttack',
            frames: this.anims.generateFrameNumbers('backAttack', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'backHit',
            frames: this.anims.generateFrameNumbers('backHit', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'backIdle',
            frames: this.anims.generateFrameNumbers('backIdle', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'backWalk',
            frames: this.anims.generateFrameNumbers('backWalk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        console.log('back anims')
        // > Front Anims

        this.anims.create({
            key: 'frontAttack',
            frames: this.anims.generateFrameNumbers('frontAttack', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'frontHit',
            frames: this.anims.generateFrameNumbers('frontHit', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'frontIdle',
            frames: this.anims.generateFrameNumbers('frontIdle', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'frontWalk',
            frames: this.anims.generateFrameNumbers('frontWalk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // > Left Anims

        this.anims.create({
            key: 'leftAttack',
            frames: this.anims.generateFrameNumbers('leftAttack', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'leftHit',
            frames: this.anims.generateFrameNumbers('leftHit', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'leftIdle',
            frames: this.anims.generateFrameNumbers('leftIdle', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'leftWalk',
            frames: this.anims.generateFrameNumbers('leftWalk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // > Right Anims

        this.anims.create({
            key: 'rightAttack',
            frames: this.anims.generateFrameNumbers('rightAttack', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'rightHit',
            frames: this.anims.generateFrameNumbers('rightHit', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'rightIdle',
            frames: this.anims.generateFrameNumbers('rightIdle', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'rightWalk',
            frames: this.anims.generateFrameNumbers('rightWalk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.player.body.setSize(8, 8);

        /* ENEMY */

        this.ghostEnemies = this.physics.add.group({
            classType: Ghost,
            runChildUpdate: true
        });

        this.createAnimations();
        this.slimeEnemies = this.physics.add.group({
            classType: Slime,
            runChildUpdate: true
        });
        
        this.createEnemies();
        

        // Collision
        collision.setCollisionByExclusion([-1]);
        this.doorClose.setCollisionByExclusion([-1]);
        this.barClosed.setCollisionByExclusion([-1]);
        this.trapsOn.setCollisionByExclusion([-1]);
        this.leverUnpulled.setCollisionByExclusion([-1]);
        this.tome.setCollisionByExclusion([-1]);
        this.key.setCollisionByExclusion([-1]);
        doorOpen.setCollisionByExclusion([-1]);

        
        // Enable Collision
        this.physics.add.collider(this.player, collision);
        this.physics.add.collider(this.slimeEnemies, collision);
        this.physics.add.collider(this.player, this.doorClose);
        this.physics.add.collider(this.player, this.barClosed);
        this.physics.add.collider(this.player, this.trapsOn, this.resetPlayerPosition, null, this);
        this.physics.add.collider(this.player, this.leverUnpulled, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.tome, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.key, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, doorOpen, this.endOfTutorial, null, this);
        this.physics.add.collider(this.player, this.ghostEnemies, this.resetPlayerPositionEnemy, null, this);
        this.physics.add.collider(this.player, this.slimeEnemies, this.resetPlayerPositionEnemy, null, this);

        // Create interaction image and hide it initially
        this.interactionImage = this.add.image(0, 0, 'eKey').setVisible(false).setDepth(1);
        this.interactionType = null;

        /* CONTROLS */
        this.cursors = this.input.keyboard.createCursorKeys();
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);        
        console.log('controls')

        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown() || pointer.touchstart) {
                this.isAttacking = true; // Set the attacking flag
                this.player.setVelocity(0); // Stop player movement
                let animKey = 'frontAttack'; // Default animation
                switch (this.lastDirection) {
                    case 'left':
                        animKey = 'leftAttack';
                        break;
                    case 'right':
                        animKey = 'rightAttack';
                        break;
                    case 'up':
                        animKey = 'backAttack';
                        break;
                    case 'down':
                        animKey = 'frontAttack';
                        break;
                }
                console.log('Playing animation:', animKey);
                this.player.anims.play(animKey, true).once('animationcomplete', () => {
                    this.isAttacking = false; // Reset the attacking flag when the animation is complete
                });
            }
        });

        
        
        

        this.magicBolts = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        });

        this.input.on('pointerdown', this.shootBullet, this);

        this.physics.add.collider( this.magicBolts, this.enemies, this.hitEnemy, null, this);
        this.physics.add.collider( this.magicBolts, this.slimeEnemies, this.hitEnemy, null, this);

        if (!this.anims.exists('magicBoltAnim')) {
            this.anims.create({
                key: 'magicBoltAnim',
                frames: this.anims.generateFrameNumbers('magicBolt', { start: 0, end: 29 }),
                frameRate: 30,
                repeat: -1
            });
        }



        /* COLLECTIBLES */

        this.dmg.setTileIndexCallback( 709, this.collectDMG, this );
        this.physics.add.overlap( this.player, this.dmg );
        
        this.dmgFX = this.add.sprite(0, 0, 'blueFire').setVisible(false);
        this.anims.create({
            key: 'dmgFX',
            frames: this.anims.generateFrameNumbers( 'blueFire', { start: 0, end: 60 }),
            frameRate: 10, 
            repeat: -1
        });
        this.dmgFX.setSize( 16, 16 );
        console.log('dmgfx')
        

        this.hp.setTileIndexCallback( 781, this.collectHP, this );
        this.physics.add.overlap( this.player, this.hp );


        this.shield.setTileIndexCallback( 711, this.collectShield, this );
        this.physics.add.overlap( this.player, this.shield );
        
    }

    createAnimations() {
        this.anims.create({
            key: 'slimeAttack',
            frames: this.anims.generateFrameNumbers( 'slimeAttack', { start: 0, end: 14 }),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'slimeDeath',
            frames: this.anims.generateFrameNumbers( 'slimeDeath', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'slimeHurt',
            frames: this.anims.generateFrameNumbers( 'slimeHurt', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'slimeIdle',
            frames: this.anims.generateFrameNumbers( 'slimeIdle', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'slimeWalk',
            frames: this.anims.generateFrameNumbers( 'slimeWalk', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    }

    createEnemies() {
        let x = Phaser.Math.Between(100, 900);
        let y = Phaser.Math.Between(100, 760);

        let slime1 = new Enemy( this, 480, 144, 'slimeIdle', null );
        this.slimeEnemies.add( slime1 );

        let slime2 = new Enemy( this, 320, 464, 'slimeIdle', null );
        this.slimeEnemies.add( slime2 );

        let slime3 = new Enemy( this, 96, 576, 'slimeIdle', null );
        this.slimeEnemies.add( slime3 );

        let slime4 = new Enemy( this, 688, 448, 'slimeIdle', null );
        this.slimeEnemies.add( slime4 );

        let slime5 = new Enemy( this, 784, 576, 'slimeIdle', null );
        this.slimeEnemies.add( slime5 );

        let slime6 = new Enemy( this, 768, 752, 'slimeIdle', null );
        this.slimeEnemies.add( slime6 );

        this.slimeEnemies.children.each((slime) => {
            slime.setCollideWorldBounds(true);
        }, this);

        let ghost1 = new Enemy( this, x, y, 'ghost', null );
        this.ghostEnemies.add( ghost1 );

        this.ghostEnemies.children.each((ghost) => {
            ghost.setCollideWorldBounds(false);
        }, this);
    }

    resetPlayerPosition(player, tile) {
        if (!this.isInvuln) {
            this.lives -= 1; // Decrease life
            if (this.lives <= 0) {
                this.scene.start('loseScene'); 
            } else {
                this.player.setPosition(200, 100); 
            }
        }
    }
    
    resetPlayerPositionEnemy(player, enemy) {
        if (!this.isInvuln) {
            this.lives -= 1; // Decrease life
            if (this.lives <= 0) {
                this.scene.start('loseScene'); 
            } else {
                this.player.setPosition(200, 100); 
            }
        }
    }

    showInteractionImage(player, tile) {
        this.interactionImage.setPosition(this.player.x, this.player.y - 50);
        this.interactionImage.setVisible(true);

        if (tile.layer.name === 'Lever-Unpulled') {
            this.interactionType = 'lever';
        } else if (tile.layer.name === 'Tome') {
            this.interactionType = 'tome';
        } else if (tile.layer.name === 'Key') {
            this.interactionType = 'key';
        }
        console.log('player')
    }

    pullLever() {
        this.leverUnpulled.setVisible(false);
        this.leverPulled.setVisible(true);
        this.trapsOn.setVisible(false);
        this.trapsOn.setCollisionByExclusion([]);
        this.interactionImage.setVisible(false);
        console.log('lever')
    }

    getTome() {
        this.tome.setVisible(false);
        this.barClosed.setVisible(false);
        this.barClosed.setCollisionByExclusion([]);
        this.tome.setCollisionByExclusion([]);
        this.interactionImage.setVisible(false);
        console.log('tome')
    }

    getKey() {
        this.doorClose.setVisible(false);
        this.key.setVisible(false);
        this.doorClose.setCollisionByExclusion([]);
        this.key.setCollisionByExclusion([]);
        this.interactionImage.setVisible(false);
        console.log('key')
    }

    endOfTutorial(player, tile){
        this.scene.start('levelOneBootScene');
    }

    shootBullet(pointer) {
        var bullet = this.magicBolts.get(); 
    
        if (bullet) {
            bullet.fire(this.player.x, this.player.y);
    
            // Get game bounds
            const gameBounds = this.scale.gameSize;
            
            // Clamp pointer coordinates to be within game bounds
            const targetX = Phaser.Math.Clamp(pointer.x, 0, gameBounds.width);
            const targetY = Phaser.Math.Clamp(pointer.y, 0, gameBounds.height);
            
            // Calculate angle towards clamped pointer coordinates
            var angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, targetX, targetY);
    
            // Rotate bullet sprite towards pointer
            bullet.setRotation(angle);
    
            // Set bullet velocity towards clamped pointer coordinates
            this.physics.velocityFromRotation(angle, 500, bullet.body.velocity);
        }
    }
        

    hitEnemy(bullet, enemy) {
        // if (!bullet.active) return; // Check if bullet is active (to prevent multiple hits)
    
        // bullet.destroy(); // Destroy bullet
        // enemy.takeDamage(50); // Inflict damage on the enemy
    
        // // Check if enemy should be destroyed (second hit or player has damage power-up)
        // if (!enemy.active) return;
    
        // // Second hit or instant destruction if player has damage power-up
        // setTimeout(() => {
        //     if (enemy.active) {
        //         enemy.takeDamage(50); // Second hit
        //     }
        // }, 500);
        bullet.destroy();
        enemy.destroy();
    }
    
    

    collectDMG( sprite, tile ) {
        this.dmg.removeTileAt( tile.x, tile.y ); 
        
        let tintColor = 0xff0000; 
        let tintDuration = 10000; 

        // Tint the sprite immediately
        this.player.setTint(tintColor);

        // Create a tween to remove the tint after tintDuration
        this.tweens.add({
            targets:this.player,
            tint: 0xffffff, // Return to no tint (white)
            duration: tintDuration,
            onComplete: function() {
                // Optionally, perform actions after the tint is removed
                console.log('Tint effect complete!');
             }
        });

    }

    collectHP( sprite, tile ) {
        this.hp.removeTileAt( tile.x, tile.y );

        let tintColor = 0x53ae42;
        let tintDuration = 2000;

        this.player.setTint(tintColor);

        this.tweens.add({
            targets:this.player,
            tint: 0xffffff, // Return to no tint (white)
            duration: tintDuration,
            onComplete: function() {
                // Optionally, perform actions after the tint is removed
                console.log('Tint effect complete!');
             }
        });

        this.lives += 1;
        // hearts
    }

    collectShield( sprite, tile ) {
        this.shield.removeTileAt( tile.x, tile.y );

        let tintColor = 0x3270e1;
        let tintDuration = 10000;

        this.isInvuln = true;
        this.player.setTint(tintColor);

        this.tweens.add({
            targets:this.player,
            tint: 0xffffff, // Return to no tint (white)
            duration: tintDuration,
            onComplete: function() {
                // Optionally, perform actions after the tint is removed
                console.log('Tint effect complete!');
                this.isInvuln = false;
             }
        });
    }


    update() {
        const playerSpeed = 100;
    
        if (!this.isAttacking) { // Only handle movement if not attacking
            // Reset player velocity
            this.player.setVelocity(0);
    
            // Horizontal movement
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-playerSpeed);
                this.player.anims.play('leftWalk', true);
                this.lastDirection = 'left';
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(playerSpeed);
                this.player.anims.play('rightWalk', true);
                this.lastDirection = 'right';
            }
    
            // Vertical movement
            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-playerSpeed);
                this.player.anims.play('backWalk', true);
                this.lastDirection = 'up';
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(playerSpeed);
                this.player.anims.play('frontWalk', true);
                this.lastDirection = 'down';
            }
    
            // If no movement keys are down, stop animations and play idle animation based on lastDirection
            if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
                this.player.setVelocity(0);
    
                switch (this.lastDirection) {
                    case 'left':
                        this.player.anims.play('leftIdle', true);
                        break;
                    case 'right':
                        this.player.anims.play('rightIdle', true);
                        break;
                    case 'up':
                        this.player.anims.play('backIdle', true);
                        break;
                    case 'down':
                        this.player.anims.play('frontIdle', true);
                        break;
                    default:
                        this.player.anims.play('frontIdle', true); // Default to front idle if no last direction
                        break;
                }
            }
        }

        // Check for interaction key press
        if (this.interactionImage.visible && Phaser.Input.Keyboard.JustDown(this.eKey)) {
            if (this.interactionType === 'lever') {
                this.pullLever();
            } else if (this.interactionType === 'tome') {
                this.getTome();
            } else if (this.interactionType === 'key') {
                this.getKey();
            }
            console.log('player')
        }

        if (this.dmgFX.visible) {
            let offsetX = 10;
            let offsetY = -20;
            this.dmgFX.setPosition(this.player.x + offsetX, this.player.y + offsetY);
        }

        // Ghost follow Kore
        if (this.ghostEnemies && this.ghostEnemies.body) {
            this.physics.moveToObject(this.ghostEnemies, this.player, 80);
        }        
        
    }

    
}


