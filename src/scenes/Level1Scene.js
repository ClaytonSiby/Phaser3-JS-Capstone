class Level1Scene extends Phaser.Scene {
  constructor () {
    super('Level1Scene')

    this.gameState = { score: 0 }
  }

  preload () {
    this.load.image('green_bug', 'assets/bug_2.png')
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 72,
      frameHeight: 90
    })
    this.load.image('level_one_platform', 'assets/platform.png')
    this.load.image('level1_bg', 'assets/level1_bg.png')
  }

  create () {
    const bgCoordinates = [
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

    this.add.text(10, 25, `Score: ${this.gameState.score}`, {
      fill: '#0f0',
      fontSize: 23
    })

    bgCoordinates.map(bg_cord => {
      this.add.image(bg_cord.x, bg_cord.y, 'level1_bg')
    })

    this.gameState.player = this.physics.add.sprite(225, 440, 'player').setScale(.7);
    this.gameState.cursors = this.input.keyboard.createCursorKeys()

    const platforms = this.physics.add.staticGroup()
    this.physics.add.collider(this.gameState.player, platforms)

    platformPositions.map(plat => {
      platforms.create(plat.x, plat.y, 'level_one_platform').setScale(0.7)
    })

    this.gameState.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.gameState.player, platforms)

    const bugs = this.physics.add.group()
    const bugList = ['green_bug', 'green_bug', 'green_bug']

    function bugGenerator () {
      const xCoordinate = Math.random() * this.width
      let randomBug = bugList[Math.floor(Math.random() * 3)]

      bugs.create(xCoordinate, 10, randomBug)
    }

    const bugObject = {
      callback: bugGenerator,
      delay: 150,
      callbackScope: this,
      loop: true
    }

    const bugGeneratorLoop = this.time.addEvent(bugObject)

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 3
      })
    })

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('player', {
        start: 4,
        end: 5
      })
    })
  }

  update () {
    const gameState = this.gameState
    if (gameState.cursors.right.isDown) {
      gameState.player.setVelocityX(200)
      gameState.player.anims.play('run', true)

      gameState.player.flipX = false
    } else if (gameState.cursors.left.isDown) {
      gameState.player.setVelocityX(-200)
      gameState.player.anims.play('run', true)

      gameState.player.flipX = true
    } else {
      gameState.player.setVelocityX(0)
      gameState.player.anims.play('idle', true)
    }
  }
}

export default Level1Scene
