export default class creditsScene extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        // Load assets like background images, buttons, etc.
    }

    create() {
        // Add background image
        this.background = this.add.image(0, 0, 'creditBackground').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.backgroundMusic = this.sound.add('menuBGM', { loop: true, volume: 1 });
        this.backgroundMusic.play();

        const backButton = this.add.image(this.cameras.main.width / 8, this.cameras.main.height + -100, 'backButton');
        backButton.setScale(0.07);
        backButton.setOrigin(0.5);
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start('mainMenuScene');
            this.backgroundMusic.stop();

        });
    }
}