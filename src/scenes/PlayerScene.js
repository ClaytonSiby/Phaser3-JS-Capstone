import BaseScene from './BaseScene';


class PlayerScene extends BaseScene {
  constructor () {
    super('PlayerScene')
  }

  preload () {
    this.load.image('player-scene-bg', 'assets/start-page.png');
  }

  create () {
    this.background = this.add.image(0, 0, 'player-scene-bg').setOrigin(0,0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;
    this.add.text(395, 100, 'Bug Dodger', {
      fontSize: 30,
      fontFamily: 'Times New Roman',
      fontWeight: 'bold'
    })

    this.add.text(300, 200, 'Please enter your name to get started')

    const nameInput = document.getElementById('nameInput')
    const submitBtn = document.getElementById('submitBtn')
    const nameHolder = document.getElementById('nameHolder')

    submitBtn.addEventListener('click', e => {
      e.preventDefault()

      if (nameInput != '') {
        nameHolder.textContent = `Enjoy the Game ${nameInput.value}!`
        this.scene.stop('PlayerScene');
        this.scene.start('Level1Scene');
      }
    })
  }
}

export default PlayerScene
