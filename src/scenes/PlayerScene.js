import DataTransfere from '../helpers/DataTransfere';
import globals from '../globals/index';
import { clone } from 'lodash';
class PlayerScene extends Phaser.Scene {
  constructor (key) {
    super(key)
    this.nameInput = document.querySelector('#nameInput')
    this.submitBtn = document.querySelector('#submitBtn')
    this.gameState = { score: 0, player: this.nameInput.value }
  }

  preload () {
    this.load.image('player-scene-bg', 'assets/start-page.png')
  }

  create () {
    this.initGlobalVariables();
    this.background = this.add.image(0, 0, 'player-scene-bg').setOrigin(0, 0)
    this.background.displayWidth = this.sys.canvas.width
    this.background.displayHeight = this.sys.canvas.height
    this.add.text(395, 100, 'Bug Dodger', {
      fontSize: 30,
      fontFamily: 'Times New Roman',
      fontWeight: 'bold'
    })

    this.add.text(300, 200, 'Please enter your name to get started')
    this.submitBtn.addEventListener('click', e => {
      e.preventDefault()
      const nameHolder = document.getElementById('nameHolder')
      if (this.nameInput.value) {
        nameHolder.textContent = `Enjoy the Game ${this.gameState.player}!`
        this.scene.stop('PlayerScene')
        this.scene.start('Level1Scene')
      } else {
        nameHolder.textContent = `Please provide your name to proceed!`
      }
    })
  }

  initGlobalVariables() {
    this.game.global = clone(globals);
  }
}

export default PlayerScene
