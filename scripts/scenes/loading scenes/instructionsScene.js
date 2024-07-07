export default class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('instructionsScene');
    }

    create() {
        this.bg = this.add.image(0, 15, 'instructions').setOrigin(0, 0).setScale(0.2, 0.2);

        // Disable input initially
        this.input.enabled = false;

        // Enable input after a delay
        setTimeout(() => {
            this.input.enabled = true;

            // Add pointerdown event listener
            this.input.on('pointerdown', (pointer) => {
                this.scene.start('tutorialBootScene');
            });
        }, 3000); // 3000 milliseconds = 3 seconds delay
    }
}
