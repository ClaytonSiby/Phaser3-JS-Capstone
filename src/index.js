import Phaser from 'phaser';

import Sample from './scenes/simple-scene';

const gameConfig = {
  width: 680,
  height: 400,
  scene: Sample.SimpleScene,
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(gameConfig);
