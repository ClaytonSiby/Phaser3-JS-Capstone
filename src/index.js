import Phaser from 'phaser';
import PreloaderScene from './scenes/PreloaderScene';
// import OptionsScene from './scenes/OptionsScene';
// import MenuScene from './scenes/MenuScene';
import Level1Scene from './scenes/Level1Scene';
import Level2Scene from './scenes/Level2Scene';
import Level3Scene from './scenes/Level3Scene';
// import GameInstructionsScene from './scenes/GameInstructionsScene';

const gameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
    },
  },
  scene: [Level3Scene],
};

new Phaser.Game(gameConfig);
