import Phaser from 'phaser';
import PreloaderScene from './scenes/PreloaderScene';
// import OptionsScene from './scenes/OptionsScene';
// import MenuScene from './scenes/MenuScene';
import Level1Scene from './scenes/Level1Scene.js';
// import GameInstructionsScene from './scenes/GameInstructionsScene';

const gameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  scene: [
    PreloaderScene,
    Level1Scene,
    // MenuScene,
    // OptionsScene,
    // GameInstructionsScene,
  ]
}

new Phaser.Game(gameConfig);