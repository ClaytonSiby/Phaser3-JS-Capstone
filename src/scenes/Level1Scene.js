class Level1Scene extends Phaser.Scene {
  constructor () {
    super('Level1Scene')

    this.gameState = { score: 0 }
  }

  preload () {
    this.load.image('green_bug', 'assets/bug_2.png')
    this.load.image('player', 'assets/player.png')
    this.load.image('level_one_platform', 'assets/platform.png')
    this.load.image('level1_bg', 'assets/level1_bg.png');
  }

  create () {
    const bg_coordinates = [
      { x: 100, y: 100 },
      { x: 500, y: 150 },
      { x: 800, y: 100 },
      { x: 300, y: 300 },
      { x: 100, y: 500 },
      { x: 900, y: 300 },
      { x: 600, y: 400 }
    ]

    const platformPositions = [
      { x: 158, y: 580 },
      { x: 350, y: 580 },
      { x: 500, y: 580 },
      { x: 800, y: 580 },
      { x: 1000, y: 580 }
    ]

    this.add.text(10, 25, `Score: ${ this.gameState.score }`, {
      fill: '#0f0',
      fontSize: 23
    })

    bg_coordinates.map(bg_cord => {
      this.add.image(bg_cord.x, bg_cord.y, 'level1_bg');
    })

    this.gameState.player = this.physics.add.sprite(225, 440, 'player');
    this.gameState.cursors = this.input.keyboard.createCursorKeys()

    const platforms = this.physics.add.staticGroup();
    this.physics.add.collider(this.gameState.player, platforms)


    platformPositions.map(plat => {
      platforms.create(plat.x, plat.y, 'level_one_platform').setScale(0.7)
    })

    this.gameState.player.setColliderWorldBounds(true);
    this.physics.add.collider(this.gameState.player, platforms);
  }
}

export default Level1Scene
