export default class winScene extends Phaser.Scene {

    constructor() {
        super( 'winScene' );
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
        this.winningBackground = this.add.image(0, 0, 'winBG').setOrigin(0, 0);
        this.winningBackground.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.winMusic = this.sound.add('winBGM', { loop: false, volume: 1 });
        this.winMusic.play();

        this.winbutton = this.sound.add('buttonClick', {volume: 2 })

        // Add a restart button
        const restartButton = this.add.image(this.cameras.main.width / 8, 145, 'retryButton');
        restartButton.setScale(0.08);
        restartButton.setOrigin(0.5);
        restartButton.setInteractive();
        restartButton.on('pointerdown', () => {
            this.winbutton.play();
            this.scene.start('levelOneBootScene');
        });

        const mainButton = this.add.image(this.cameras.main.width / 3.5, 145, 'mainMenuButton');
        mainButton.setScale(0.08);
        mainButton.setOrigin(0.5);
        mainButton.setInteractive();
        mainButton.on('pointerdown', () => {
            this.winbutton.play();
            this.scene.start('mainMenuScene');
        });  
    }
}