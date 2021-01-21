class Level2Scene extends Phaser.Scene {
  constructor () {
    super('Level2Scene')
  }

  preload () {
    this.load.image('green_bug', 'assets/bug_2.png');
    this.load.image('yellow_bug', 'assets/bug_1.png');
  }

  create() {}
}
