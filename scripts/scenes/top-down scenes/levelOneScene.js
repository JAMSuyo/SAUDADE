export default class levelOneScene extends Phaser.Scene {

    constructor() {
        super( 'levelOneScene' );
        this.isAttacking = false;
        this.isInvuln = false;
    }

    create() {
        

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

        

        // Create interaction hide it initially
        this.interactionImage = this.add.image(0, 0, 'eKey').setVisible(false).setDepth(1);
        this.interactionType = null;


        /* MAIN CHARACTER */
        this.player = this.physics.add.sprite(105, 820, 'frontIdle');

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
            //this.physics.add.collider(this.player, this.ghost1, this.resetPlayerPosition, null, this);
            //this.physics.add.collider(this.player, this.ghost2, this.resetPlayerPosition, null, this);


        /* CONTROLS */
        this.cursors = this.input.keyboard.createCursorKeys();
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);        

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
        
    }


    resetPlayerPosition(player, tile) {
        this.player.setPosition(105, 820);
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
    }

    triggerOuterSpike() {
        this.leverPulledOuterSpike.setVisible(true);
        this.leverUnpulledOuterSpike.setVisible(false);
        this.trapOnOuter.setVisible(false);
        this.interactionImage.setVisible(false);
        this.trapOnOuter.setCollisionByExclusion([]); 
    }

    triggerInnerSpike() {
        this.leverPulledInnerSpike.setVisible(true);
        this.leverUnpulledInnerSpike.setVisible(false);
        this.trapOnInner.setVisible(false);
        this.interactionImage.setVisible(false);
        this.trapOnInner.setCollisionByExclusion([]); 
    }

    disableClosedLayer(player, tile) {
        this.Close.setVisible(false);
        this.Close.setCollisionByExclusion([]); 
        this.key.setVisible(false);
        this.key.setCollisionByExclusion([]); 
    }

    transitionToNextLevel(player, tile) {
        this.scene.start('levelTwoBootScene');
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
        }
        
    }
}