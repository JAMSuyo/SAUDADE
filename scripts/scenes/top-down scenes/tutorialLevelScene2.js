import Enemy from './enemy.js';

export default class tutorialLevelScene extends Phaser.Scene {
    
    constructor() {
        super('tutorialLevelScene');
        this.isAttacking = false;
    }

    preload() {
        this.load.spritesheet( 'slimeAttack', '../assets/art/characters/spritesheets/enemies/slime/slimeAttack.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeDeath', '../assets/art/characters/spritesheets/enemies/slime/slimeDeath.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeHurt', '../assets/art/characters/spritesheets/enemies/slime/slimeHurt.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeIdle', '../assets/art/characters/spritesheets/enemies/slime/slimeIdle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeWalk', '../assets/art/characters/spritesheets/enemies/slime/slimeWalk.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {

        /* TILE MAP */
        // Creating Tilemap
        const map = this.make.tilemap({ key: 'Tutorial' });
        const tileset = map.addTilesetImage("Tileset1", 'tiles1');

        console.log('tilemap')

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
        const background = map.createLayer('Background', tileset, 0, 0);

        console.log('layers')
        // Make the 'Lever-Pulled' layer invisible
        this.leverPulled.setVisible(false);
        this.trapsOff.setVisible(true);

        console.log('levers')
        /* MAIN CHARACTER */
        this.player = this.physics.add.sprite(200, 100, 'frontIdle');
        console.log('player')

        // Camera follow the player
        this.cameras.main.startFollow(this.player);
        console.log('camera')
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
        // Collision
        collision.setCollisionByExclusion([-1]);
        this.doorClose.setCollisionByExclusion([-1]);
        this.barClosed.setCollisionByExclusion([-1]);
        this.trapsOn.setCollisionByExclusion([-1]);
        this.leverUnpulled.setCollisionByExclusion([-1]);
        this.tome.setCollisionByExclusion([-1]);
        this.key.setCollisionByExclusion([-1]);
        doorOpen.setCollisionByExclusion([-1]);

        console.log('collision')
        
        // Enable Collision
        this.physics.add.collider(this.player, collision);
        this.physics.add.collider(this.player, this.doorClose);
        this.physics.add.collider(this.player, this.barClosed);
        this.physics.add.collider(this.player, this.trapsOn, this.resetPlayerPosition, null, this);
        this.physics.add.collider(this.player, this.leverUnpulled, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.tome, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.key, this.showInteractionImage, null, this);
        // this.physics.add.collider(this.player, doorOpen, this.endOfTutorial, null, this);
        // this.physics.add.collider(this.player, this.ghost, this.resetPlayerPosition, null, this);

        console.log('collision enabled')

        // Create interaction image and hide it initially
        this.interactionImage = this.add.image(0, 0, 'eKey').setVisible(false).setDepth(1);
        this.interactionType = null;

        console.log('interaction')

        

        console.log('setsize')
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
        console.log('attack')


        // /* ENEMIES */
        // this.createAnimations();
        // this.enemies = this.physics.add.group();
        // // this.enemies.setCollisionByExclusion([-1]);
        // this.createEnemies();

        // this.physics.add.collider(this.enemies, this.player, this.enemyPlayerCollision, null, this);
        
    }

    // createAnimations() {
    //     this.anims.create({
    //         key: 'slimeAttack',
    //         frames: this.anims.generateFrameNumbers( 'slimeAttack', { start: 0, end: 14 }),
    //         frameRate: 10,
    //         repeat: 0
    //     });

    //     this.anims.create({
    //         key: 'slimeDeath',
    //         frames: this.anims.generateFrameNumbers( 'slimeDeath', { start: 0, end: 14 }),
    //         frameRate: 10,
    //         repeat: 0
    //     });

    //     this.anims.create({
    //         key: 'slimeHurt',
    //         frames: this.anims.generateFrameNumbers( 'slimeHurt', { start: 0, end: 3 }),
    //         frameRate: 10,
    //         repeat: 0
    //     });

    //     this.anims.create({
    //         key: 'slimeIdle',
    //         frames: this.anims.generateFrameNumbers( 'slimeIdle', { start: 0, end: 5 }),
    //         frameRate: 10,
    //         repeat: -1
    //     });

    //     this.anims.create({
    //         key: 'slimeWalk',
    //         frames: this.anims.generateFrameNumbers( 'slimeWalk', { start: 0, end: 5 }),
    //         frameRate: 10,
    //         repeat: -1
    //     });
    // }

    // createEnemies() {
    //     let enemy1 = new Enemy( this, 480, 144, 'slimeIdle', null );
    //     this.enemies.add( enemy1 );
    // }

    resetPlayerPosition(player, tile) {
        // // Play the 'frontHurt' animation
        // this.anims.play('frontHit', true);
    
        // // Set up a callback to execute when the animation completes
        // this.anims.get('frontHit').once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        //     // Reset player position after animation completes
        //     this.player.setPosition(200, 100);
        // });
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

        // /* ENEMIES */

        // this.physics.overlap(this.player, this.enemies, this.playerAttackEnemy, null, this);
        // this.physics.overlap(this.player, this.enemies, this.enemyPlayerCollision, null, this);

        // this.enemies.getChildren().forEach( enemy => {
        //     enemy.update();
        // })
    }

    // playerAttackEnemy(player, enemy) {
    //     let attackRange = 32; // Adjust based on your game's needs
    //     let damageAmount = 50; // Adjust based on your game's needs
    
    //     // Check if player is attacking and within range of enemy
    //     if (this.isAttacking && this.player.anims.currentAnim.key.includes('Attack') && Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y) < attackRange) {
    //         // Reduce enemy's health
    //         enemy.health -= damageAmount;
            
    //         // Play hurt animation on enemy
    //         enemy.anims.play('slimeHurt', true);
    
    //         // Check if enemy health drops to zero or below
    //         if (enemy.health <= 0) {
    //             // Play death animation or trigger other events before destroying
    //             enemy.anims.play('slimeDeath', true); // Ensure 'slimeDeath' animation exists and is configured
    //             // Destroy the enemy after the death animation completes
    //             enemy.once('animationcomplete', () => {
    //                 enemy.destroy();
    //             });
    //         }
    //     }
    // }
    
    // enemyPlayerCollision(enemy, player) {
    //     // // Determine how much damage the player's attack does
    //     // let damage = 50; // Adjust as needed
    
    //     // // Call enemy's takeDamage method
    //     // //enemy.takeDamage(damage);

    // }
}


