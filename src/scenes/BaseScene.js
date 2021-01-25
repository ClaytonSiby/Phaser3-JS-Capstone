class BaseScene extends Phaser.Scene {
  constructor (key) {
    super(key)

    this.gameState = { score: 0 }
  }
}

export default BaseScene
