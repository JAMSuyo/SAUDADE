import studioBootScene from "./scenes/loading scenes/studioBootScene.js";
import bootScene from "./scenes/loading scenes/bootScene.js";
import mainMenuScene from "./scenes/mainMenuScene.js";
import startVNScene from "./scenes/visual novel scenes/startVNScene.js";
import tutorialBootScene from "./scenes/loading scenes/tutorialBootScene.js";
import tutoralLevelScene from "./scenes/top-down scenes/tutorialLevelScene.js";
import levelOneBootScene from "./scenes/loading scenes/levelOneBootScene.js";
import levelOneScene from "./scenes/top-down scenes/levelOneScene.js";
import levelTwoBootScene from "./scenes/loading scenes/levelTwoBootScene.js";
import levelTwoScene from "./scenes/top-down scenes/levelTwoScene.js";
import endVNScene from "./scenes/visual novel scenes/endVNScene.js";
import loseScene from "./scenes/loseScene.js";
import winScene from "./scenes/winScene.js";



var config = {
    type: Phaser.AUTO,
    width: 352,
    height: 208,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container'
    },
    scene: [ studioBootScene, 
        bootScene, 
        mainMenuScene, 
        startVNScene, 
        tutorialBootScene, 
        tutoralLevelScene, 
        levelOneBootScene, 
        levelOneScene, 
        levelTwoBootScene, 
        levelTwoScene, 
        endVNScene, 
        loseScene, 
        winScene ]
};

new Phaser.Game( config );