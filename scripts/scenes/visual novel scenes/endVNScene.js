export default class EndVNScene extends Phaser.Scene {

    constructor(){
        super('EndVNScene');

        this.dialogueIndex = 0;
        this.dialoguePartIndex = 0;
        this.typingSpeed = 80;
        this.dialogues = [
            {
                parts: [
                    { text: "Okay, here goes.", character: 'koreNormal' }
                ]
            },
            {
                parts: [
                    { text: "And now the key...", character: 'koreThink', sound: 'unlockDoor' }
                ]
            },
            {
                parts: [
                    { text: "Oh, thank the Weaver, it's openi- ", character: 'koreGrin', sound: 'openDoor1' },
                    { text: "Huh? ", character: 'koreThink' },
                    { text: "Is that...", character: 'koreShock' },
                ]
            }
        ];
    }

    preload(){
        // Loading assets and sounds
        this.load.image('koreGrin', './assets/Image/Illustration/Character/NEWResized2/koreGrin.png');
        this.load.image('koreNormal', './assets/Image/Illustration/Character/NEWResized2/koreNormal.png');
        this.load.image('koreShock', './assets/Image/Illustration/Character/NEWResized2/koreShock.png');
        this.load.image('koreThink', './assets/Image/Illustration/Character/NEWResized2/koreThink.png');
        this.load.image('koreWince', './assets/Image/Illustration/Character/NEWResized2/koreWince.png');
        this.load.image('koreWorried', './assets/Image/Illustration/Character/NEWResized2/koreWorried.png');
        this.load.image('koreCast', './assets/Image/Illustration/Character/NEWResized2/koreCast.png');

        this.load.image('background', './assets/Image/Illustration/Background/Runes 1.png');
        this.load.image('magicDoor', './assets/Image/Illustration/Background/magicDoor.png');
        this.load.image('dialogueBox', './assets/Image/GUI/textBoxResized.png');
        this.load.image('dialogueBox2', './assets/Image/GUI/dialogueBoxResized1.png');

        this.load.audio('bgm', './assets/Sounds/BGM/For Game Prog.ogg');
        this.load.audio('buttonClick', './assets/Sounds/SFX/button1.mp3');
        this.load.audio('footsteps', './assets/Sounds/SFX/footsteps3.mp3');
        this.load.audio('spellBreak', './assets/Sounds/SFX/spellBroken.mp3');
        this.load.audio('openDoor', './assets/Sounds/SFX/openDoor.mp3');
        this.load.audio('casting', './assets/Sounds/SFX/casting.mp3');
        this.load.audio('unlockDoor', './assets/Sounds/SFX/unlock.mp3');
        this.load.audio('openDoor1', './assets/Sounds/SFX/openDoor1.mp3');
        this.load.audio('magicSFX', './assets/Sounds/SFX/magicAura.mp3');
    }

    create() {
        // Adding background and blinking effect
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.magicDoorImage = this.add.image(0, 0, 'magicDoor').setOrigin(0, 0).setAlpha(0.3);
        this.blinkMagicDoor();

        // Character image, invisible at first
        this.characterImage = this.add.image(300, 410, 'koreNormal').setScale(0.65).setAlpha(0);

        // Dialogue box, invisible at first
        this.dialogueBox = this.add.image(450, 410, 'dialogueBox2').setAlpha(0);

        // Dialogue text, invisible at first
        this.dialogueText = this.add.text(130, 390, '', {
            fontSize: '18px',
            fill: '#fff',
            wordWrap: { width: 650 }
        }).setAlpha(0);

        // BGM, muted at first
        this.bgm = this.sound.add('bgm', { loop: true, volume: 0 });
        this.bgm.play();

        // Footsteps, muted at first
        this.footsteps = this.sound.add('footsteps', { volume: 0 });
        this.footsteps.play();

        // MagicSFX, muted at first
        this.magicSFX = this.sound.add('magicSFX', { loop: true, volume: 0 });
        this.magicSFX.play();

        // Fade in effect
        this.overlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
            .setOrigin(0, 0)
            .setAlpha(1);

        // Fade in of Character image, Dialogue box, and Dialogue text
        this.tweens.add({
            targets: this.overlay,
            alpha: { from: 1, to: 0 },
            duration: 1200,
            ease: 'Sine.easeInOut',
            yoyo: false,
            onComplete: () => {
                this.overlay.setAlpha(0);
                this.fadeInElements();
            }
        });

        // Fade in of footsteps
        this.tweens.add({
            targets: this.footsteps,
            volume: { from: 0, to: 1 },
            duration: 3000,
            ease: 'Linear',
            onComplete: () => {
                this.input.enable = true;
            }
        });

        // Fade in of BGM
        this.tweens.add({
            targets: this.bgm,
            volume: { from: 0, to: 0.3 },
            duration: 3000,
            ease: 'Linear',
            onComplete: () => {
                console.log('BGM faded in completely.');
            }
        });

        // Fade in of magicSFX
        this.tweens.add({
            targets: this.magicSFX, 
            volume: { from: 0, to: 0.2 },
            duration: 3000,
            ease: 'Linear', 
        })
        
        // Disable input initially
        this.input.enabled = false;
        this.buttonSound = this.sound.add('buttonClick', { volume: 0.1 });
        this.input.on('pointerdown', this.advanceDialogue, this);

        // Set up a listener for the end of dialogues
        this.events.on('endDialogue', () => {
            // Disable input when the last dialogue starts typing
            this.input.enabled = false;
            this.time.delayedCall(2000, () => {
                this.startClosingScene();
            }, [], this);
        }, this);
    }

    fadeInElements() {
        this.tweens.add({
            targets: [this.characterImage, this.dialogueBox, this.dialogueText],
            alpha: { from: 0, to: 1 },
            duration: 1000,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.input.enabled = true;
                this.displayDialogue();
            }
        });
    }

    displayDialogue() {
        if (this.dialogueIndex < this.dialogues.length) {
            let dialogue = this.dialogues[this.dialogueIndex];
            let part = dialogue.parts[this.dialoguePartIndex];
            
            if (!part.append) {
                this.dialogueText.setText('');
            }
    
            this.characterImage.setTexture(part.character);
            this.characterImage.visible = true;
    
            if (this.currentSound) {
                this.currentSound.stop();
            }
    
            if (part.sound) {
                this.currentSound = this.sound.add(part.sound);
                this.currentSound.keepPlaying = part.keepPlaying || false;
                this.currentSound.play();
            }
    
            if (part.fadeInAudio) {
                let fadeInDuration = (part.text.includes("powerful magic")) ? 2000 : 5000;
                this.fadeInAudio(part.fadeInAudio, fadeInDuration);
            }
    
            if (part.fadeInMagicDoor) {
                this.fadeInMagicDoor();
            }
    
            this.typingIndex = 0;
            // Remove any existing typing timer
            if (this.typingTimer && this.typingTimer.remove) {
                this.typingTimer.remove(false);
            }
    
            // Initialize typingTimer properly
            this.typingTimer = this.time.addEvent({
                delay: this.typingSpeed,
                callback: this.typeText,
                callbackScope: this,
                loop: true
            });

            if (this.dialogueIndex === this.dialogues.length - 1 && this.dialoguePartIndex === dialogue.parts.length - 1) {
                this.time.addEvent({
                    delay: this.typingSpeed * dialogue.parts[this.dialoguePartIndex].text.length,
                    callback: () => {
                        // Emit an event to signal the end of dialogue typing
                        this.input.enabled = false;
                        this.events.emit('endDialogue');
                    },
                    callbackScope: this
                });
            }
        }
    }
    
    

    blinkMagicDoor() {
        this.tweens.add({
            targets: this.magicDoorImage,
            alpha: { from: 1, to: 0.3 },
            duration: 1200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }

    typeText() {
        let dialogue = this.dialogues[this.dialogueIndex];
        if (dialogue && this.dialoguePartIndex < dialogue.parts.length) {
            let part = dialogue.parts[this.dialoguePartIndex];
            if (part) {
                if (this.typingIndex < part.text.length) {
                    this.dialogueText.setText(this.dialogueText.text + part.text.charAt(this.typingIndex));
                    this.typingIndex++;
                } else {
                    if (this.typingTimer) {
                        this.typingTimer.remove(false);
                        this.typingTimer = null;
                    }
                }
            }
        }
    }

    advanceDialogue() {
        if (this.typingTimer) {
            // If typing timer is active, skip typing effect
            this.typingTimer.remove(false);
            this.typingTimer = null;
            let dialogue = this.dialogues[this.dialogueIndex];
            let part = dialogue.parts[this.dialoguePartIndex];
            this.dialogueText.setText(part.append ? this.dialogueText.text + part.text.slice(this.typingIndex) : part.text);
            this.typingIndex = part.text.length;
        } else {
            let dialogue = this.dialogues[this.dialogueIndex];
            let part = dialogue.parts[this.dialoguePartIndex];
    
            if (part.text === "Okay, here goes.") {
                // Only play footsteps and spellBreak for this specific dialogue line
                if (!part.played) {
                    part.played = true; // Mark as played
                    this.input.enabled = false; // Disable input during sound playback
                    this.characterImage.setTexture('koreCast');
                    this.dialogueText.setText("");
                    this.casting = this.sound.add('casting', { volume: 0.5 });
                    this.casting.play();
                    this.casting.once('complete', () => {
                        this.playSpellBreak(); // After footsteps, play spellBreak
                    });
                }
            } else {
                // For other sounds or dialogue lines, proceed normally
                this.continueDialogue();
            }
        }
    
        this.buttonSound.play(); // Play button click sound
    }
    
    playSpellBreak() {
        // Play spellBreak sound effect
        let spellBreakSound = this.sound.add('spellBreak');
        spellBreakSound.play();
        spellBreakSound.once('complete', () => {
            // After spellBreak sound completes
            this.fadeOutMagicDoor(); // Fade out magicDoor illustration
            this.tweens.add({
                targets: this.magicSFX,
                volume: { from: 0.3, to: 0},
                duration: 2000
            })
        });
    }    

    fadeOutMagicDoor() {
        // Fade out the magicDoorImage
        this.tweens.add({
            targets: this.magicDoorImage,
            alpha: { from: 1, to: 0 },
            duration: 1000, // Adjust duration as needed
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.magicDoorImage.destroy(); // Remove magicDoor illustration
                this.input.enabled = true; // Re-enable input after sound completes
                this.continueDialogue(); // Continue dialogue after spellBreak completes
            }
        });
    }

    continueDialogue() {
        let dialogue = this.dialogues[this.dialogueIndex];
        if (this.dialoguePartIndex < dialogue.parts.length - 1) {
            this.dialoguePartIndex++;
            if (!dialogue.parts[this.dialoguePartIndex].append) {
                this.dialogueText.setText('');
            }
            this.displayDialogue();
        } else {
            this.dialogueIndex++;
            this.dialoguePartIndex = 0;
            this.displayDialogue();
        }
    }

    startClosingScene() {

        this.input.enabled = false;

        // Move character image to the right
        this.tweens.add({
            targets: this.characterImage,
            x: this.characterImage.x + 400, // Adjust to your desired position
            alpha: 0,
            duration: 2000, // Adjust duration as needed
            ease: 'Sine.easeInOut',
        });

        this.cameras.main.zoomTo(5, 1000, 'Sine.easeInOut', true);

        this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
            if (progress === 1) {
                // Transition to the next scene
                //this.scene.start('transitionScene'); // Replace 'TransitionScene' with your actual scene key
            }
        });

        this.tweens.add({
            targets: this.bgm,
            volume: { from: 0.3, to: 0 },
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
                this.bgm.stop();
            }
        });
    }
}

