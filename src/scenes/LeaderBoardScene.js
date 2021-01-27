import PlayerScene from './PlayerScene'
import DataTransfere from '../helpers/DataTransfere'

class LeaderBoardScene extends PlayerScene {
  constructor () {
    super('LeaderBoardScene')
  }

  preload () {}

  create () {
    let lineHeight = 180;
    this.topPlayers = this.registry.get('score')
    // console.log(this.topPlayers);
    this.add.text(350, 150, 'These are the Top Players: ', {
      fill: '#0f0',
      fontWeight: 900
    })

    this.topPlayers.map(player => {
      this.add.text(
        400,
        (lineHeight += 40),
        `${player.user}: ${player.score}`,
        {
          fill: '#34ebcc'
        }
      )
    })

    this.add.text(330, 450, 'Click Anywhere to go back to Menu')
    this.input.on('pointerup', () => {
      this.scene.start('MenuScene');
    })
  }
}

export default LeaderBoardScene
