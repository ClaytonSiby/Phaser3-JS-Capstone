import PlayerScene from './PlayerScene';
import DataTransfere from '../helpers/DataTransfere';

class LeaderBoardScene extends PlayerScene {
  constructor() {
    super('LeaderBoardScene');
  }

  preload() {
    this.load.audio('bg-music', 'assets/menu.wav');
  }

  create() {
    this._bgMusic = this.sound.add('bg-music', { loop: true });
    this._bgMusic.play();

    let lineHeight = 180;
    this.topPlayers = this.registry.get('score');
    this.add.text(350, 150, 'These are the Top Players: ', {
      fill: '#0f0',
      fontWeight: 900,
    });

    this.topPlayers.map(player => {
      this.add.text(
        400,
        (lineHeight += 40),
        `${player.user}: ${player.score}`,
        {
          fill: '#34ebcc',
        },
      );
    });

    this.add.text(330, 450, 'Click Anywhere to go back to Menu');
    this.input.on('pointerup', () => {
      this._bgMusic.stop();
      this.scene.start('MenuScene');
    });
  }
}

export default LeaderBoardScene;
