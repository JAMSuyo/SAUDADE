import Bullet from "./bullets.js";
import Enemy from "./enemy.js";
import { Ghost } from "./enemy.js";
import { Slime } from "./enemy.js";

export default class levelOneScene extends Phaser.Scene {

    constructor() {
        super( 'levelOneScene' );
        this.isAttacking = false;
        this.isInvuln = false;
    }

    create() {

        this.lives = 3;
        

        /* TILE MAP */
        // Creating Tilemap
        const mapOne = this.make.tilemap({ key: "Level1" });
        const tilesetTwo = mapOne.addTilesetImage("Tileset2", 'tiles2');

        // Layers using mapOne
        const blacklayer = mapOne.createLayer('black', tilesetTwo, 0, 0);
        const brokenWoodenFloor = mapOne.createLayer('BrokenWoodenFloor', tilesetTwo, 0, 0);
        const groundLayer = mapOne.createLayer('ground', tilesetTwo, 0, 0);
        const collisionLayer = mapOne.createLayer('collision', tilesetTwo, 0, 0);
        this.fenceClosed = mapOne.createLayer('Fence-Closed', tilesetTwo, 0, 0);
        this.endLayer = mapOne.createLayer('StairsToNextLevel', tilesetTwo, 0, 0);
        
        this.leverPulledLayer = mapOne.createLayer('lever-Pulled', tilesetTwo, 0, 0);
        this.leverUnpulledLayer = mapOne.createLayer('lever-Unpulled', tilesetTwo, 0, 0);
        this.leverPulledInnerSpike = mapOne.createLayer('leverPulledInnerSpike', tilesetTwo, 0, 0);
        this.leverPulledOuterSpike = mapOne.createLayer('leverPulledOuterSpike', tilesetTwo, 0, 0);
        this.leverUnpulledOuterSpike = mapOne.createLayer('leverUnpulledOuterSpike', tilesetTwo, 0, 0);
        this.leverUnpulledInnerSpike = mapOne.createLayer('leverUnpulledInnerSpike', tilesetTwo, 0, 0);
        
        this.trapOff = mapOne.createLayer('Trap-Off', tilesetTwo, 0, 0);
        this.trapOnOuter = mapOne.createLayer('Trap-On-Outer', tilesetTwo, 0, 0);
        this.trapOnInner = mapOne.createLayer('Trap-On-Inner', tilesetTwo, 0, 0);
        this.Close = mapOne.createLayer('Closed', tilesetTwo, 0, 0);
        this.key = mapOne.createLayer('Key', tilesetTwo, 0, 0);

        this.shield = mapOne.createLayer('Shield', tilesetTwo, 0, 0);
        this.dmg = mapOne.createLayer('Damage', tilesetTwo, 0, 0);
        this.hp = mapOne.createLayer('Health', tilesetTwo, 0, 0);

        this.fakeKeyLayer = mapOne.createLayer('Fake-Key', tilesetTwo, 0, 0); 
        const backgroundLayer = mapOne.createLayer('background', tilesetTwo, 0, 0);


        
        this.physics.world.setBounds(0, 0, mapOne.widthInPixels, mapOne.heightInPixels);
        this.cameras.main.setBounds(0, 0, mapOne.widthInPixels, mapOne.heightInPixels);

        
        // Initial Levers
        this.leverPulledLayer.setVisible(false);
        this.leverPulledOuterSpike.setVisible(false);
        this.leverPulledInnerSpike.setVisible(false);
        this.trapOff.setVisible(true);

        // Collision
        collisionLayer.setCollisionByExclusion([-1]);
        brokenWoodenFloor.setCollisionByExclusion([-1]);
        this.leverUnpulledLayer.setCollisionByExclusion([-1]);
        this.leverUnpulledOuterSpike.setCollisionByExclusion([-1]);
        this.leverUnpulledInnerSpike.setCollisionByExclusion([-1]);
        this.trapOnOuter.setCollisionByExclusion([-1]);
        this.trapOnInner.setCollisionByExclusion([-1]);
        this.fenceClosed.setCollisionByExclusion([-1]);
        this.Close.setCollisionByExclusion([-1]);   
        this.fakeKeyLayer.setCollisionByExclusion([-1]);
        this.key.setCollisionByExclusion([-1]);
        this.endLayer.setCollisionByExclusion([-1]); 

        
        //Audio
        this.inGameBGMLevelOne = this.sound.add('inGameBGM', { loop: true, volume: .4});
        this.inGameBGMLevelOne.play();

        //SFX
        this.leverpullSFX = this.sound.add('leverSFX', { volume: .8 });
        this.pickUpSFX = this.sound.add('pickUpSFX', { volume: .8 });
        this.swingSFX = this.sound.add('swingSFX', { volume: .8 });
        this.fireballSFX = this.sound.add('fireballSFX', { volume: .2 });
        this.openDoor1 = this.sound.add('openDoor', {volume: 2});
        this.slimeDeathSFX = this.sound.add('slimeDeathSFX', { volume: 1});

        // Create interaction hide it initially
        this.interactionImage = this.add.image(0, 0, 'eKey').setVisible(false).setDepth(1);
        this.interactionType = null;


        /* MAIN CHARACTER */
        this.player = this.physics.add.sprite(100, 450, 'frontIdle');

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

        // Enable Collision
        this.physics.add.collider(this.player, collisionLayer);
        this.physics.add.collider(this.player, brokenWoodenFloor, this.resetPlayerPosition, null, this); 
        this.physics.add.collider(this.player, this.leverUnpulledLayer, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.leverUnpulledOuterSpike, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.leverUnpulledInnerSpike, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.trapOnOuter, this.resetPlayerPosition, null, this);
        this.physics.add.collider(this.player, this.trapOnInner, this.resetPlayerPosition, null, this);
        this.physics.add.collider(this.player, this.fenceClosed);
        this.physics.add.collider(this.player, this.Close);
        this.physics.add.collider(this.player, this.endLayer, this.transitionToNextLevel, null, this); 
        this.physics.add.collider(this.player, this.fakeKeyLayer, this.resetPlayerPosition, null, this); 
        this.physics.add.collider(this.player, this.key, this.disableClosedLayer, null, this); 
        this.physics.add.collider(this.player, this.ghostEnemies, this.resetPlayerPositionEnemy, null, this);
        this.physics.add.collider(this.player, this.slimeEnemies, this.resetPlayerPositionEnemy, null, this);
        //this.physics.add.collider(this.magicBolts, this.ghostEnemies, this.hitEnemy, null, this);
        

        // Create interaction image and hide it initially
        this.interactionImage = this.add.image(0, 0, 'eKey').setVisible(false).setDepth(1);
        this.interactionType = null;

        /* CONTROLS */
        this.cursors = this.input.keyboard.createCursorKeys();
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);        


