import Phaser from 'phaser';
import PlayerScene from './scenes/PlayerScene';
import Level1Scene from './scenes/Level1Scene';
import Level2Scene from './scenes/Level2Scene';
import Level3Scene from './scenes/Level3Scene';

const gameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      enableBody: true,
    },
  },
  parent: 'parentDiv',
  dom: {
    createContainer: true
  },
  scene: [PlayerScene, Level1Scene, Level2Scene, Level3Scene],
};

new Phaser.Game(gameConfig);
