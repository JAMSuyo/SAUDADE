export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
        this.scene = scene; // Store reference to scene

        scene.physics.world.enable(this);

        scene.anims.create({
            key: 'magicBoltAnim',
            frames: scene.anims.generateFrameNumbers( 'magicBolt', { start: 0, end: 29 }),
            frameRate: 30,
            repeat: -1
        });

        this.anims.play('magicBoltAnim');
    }

    fire(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
    
        // Get angle towards cursor position
        const cursorX = this.scene.input.activePointer.x;
        const cursorY = this.scene.input.activePointer.y;
        const angle = Phaser.Math.Angle.Between(x, y, cursorX, cursorY);
    
        // Set velocity based on angle
        const speed = 300; // Fixed speed in pixels per second
        this.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    }
    
    
    update() {
        // Destroy bullet if out of bounds
        const gameBounds = this.scale.gameSize;
        if (this.x < 0 || this.x > gameBounds || this.y < 0 || this.y > gameBounds) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