        this.keys = this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D
        });


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


        this.physics.add.collider(this.magicBolts, this.ghostEnemies, this.hitEnemy, null, this);
        //this.physics.add.collider(this.magicBolts, this.ghost2, this.hitEnemy, null, this);
        
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

        let slime1 = new Slime( this, 32, 240, 'slimeIdle', null );
        this.slimeEnemies.add( slime1 );
        
        let slime2 = new Slime( this, 400, 224, 'slimeIdle', null );
        this.slimeEnemies.add( slime2 );

        let slime3 = new Slime( this, 368, 464, 'slimeIdle', null );
        this.slimeEnemies.add( slime3 );

        let slime4 = new Slime( this, 848, 240, 'slimeIdle', null );
        this.slimeEnemies.add( slime4 );
        
        let slime5 = new Slime( this, 992, 64, 'slimeIdle', null );
        this.slimeEnemies.add( slime5 );

        let slime6 = new Slime( this, 976, 208, 'slimeIdle', null );
        this.slimeEnemies.add( slime6 );

        let slime7 = new Slime( this, 1280, 352, 'slimeIdle', null );
        this.slimeEnemies.add( slime7 );

        this.slimeEnemies.children.each((slime) => {
            slime.setCollideWorldBounds(true);
        }, this);

        // let ghost1 = new Ghost( this, x, y, 'ghost', null );
        // this.ghostEnemies.add( ghost1 );

        // let ghost2 = new Ghost ( this, x, y, 'ghost', null );
        // this.ghostEnemies.add( ghost2 );

        // this.ghostEnemies.children.each((ghost) => {
        //     ghost.setCollideWorldBounds(false);
        // }, this);
    }


    resetPlayerPosition(player, tile) {
        if (!this.isInvuln) {
            this.lives -= 1; // Decrease life
            if (this.lives == 0) {
                this.scene.start('loseLevelOneScene'); 
                this.inGameBGMLevelOne.stop();
            } else {
                this.player.setPosition(100, 450); 
            }
        }
    }
    
    resetPlayerPositionEnemy(player, enemy) {
        if (!this.isInvuln) {
            this.lives -= 1; // Decrease life
            if (this.lives == 0) {
                this.scene.start('loseLevelOneScene');
                this.inGameBGMLevelOne.stop(); 
            } else {
                this.player.setPosition(100, 450); 
            }
        }
    }

    showInteractionImage(player, tile) {
        this.interactionImage.setPosition(this.player.x, this.player.y - 50);
        this.interactionImage.setVisible(true);

        if (tile.layer.name === 'lever-Unpulled') {
            this.interactionType = 'lever';
        } else if (tile.layer.name === 'leverUnpulledOuterSpike') {
            this.interactionType = 'outerSpike';
        } else if (tile.layer.name === 'leverUnpulledInnerSpike') {
            this.interactionType = 'innerSpike';
        }
    }

    pullLeverOne() {
        this.leverPulledLayer.setVisible(true);
        this.leverUnpulledLayer.setVisible(false);
        this.fenceClosed.setVisible(false);
        this.fenceClosed.setCollisionByExclusion([]); 
        this.interactionImage.setVisible(false);
        this.leverpullSFX.play();
    }

    triggerOuterSpike() {
        this.leverPulledOuterSpike.setVisible(true);
        this.leverUnpulledOuterSpike.setVisible(false);
        this.trapOnOuter.setVisible(false);
        this.interactionImage.setVisible(false);
        this.trapOnOuter.setCollisionByExclusion([]);
        this.leverpullSFX.play(); 
    }

    triggerInnerSpike() {
        this.leverPulledInnerSpike.setVisible(true);
        this.leverUnpulledInnerSpike.setVisible(false);
        this.trapOnInner.setVisible(false);
        this.interactionImage.setVisible(false);
        this.trapOnInner.setCollisionByExclusion([]);
        this.leverpullSFX.play();  
    }

    disableClosedLayer(player, tile) {
        this.Close.setVisible(false);
        this.Close.setCollisionByExclusion([]); 
        this.key.setVisible(false);
        this.key.setCollisionByExclusion([]);
        this.openDoor1.play(); 
        this.pickUpSFX.play();
    }

    transitionToNextLevel(player, tile) {
        this.scene.start('levelTwoBootScene');
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

        this.player.setTint(tintColor);

        this.pickUpSFX.play();

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


    update() {

        const playerSpeed = 100;
    
        if (!this.isAttacking) { // Only handle movement if not attacking
            // Reset player velocity
            this.player.setVelocity(0);
    
            // Horizontal movement
            if (this.keys.a.isDown) { 
                this.player.setVelocityX(-playerSpeed);
                this.player.anims.play('leftWalk', true);
                this.lastDirection = 'left';
            } else if (this.keys.d.isDown) {
                this.player.setVelocityX(playerSpeed);
                this.player.anims.play('rightWalk', true);
                this.lastDirection = 'right';
            }
    
            // Vertical movement
            if (this.keys.w.isDown) {
                this.player.setVelocityY(-playerSpeed);
                this.player.anims.play('backWalk', true);
                this.lastDirection = 'up';
            } else if (this.keys.s.isDown) {
                this.player.setVelocityY(playerSpeed);
                this.player.anims.play('frontWalk', true);
                this.lastDirection = 'down';
            }
    
            // If no movement keys are down, stop animations and play idle animation based on lastDirection
            if (!this.keys.w.isDown && !this.keys.a.isDown && !this.keys.s.isDown && !this.keys.d.isDown) {
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
                this.pullLeverOne();
            } else if (this.interactionType === 'outerSpike') {
                this.triggerOuterSpike();
            } else if (this.interactionType === 'innerSpike') {
                this.triggerInnerSpike();
            }
        }
        
        if (this.ghostEnemies && this.ghostEnemies.body) {
            this.physics.moveToObject(this.ghostEnemies, this.player, 80);
        }
    }
}