import PlayerScene from './PlayerScene';
import DataTransfere from '../helpers/DataTransfere';

class GameOverScene extends PlayerScene {
  constructor() {
    super('GameOverScene');
  }

  preload() {}
  create() {
      this.add.text(380, 300, 'Game Over\n Click anywhere to view LeaderBoard', {
          fill: '#0f0'
      });

      DataTransfere.postGameScore(this.registry.get('user'), this.registry.get('playerScore')).then(() => { this.fetched = true; });

      
      this.input.on('pointerup', () => {
        this.scene.start('LeaderBoardScene');
      })
      // window.location.reload();
      // this.allScores = this.registry.get('score');
      // this.current_player = this.allScores[this.allScores.length - 1];
      // this.add.text(400, 370, `Your Score is: ${this.registry.get('score')[0]}`);
  }
}

export default GameOverScene
