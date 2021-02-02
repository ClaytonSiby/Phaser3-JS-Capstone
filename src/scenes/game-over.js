import PlayerScene from './player';

import DataTransfere from '../helpers/data';

class GameOverScene extends PlayerScene {
  constructor() {
    super('GameOverScene');
  }

  create() {
    this.add.text(410, 300, 'Game Over', {
      fill: '#0f0',
    });

    this.add.text(
      380,
      340,
      `Your score is: ${this.registry.get('playerScore').toString()}`,
      { fill: '#0f0' },
    );

    this.backToMenuBtn = this.add.text(400, 470, 'Play The Game Again', {
      fill: '#34ebcc',
      font: 30,
      fontWeight: 'bold',
    }).setInteractive();

    DataTransfere.postGameScore(
      this.registry.get('user'),
      this.registry.get('playerScore'),
    ).then(() => {
      this.fetched = true;
    });

    this.backToMenuBtn.on('pointerup', () => {
      window.location.reload();
    });
  }
}

export default GameOverScene;
