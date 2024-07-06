export default class tutorialBootScene extends Phaser.Scene {

    constructor() {
        super( 'tutorialBootScene' );
    }

    create() {
        this.cameras.main.setBackgroundColor( '#000000' );

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        this.logo = this.add.image(centerX, centerY + -100, 'sigil').setOrigin(0.5, 0.5);
        this.logo.setScale(1);

        
        // Loading text - maybe give it movement?
        this.loadingText = this.add.bitmapText(centerX, centerY + 220, 'font', 'Loading...', 20).setOrigin(0.5, 0.5);


        //Fun fact
        const funFactText = this.add.bitmapText(centerX, centerY + 100, 'font', 'Tutorial - Underground, Antechamber', 30).setOrigin(0.5, 0.5);

        //Next scene
        this.time.delayedCall(5000, () => {
            this.scene.start('tutorialLevelScene');
        });
    } 
}