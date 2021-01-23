class Level3Scene extends Phaser.Scene {
  constructor() {
    super('Level3Scene');

    this.gameState = { score: 0 };
  }

  preload() {
    this.load.image('green_bug', 'assets/bug_2.png');
    this.load.image('yellow_bug', 'assets/bug_1.png');
    this.load.image('red_bug', 'assets/bug_3.png');
    this.load.image('level_three_bg', 'assets/level-3-bg.png');
  }

  create () {
    const platformPositions = [
      { x: 92, y: 580},
      { x: 272, y: 580 },
      { x: 452, y: 580 },
      { x: 632, y: 580 },
      { x: 812, y: 580 },
      { x: 992, y: 580 }
    ]

    this.background = this.add.image(0, 0, 'level_three_bg').setOrigin(0, 0)
    this.background.displayWidth = this.sys.canvas.width
    this.background.displayHeight = this.sys.canvas.height

    
  }

  update () {}
}

export default Level3Scene;
