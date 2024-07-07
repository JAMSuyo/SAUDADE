export default class studioBootScene extends Phaser.Scene {
    
    constructor() {
        super( 'studioBootScene' );
    }

    preload() {

        /* load ALL assets here, arranged by category */

        // MAIN MENU
        this.load.image( 'mainMenuBG', '../assets/gui/backgrounds/mainMenuBG.png' );
        this.load.image( 'mainMenuButton', '../assets/gui/buttons/mainMenuIcon.png' );
        this.load.image( 'creditsButton', '../assets/gui/buttons/creditsButton.png' );
        this.load.image( 'quitButton', '../assets/gui/buttons/quitButton.png' );
        this.load.image( 'retryButton', '../assets/gui/buttons/retryIcon.png' );
        this.load.image( 'startButton', '../assets/gui/buttons/startButton.png' );
        this.load.image('creditBackground', '../assets/gui/backgrounds/credits1.png');
        this.load.image('backButton', '../assets/gui/buttons/arrowLeftBtn.png');

        // WIN AND LOSE
        this.load.image( 'winBG', '../assets/gui/backgrounds/winbg.png' );
        this.load.image( 'loseBG', '../assets/gui/backgrounds/loseBg.png' );

        // FONTS
        this.load.bitmapFont( 'font', '../assets/gui/fonts/thick_8x8.png', '../assets/gui/fonts/thick_8x8.xml' );

        // LOGOS
        this.load.image( 'studioLogo', '../assets/gui/logos/StudioImage.png' );
        this.load.image( 'sigil', '../assets/gui/logos/Sigil.png' );
        this.load.image( 'eKey', '../assets/gui/logos/E.png')


        /* TOP DOWN PORTION ASSETS */

        // TILESETS
        this.load.image( 'tiles1', '../assets/tilemaps/tutorial/Tileset1.png' );
        this.load.image( 'tiles2', '../assets/tilemaps/level1/Tileset2.png' );
        this.load.image( 'tiles3', '../assets/tilemaps/level2/Tileset3.png' );

        // TILEMAPS
        this.load.tilemapTiledJSON( 'Tutorial', '../assets/tilemaps/tutorial/TutorialMap.json' );
        this.load.tilemapTiledJSON( 'Level1', '../assets/tilemaps/level1/Level1Map.json' );
        this.load.tilemapTiledJSON( 'Level2', '../assets/tilemaps/level2/Level2Map.json' );

        // SPRITESHEETS
        this.load.spritesheet( 'rogueRun', '../assets/art/characters/spritesheets/rogueRunSheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'testSheet', '../assets/art/characters/spritesheets/testSheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet( 'testSheet2', '../assets/art/characters/spritesheets/testSheet2.png', { frameWidth: 64, frameHeight: 64 });

        // > Back Animation
        this.load.spritesheet( 'backAttack', '../assets/art/characters/spritesheets/mc/back/backAttack.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'backHit', '../assets/art/characters/spritesheets/mc/back/backHit.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'backIdle', '../assets/art/characters/spritesheets/mc/back/backIdle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'backWalk', '../assets/art/characters/spritesheets/mc/back/backWalk.png', { frameWidth: 64, frameHeight: 64 });

        // > Front Animation
        this.load.spritesheet( 'frontAttack', '../assets/art/characters/spritesheets/mc/front/frontAttack.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'frontHit', '../assets/art/characters/spritesheets/mc/front/frontHit.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'frontIdle', '../assets/art/characters/spritesheets/mc/front/frontIdle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'frontWalk', '../assets/art/characters/spritesheets/mc/front/frontWalk.png', { frameWidth: 64, frameHeight: 64 });

        // > Side Animation
            // > Left Animation
        this.load.spritesheet( 'leftAttack', '../assets/art/characters/spritesheets/mc/side/leftAttack.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'leftHit', '../assets/art/characters/spritesheets/mc/side/leftHit.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'leftIdle', '../assets/art/characters/spritesheets/mc/side/leftIdle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'leftWalk', '../assets/art/characters/spritesheets/mc/side/leftWalk.png', { frameWidth: 64, frameHeight: 64 });

            // > Right Animation
        this.load.spritesheet( 'rightAttack', '../assets/art/characters/spritesheets/mc/side/rightAttack.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'rightHit', '../assets/art/characters/spritesheets/mc/side/rightHit.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'rightIdle', '../assets/art/characters/spritesheets/mc/side/rightIdle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'rightWalk', '../assets/art/characters/spritesheets/mc/side/rightWalk.png', { frameWidth: 64, frameHeight: 64 });

        // Special Animation
        this.load.spritesheet( 'playerDeath', '../assets/art/characters/spritesheets/mc/special/playerDeath.png', { frameWidth: 64, frameHeight: 64 });

        // > Enemies
        this.load.spritesheet( 'skeletonRun', '../assets/art/characters/spritesheets/enemies/skeletonRun.png', { frameWidth:64, frameHeight: 64 });
        this.load.image( 'ghost', '../assets/art/characters/spritesheets/enemies/ghost.png');
        
            // > Slime
        this.load.spritesheet( 'slimeAttack', '../assets/art/characters/spritesheets/enemies/slime/slimeAttack.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeDeath', '../assets/art/characters/spritesheets/enemies/slime/slimeDeath.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeHurt', '../assets/art/characters/spritesheets/enemies/slime/slimeHurt.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeIdle', '../assets/art/characters/spritesheets/enemies/slime/slimeIdle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet( 'slimeWalk', '../assets/art/characters/spritesheets/enemies/slime/slimeWalk.png', { frameWidth: 64, frameHeight: 64 });

        // > Visual Effects
        this.load.spritesheet( 'magicBolt', '../assets/art/visual effects/magicBolt.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet( 'blueFire', '../assets/art/visual effects/blueFire.png', { frameWidth: 10, frameHeight: 10 });
        this.load.image('heart', '../assets/gui/logos/full.png');


        /* VISUAL NOVEL PORTION ASSETS */

        // BACKGROUNDS
        this.load.image( 'vnBG', '../assets/art/backgrounds/Resized/doors.png' );
        this.load.image( 'magicDoor', '../assets/art/backgrounds/Resized/magicDoor.png' );

        // CHARACTER ILLUSTRATIONS
        this.load.image( 'koreCast', '../assets/art/characters/illustrations/Resized/Resized/koreCast.png' );
        this.load.image( 'koreGrin', '../assets/art/characters/illustrations/Resized/Resized/koreGrin.png' );
        this.load.image( 'koreNormal', '../assets/art/characters/illustrations/Resized/Resized/koreNormal.png' );
        this.load.image( 'koreShock', '../assets/art/characters/illustrations/Resized/Resized/koreShock.png' );
        this.load.image( 'koreThink', '../assets/art/characters/illustrations/Resized/Resized/koreThink.png' );
        this.load.image( 'koreWince', '../assets/art/characters/illustrations/Resized/Resized/koreWince.png' );
        this.load.image( 'koreWorried', '../assets/art/characters/illustrations/Resized/Resized/koreWorried.png' );

        // SOUNDS
        this.load.audio( 'vnBGM', '../assets/sounds/bgm/For Game Prog.ogg' );
        this.load.audio( 'menuBGM', '../assets/sounds/bgm/Menu Theme.mp3' );
        this.load.audio( 'loseBGM', '../assets/sounds/bgm/game_over.mp3' );
        this.load.audio( 'winBGM', '../assets/sounds/bgm/win music 3.wav' );
        this.load.audio( 'magicAura', '../assets/sounds/sfx/magicAura.mp3' );
        this.load.audio( 'rattlingDoor', '../assets/sounds/sfx/rattlingDoor.mp3' );
        this.load.audio( 'openDoor', '../assets/sounds/sfx/openDoor.mp3' );
        this.load.audio( 'buttonClick', '../assets/sounds/sfx/button1.mp3' );
        
        this.load.audio( 'inGameBGM', '../assets/sounds/bgm/Ingame_music.mp3' );
        
        this.load.audio('footsteps', './assets/Sounds/sfx/SFX/footsteps3.mp3');
        this.load.audio('spellBreak', './assets/Sounds/sfx/SFX/spellBroken.mp3');
        this.load.audio('openDoor', './assets/Sounds/sfx/SFX/openDoor.mp3');
        this.load.audio('casting', './assets/Sounds/sfx/SFX/casting.mp3');
        this.load.audio('unlockDoor', './assets/Sounds/sfx/SFX/unlock.mp3');
        this.load.audio('openDoor1', './assets/Sounds/sfx/SFX/openDoor1.mp3');
        this.load.audio('magicSFX', './assets/Sounds/sfx/SFX/magicAura.mp3');

        //New Added Audio
        this.load.audio('leverSFX', './assets/Sounds/sfx/SFX/leverpull.mp3');
        this.load.audio('pickUpSFX', './assets/Sounds/sfx/SFX/pick.wav');
        this.load.audio('swingSFX', './assets/Sounds/sfx/SFX/swordSwing.wav');
        this.load.audio('fireballSFX', './assets/Sounds/sfx/SFX/fireball.wav');
        this.load.audio('slimeDeathSFX', './assets/Sounds/sfx/SFX/SlimeDeath.mp3');
        this.load.audio('ghostSFX', './assets/Sounds/sfx/SFX/ghost.wav');

        // GUI
        this.load.image( 'dialogueBox', '../assets/gui/textboxes/dialogueBoxResized1.png' );

    }

    create() {

        this.cameras.main.setBackgroundColor( '#000000' );

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        this.logo = this.add.image( centerX, centerY, 'studioLogo' );
        this.logo.setScale( 0.35 );
        this.logo.setAlpha( 0 );

        this.tweens.add({
            targets: this.logo,
            alpha: { from: 0, to: 1 },
            duration: 3500,
            ease: 'Linear',
            onComplete: () => {
                // Fade out the logo over 3.5 seconds after fading in
                this.tweens.add({
                    targets: this.logo,
                    alpha: { from: 1, to: 0 },
                    duration: 3500,
                    ease: 'Linear'
                });
            }
        });

        this.time.delayedCall( 1000, () => {
            this.scene.start( 'bootScene' );
        });
    }
}