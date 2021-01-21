class Level1Scene extends Phaser.Scene {
  constructor () {
    super('Level1Scene')
  }

  preload() {
    this.load.image('green_bug', 'assets/bug_2.png');
  }

  create () {
    this.add.image(0, 0, 'background-image').setOrigin(0, 0)
    this.add.text(400, 200, 'Hello Phaser Here!', {
      fill: '#0f0'
    })
  }
}

export default Level1Scene
