import Phaser from 'phaser'
import PreloaderScene from './scenes/PreloaderScene'
// import OptionsScene from './scenes/OptionsScene';
// import MenuScene from './scenes/MenuScene';
import Level1Scene from './scenes/Level1Scene.js'
// import GameInstructionsScene from './scenes/GameInstructionsScene';

const gameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      enableBody: true
    }
  },
  scene: [Level1Scene]
}

new Phaser.Game(gameConfig)
