export default class tutorialBootScene extends Phaser.Scene {

    constructor() {
        super( 'tutorialBootScene' );
    }

    create() {
        this.cameras.main.setBackgroundColor( '#000000' );

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        this.logo = this.add.image(centerX, centerY + -10, 'sigil').setOrigin(0.5, 0.5);
        this.logo.setScale(0.2);

        
        // Loading text - maybe give it movement?
        this.loadingText = this.add.bitmapText(centerX, centerY + 60, 'font', 'Loading...', 10).setOrigin(0.5, 0.5);


        //Fun fact
        const funFactText = this.add.bitmapText(centerX, centerY + 30, 'font', 'Tutorial - Underground, Antechamber', 12).setOrigin(0.5, 0.5);

        //Next scene
        this.time.delayedCall(2000, () => {
             this.scene.start('tutorialLevelScene');
        });
    } 
}