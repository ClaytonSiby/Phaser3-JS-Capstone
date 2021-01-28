import PlayerScene from './PlayerScene'
import Helpers from '../helpers/utils'

class MenuScene extends PlayerScene {
  constructor () {
    super('MenuScene')
  }

  preload () {
    this.load.audio('menu-bg-music', 'assets/menu.wav')
  }

  create () {
    this.background = this.add.image(0, 0, 'menu-bg').setOrigin(0, 0)
    this.backgroundMusic = this.sound.add('menu-bg-music', { loop: true })
    this.background.displayWidth = this.sys.canvas.width
    this.background.displayHeight = this.sys.canvas.height
    this.backgroundMusic.play()

    const nameInput = document.getElementById('nameInput')
    const submitBtn = document.getElementById('submitBtn')
    Helpers.hideElement(nameInput)
    Helpers.hideElement(submitBtn)

    this.playBtn = this.add
      .text(400, 250, 'Play Game', {
        fill: '#34ebcc',
        fontSize: 30,
        fontWeight: 900,
        cursor: 'pointer'
      })
      .setInteractive()

    this.viewLeaderBoard = this.add
      .text(340, 310, 'View Leaderboard', {
        fill: '#34ebcc',
        fontSize: 30,
        fontWeight: 900,
        cursor: 'pointer'
      })
      .setInteractive()

    this.playBtn.on('pointerup', () => {
      this.backgroundMusic.stop()
      this.scene.start('Level1Scene')
    })

    this.viewLeaderBoard.on('pointerup', () => {
      this.backgroundMusic.stop()
      this.scene.start('LeaderBoardScene')
    })
  }

  update () {}
}

export default MenuScene
