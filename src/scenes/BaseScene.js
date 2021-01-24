class BaseScene extends Phaser.Scene {
  constructor (key) {
    super(key)

    this.gameState = { score: 0 }
  }

  preload () {}
  create () {}
  update () {}
}

export default BaseScene
