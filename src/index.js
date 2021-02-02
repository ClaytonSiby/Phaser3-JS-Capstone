// eslint-disable import/no-unresolved
import 'regenerator-runtime/runtime';
import Phaser from 'phaser';
import PlayerScene from './scenes/player';
import MenuScene from './scenes/menu';
import Level1Scene from './scenes/level-one';
import Level2Scene from './scenes/level-two';
import Level3Scene from './scenes/level-three';
import GameOverScene from './scenes/game-over';
import LeaderBoardScene from './scenes/leaderboard';

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
    createContainer: true,
  },
  scene: [
    PlayerScene,
    MenuScene,
    LeaderBoardScene,
    Level1Scene,
    Level2Scene,
    Level3Scene,
    GameOverScene,
  ],
};

((config) => {
  const game = new Phaser.Game(config);

  return game;
})(gameConfig);
