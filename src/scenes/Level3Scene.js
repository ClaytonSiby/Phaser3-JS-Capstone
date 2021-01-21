class Level3Scene extends Phaser.Scene {
  constructor() {
    super('Level3Scene');
  }

  preload() {
    this.load.image('green_bug', 'assets/bug_2.png');
    this.load.image('yellow_bug', 'assets/bug_1.png');
    this.load.image('red_bug', 'assets/bug_3.png');
  }

  create() {

  }

  update() {}
}

export default Level3Scene;
