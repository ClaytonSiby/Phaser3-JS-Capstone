import PlayerScene from './PlayerScene';
import DataTransfere from '../helpers/DataTransfere';

class GameOverScene extends PlayerScene {
  constructor() {
    super('GameOverScene');
  }

  preload() {}
  create() {
      this.add.text(380, 300, 'Game Over', {
          fill: '#0f0'
      });

      this.add.text(400, 370, `Your Score is: ${this.gameState.score}`)
  }
}

export default GameOverScene
