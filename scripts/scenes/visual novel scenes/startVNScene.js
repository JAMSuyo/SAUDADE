export default class startVNScene extends Phaser.Scene {

    constructor() {
        super( 'startVNScene' );

        this.dialogueIndex = 0;
        this.dialoguePartIndex = 0;
        this.typingSpeed = 80; // Typing speed in milliseconds
        this.dialogues = [
            {
                parts: [
                    { text: "Ow, my head...", character: 'koreWince' }
                ]
            },
            {
                parts: [
                    { text: "Huh, where am I? ", character: 'koreShock' },
                    { text: "What is this place...? ", character: 'koreShock', append: true },
                    { text: "Why does it seem... ", character: 'koreShock' },
                    { text: "familiar?", character: 'koreThink', append: true },
                    { text: "Am I dreamwalking again...?", character: 'koreWorried'},
                ]
            },
            {
                parts: [
                    { text: "I have to get out of here...", character: 'koreWince' }
                ]
            },
            {
                parts: [
                    { text: "Huh? ", character: 'koreWince', sound: 'rattlingDoor', keepPlaying: true },
                    { text: "These doors...", character: 'koreWorried', append: true },
                    { text: " What the- ", character: 'koreWorried', append: true },
                    { text: "What's going on?", character: 'koreWorried', append: true }
                ]
            },
            {
                parts: [
                    { text: "Oh. ", character: 'koreThink', fadeInAudio: 'magicAura', fadeInMagicDoor: true },
                    { text: "This is some powerful magic... ", character: 'koreThink', append: true },
                    { text: "I don’t think I’ll be able to brute force my way through.", character:'koreThink', append: true },
                    { text: "Maybe there’s something here I can find to help? ", character: 'koreThink' },
                    { text: "And there’s a keyhole too... ", character: 'koreThink', append: true }
                ]
            },
            {
                parts: [
                    { text: "Wait- ", character: 'koreThink' },
                    { text: "There's another small door here to the side...", character: 'koreThink', append: true }
                ]
            }
        ];
    }

    create() {
        // Background image
        this.add.image(0, 0, 'vnBG').setOrigin(0, 0);
        this.magicDoorImage = this.add.image(0, 0, 'magicDoor').setOrigin(0, 0).setAlpha(0.3);

        // Character image, initially hidden
        this.characterImage = this.add.image(100, 210, 'koreWince').setScale(0.45).setAlpha(0);

        // Dialogue box, initially hidden
        this.dialogueBox = this.add.image(170, 170, 'dialogueBox').setScale(0.42).setAlpha(0);

        // Dialogue text, initially hidden
        this.dialogueText = this.add.text(40, 160, '', {
            fontSize: '10px',
            fill: '#fff',
            wordWrap: { width: 250 }
        }).setAlpha(0);

        // Start playing background music immediately
        this.bgm = this.sound.add('vnBGM', { loop: true, volume: 0 });
        this.bgm.play();

        // Create a black rectangle overlay for the blinking effect
        this.overlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
            .setOrigin(0, 0)
            .setAlpha(1);

        // Blink effect
        this.tweens.add({
            targets: this.overlay,
            alpha: { from: 1, to: 0 },
            duration: 1200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                // Hide the overlay and fade in the scene elements
                this.overlay.setAlpha(0);
                this.fadeInElements();
            }
        });

        let delayBeforeFadeIn = 5000;
        // Fade in the background music (bgm) gradually
        this.time.addEvent({
            delay: delayBeforeFadeIn,
            callback: () => {
                this.tweens.add({
                    targets: this.bgm,
                    volume: { from: 0, to: 0.6 }, // Adjust to the desired maximum volume
                    duration: 5000, // Duration of the fade-in effect in milliseconds (5 seconds)
                    ease: 'Linear', // Easing function for the tween
                    onComplete: () => {
                        // Callback function when the fade-in is complete (optional)
                        console.log('BGM faded in completely.');
                    }
                });
            },
            callbackScope: this
        });

        // Disable input initially
        this.input.enabled = false;
        this.buttonSound = this.sound.add('buttonClick', { volume: 0.1 });
        this.input.on('pointerdown', this.advanceDialogue, this);

        // Set up a listener for the end of dialogues
        this.events.on('endDialogue', () => {
            // Disable input when the last dialogue starts typing
            this.input.enabled = false;
            this.startClosingScene();
        }, this);
    }

    fadeInElements() {
        // Fade in character image, dialogue box, and dialogue text
        this.tweens.add({
            targets: [this.characterImage, this.dialogueBox, this.dialogueText],
            alpha: { from: 0, to: 1 },
            duration: 1000,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                // Enable input after fade-in is complete
                this.input.enabled = true;
                this.displayDialogue();
            }
        });
    }

    displayDialogue() {
        // Display dialogue based on current index
        if (this.dialogueIndex < this.dialogues.length) {
            let dialogue = this.dialogues[this.dialogueIndex];
            let part = dialogue.parts[this.dialoguePartIndex];
            
            // Check if there's an append flag, otherwise clear the text
            if (!part.append) {
                this.dialogueText.setText('');
            }

            this.characterImage.setTexture(part.character);
            this.characterImage.visible = true;

            if (this.currentSound && !this.currentSound.keepPlaying) {
                this.currentSound.stop();
            }

            if (part.sound) {
                this.currentSound = this.sound.add(part.sound);
                this.currentSound.keepPlaying = part.keepPlaying || false;
                this.currentSound.play();
            }

            // Check if there's an audio fade-in instruction
            if (part.fadeInAudio) {
                let fadeInDuration = (part.text.includes("powerful magic")) ? 2000 : 5000;
                this.fadeInAudio(part.fadeInAudio, fadeInDuration);
            }

            // Check if there's a fade-in instruction for the magicDoor
            if (part.fadeInMagicDoor) {
                this.fadeInMagicDoor();
            }

            this.typingIndex = 0;
            if (this.typingTimer) {
                this.typingTimer.remove(false);
            }
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

    fadeInAudio(audioKey, duration) {
        let audio = this.sound.add(audioKey, { volume: 0 });
        audio.play();

        this.tweens.add({
            targets: audio,
            volume: { from: 0, to: 0.3 },
            duration: duration, // Use the provided duration for fading in
            ease: 'Linear'
        });
    }

    fadeInMagicDoor() {
        this.tweens.add({
            targets: this.magicDoorImage,
            alpha: { from: 0.3, to: 1 },
            duration: 3000,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.blinkMagicDoor();
            }
        });
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
        let dialogue = this.dialogues[this.dialogueIndex];
        if (dialogue) {
            let part = dialogue.parts[this.dialoguePartIndex];
            if (part) {
                if (this.typingTimer) {
                    // Skip the typing effect and show the full dialogue
                    this.typingTimer.remove(false);
                    this.typingTimer = null;
                    this.dialogueText.setText(part.append ? this.dialogueText.text + part.text.slice(this.typingIndex) : part.text);
                    this.typingIndex = part.text.length;
                } else {
                    // Move to the next part or dialogue
                    if (this.dialoguePartIndex < dialogue.parts.length - 1) {
                        this.dialoguePartIndex++;
                        // Clear text before displaying the next part
                        if (!dialogue.parts[this.dialoguePartIndex].append) {
                            this.dialogueText.setText('');
                        }
                    } else {
                        this.dialogueIndex++;
                        this.dialoguePartIndex = 0;
                    }
                    this.displayDialogue();
                }
            } else {
                // Dialogue part is undefined, move to the next dialogue
                this.dialogueIndex++;
                this.dialoguePartIndex = 0;
                this.displayDialogue();
            }
        } else {
            // Dialogue is undefined, handle end of dialogues scenario
            console.log("End of dialogues.");
        }
    
        this.buttonSound.play();
    }

    startClosingScene() {

        this.input.enabled = false;
        this.fadeOutAudio('magicAura', 1000);

        this.openDoor = this.sound.add('openDoor');
        this.openDoor.play();

        // Move character image to the right
        this.tweens.add({
            targets: this.characterImage,
            x: this.characterImage.x + 400, // Adjust to your desired position
            alpha: 0,
            duration: 2000, // Adjust duration as needed
            ease: 'Sine.easeInOut',
        });

        this.cameras.main.fadeOut(2000, 0, 0, 0, (camera, progress) => {
            if (progress === 1) {
                // Transition to the next scene
                this.scene.start('tutorialBootScene'); 
            }
        });

        this.tweens.add({
            targets: this.bgm,
            volume: { from: 0.6, to: 0 },
            duration: 2000,
            ease: 'Linear',
            onComplete: () => {
                this.bgm.stop();
            }
        });
    }

    fadeOutAudio(audioKey, duration) {
        let audio = this.sound.add(audioKey);
        let currentVolume = audio.volume;
        
        this.tweens.add({
            targets: audio,
            volume: { from: currentVolume, to: 0 },
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                audio.stop();
            }
        });
    }
}