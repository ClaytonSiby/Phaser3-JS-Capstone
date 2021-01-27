import DataTransfere from '../helpers/DataTransfere';
class PlayerScene extends Phaser.Scene {
  constructor (key) {
    super(key)
    this.gameState = { player: '' };
    this.score = 0;
  }

  preload () {
    this.load.image('player-scene-bg', 'assets/start-page.png')
  }

  create () {
    this.nameInput = document.querySelector('#nameInput')
    this.submitBtn = document.querySelector('#submitBtn')
    this.background = this.add.image(0, 0, 'player-scene-bg').setOrigin(0, 0)
    this.background.displayWidth = this.sys.canvas.width
    this.background.displayHeight = this.sys.canvas.height
    this.add.text(395, 100, 'Bug Dodger', {
      fontSize: 30,
      fontFamily: 'Times New Roman',
      fontWeight: 'bold'
    })

    DataTransfere.getGameScore().then(result => this.highScores = result);

    this.add.text(300, 200, 'Please enter your name to get started')
    this.submitBtn.addEventListener('click', e => {
      e.preventDefault()
      const nameHolder = document.getElementById('nameHolder')
      const validateForm = DataTransfere.formValidator
      if (validateForm(this.nameInput.value)) {
        this.gameState.player = this.nameInput.value
        this.registry.set('user', this.gameState.player)
        this.registry.set('score', this.highScores)
        nameHolder.textContent = `Enjoy the Game ${this.gameState.player}!`
        this.scene.start('MenuScene')
      } else {
        nameHolder.textContent = `Please provide your name to proceed!`
      }
    })
  }
}

export default PlayerScene
