import Bullet from "./bullets.js";
import Enemy from "./enemy.js";
import { Ghost } from "./enemy.js";
import { Slime } from "./enemy.js";

export default class levelTwoScene extends Phaser.Scene {

    constructor() {
        super( 'levelTwoScene' );
    }

    create() {

        // Tilemap
        const mapTwo = this.make.tilemap({ key: "Level2" });
        const tilesetThree = mapTwo.addTilesetImage("Tileset3", 'tiles3');

        // Map layers
        const Ground = mapTwo.createLayer('Ground', tilesetThree, 0, 0);
        this.Tome = mapTwo.createLayer('Tome', tilesetThree, 0, 0);
        const collisionLayer = mapTwo.createLayer('Collision', tilesetThree, 0, 0);
        const backgroundLayer = mapTwo.createLayer('Background', tilesetThree, 0, 0);
        this.shieldProject = mapTwo.createLayer('Shield', tilesetThree, 0, 0);
        this.Potion = mapTwo.createLayer('Potion', tilesetThree, 0, 0);
        this.Damageup = mapTwo.createLayer('Damageup', tilesetThree, 0, 0);
        this.endLayer = mapTwo.createLayer('Final-Line', tilesetThree, 0, 0);
        this.barClosed = mapTwo.createLayer('Bar-Closed', tilesetThree, 0, 0);


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
        collisionLayer.setCollisionByExclusion([-1]);
        this.Tome.setCollisionByExclusion([-1]);
        this.endLayer.setCollisionByExclusion([-1]);

        this.inGameBGMLevelOne = this.sound.add('inGameBGM', { loop: true, volume: .4});
        this.inGameBGMLevelOne.play();

        this.pickUpSFX = this.sound.add('pickUpSFX', { volume: .8 });
        this.swingSFX = this.sound.add('swingSFX', { volume: .8 });
        this.fireballSFX = this.sound.add('fireballSFX', { volume: .2 });
        this.openDoor1 = this.sound.add('openDoor', {volume: 2});
        this.slimeDeathSFX = this.sound.add('slimeDeathSFX', { volume: 1});

        // Enable collision
        this.physics.add.collider(this.player, collisionLayer);
        this.physics.add.collider(this.player, this.Tome, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.endLayer, this.endOfGame, null, this);

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
                        this.swingSFX.play();
                        break;
                    case 'right':
                        animKey = 'rightAttack';
                        this.swingSFX.play();
                        break;
                    case 'up':
                        animKey = 'backAttack';
                        this.swingSFX.play();
                        break;
                    case 'down':
                        animKey = 'frontAttack';
                        this.swingSFX.play();
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

        let slime1 = new Slime( this, 480, 144, 'slimeIdle', null );
        this.slimeEnemies.add( slime1 );

        let slime2 = new Slime( this, 320, 464, 'slimeIdle', null );
        this.slimeEnemies.add( slime2 );

        let slime3 = new Slime( this, 96, 576, 'slimeIdle', null );
        this.slimeEnemies.add( slime3 );

        let slime4 = new Slime( this, 688, 448, 'slimeIdle', null );
        this.slimeEnemies.add( slime4 );

        let slime5 = new Slime( this, 784, 576, 'slimeIdle', null );
        this.slimeEnemies.add( slime5 );

        let slime6 = new Slime( this, 768, 752, 'slimeIdle', null );
        this.slimeEnemies.add( slime6 );

        this.slimeEnemies.children.each((slime) => {
            slime.setCollideWorldBounds(true);
        }, this);

        // let ghost1 = new Ghost( this, x, y, 'ghost', null );
        // this.ghostEnemies.add( ghost1 );

        // this.ghostEnemies.children.each((ghost) => {
        //     ghost.setCollideWorldBounds(false);
        // }, this);
    }

    resetPlayerPosition(player, tile) {
        if (!this.isInvuln) {
            this.lives -= 1; // Decrease life
            if (this.lives <= 0) {
                this.scene.start('loseScene');
                this.inGameBGMLevelOne.stop(); 
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
                this.inGameBGMLevelOne.stop();  
            } else {
                this.player.setPosition(200, 100); 
            }
        }
    }

    showInteractionImage(player, tile) {
        this.interactionImage.setPosition(this.player.x, this.player.y - 50);
        this.interactionImage.setVisible(true);
        this.interactionType = 'tome';
    }

    collectBook() {
        this.Tome.setVisible(false);
        this.barClosed.setVisible(false);
        this.barClosed.setCollisionByExclusion([]);
        this.Tome.setCollisionByExclusion([]);
        this.interactionImage.setVisible(false);
        this.pickUpSFX.play();
        this.openDoor1.play();
    }

    endOfGame(player, tile) {
        this.scene.start("WinningScene");
        this.inGameBGMLevelOne.stop();
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
            this.fireballSFX.play();
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
        this.slimeDeathSFX.play();
    }

    collectDMG( sprite, tile ) {
        this.dmg.removeTileAt( tile.x, tile.y ); 
        
        let tintColor = 0xff0000; 
        let tintDuration = 10000; 

        this.pickUpSFX.play();

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

        this.pickUpSFX.play();

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

        this.pickUpSFX.play();

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
}