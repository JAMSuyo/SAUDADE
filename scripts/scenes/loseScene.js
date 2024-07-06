export default class loseScene extends Phaser.Scene {

    constructor() {
        super( 'loseScene' );
    }
 // init(data){
    //     this.score = data.score;
    //     this.coin = data.coin;
    //     this.hearts = data.hearts;
    // }

    preload() {
    }

    create() {
        // Display the background image
        this.winningBackground = this.add.image(0, 0, 'loseBG').setOrigin(0, 0);
        this.winningBackground.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.loseMusic = this.sound.add('loseBGM', { loop: false, volume: 1 });
        this.loseMusic.play();

        this.loseButton = this.sound.add('buttonClick', {volume: 2 })


        // Add a restart button
        const restartButton = this.add.image(this.cameras.main.width / 1.6, 145, 'retryButton');
        restartButton.setScale(0.08);
        restartButton.setOrigin(0.5);
        restartButton.setInteractive();
        restartButton.on('pointerdown', () => {
            this.loseButton.play();
            this.scene.start('levelOneBootScene');
            this.loseMusic.stop();
        });

        const mainButton = this.add.image(this.cameras.main.width / 1.2, 145, 'mainMenuButton');
        mainButton.setScale(0.08);
        mainButton.setOrigin(0.5);
        mainButton.setInteractive();
        mainButton.on('pointerdown', () => {
            this.loseButton.play();
            this.scene.start('mainMenuScene');
            this.loseMusic.stop();
        });  
    }
}