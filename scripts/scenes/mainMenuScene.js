export default class mainMenuScene extends Phaser.Scene {

    constructor() {
        super( 'mainMenuScene' );
    }

    create() {
        this.mainMenuBG = this.add.image( 0, 0, 'mainMenuBG' ).setOrigin( 0, 0 );
        this.mainMenuBG.setDisplaySize( this.cameras.main.width, this.cameras.main.height );

        // // START BUTTON
        // const startButton = this.add.image( this.cameras.main.width / 1.2, 300, 'startButton' ) // Start off-screen to the left
        // startButton.setOrigin( 0.5 );
        // startButton.setInteractive();
        // startButton.setScale( 0.2 );
        // startButton.on( 'pointerdown', () => {
        //     this.scene.start( 'tutorialLevelScene' );
        //     // this.backgroundMusic.stop();
        // });

        // START BUTTON
        const startButton = this.add.image( 0,0, 'startButton' ) // Start off-screen to the left
        startButton.setOrigin( 0.5 );
        startButton.setInteractive();
        startButton.setScale( 0.2 );
        startButton.on( 'pointerdown', () => {
            this.scene.start( 'levelOneScene' );
            // this.backgroundMusic.stop();
        });

        // CREDITS BUTTON
        const creditButton = this.add.image(this.cameras.main.width / 1.2, 375, 'creditsButton'); // Start off-screen to the right
        creditButton.setOrigin(0.5);
        creditButton.setInteractive();
        creditButton.setScale(0.2);
        creditButton.on('pointerdown', () => {
            if (!this.scene.isActive('creditScene')) {
                //this.scene.stop('titleScene');
                //this.scene.start('creditScene');
                // this.backgroundMusic.stop();
            }
        });

        // QUIT BUTTON
        const quitButton = this.add.image(this.cameras.main.width / 1.2, 445, 'quitButton'); // Start off-screen at the bottom
        quitButton.setOrigin(0.5);
        quitButton.setInteractive();
        quitButton.setScale(0.2);
        quitButton.on('pointerdown', () => {
            if (window.confirm("Are you sure you want to quit?")) {
                window.close();
            }
            // this.backgroundMusic.stop();
        });
    }
}

// MISSING SOUND