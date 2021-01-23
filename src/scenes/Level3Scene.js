class Level3Scene extends Phaser.Scene {
  constructor () {
    super('Level3Scene')

    this.gameState = { score: 0 }
  }

  preload () {
    this.load.image('green_bug', 'assets/bug_2.png')
    this.load.image('yellow_bug', 'assets/bug_1.png')
    this.load.image('red_bug', 'assets/bug_3.png')
    this.load.image('level_three_bg', 'assets/level-3-bg.png')
    this.load.image('platform', 'assets/platform_2.png')
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 72,
      frameHeight: 90
    })
  }

  create () {
    const platformPositions = [
      { x: 92, y: 580 },
      { x: 272, y: 580 },
      { x: 452, y: 580 },
      { x: 632, y: 580 },
      { x: 812, y: 580 },
      { x: 992, y: 580 }
    ]

    this.background = this.add.image(0, 0, 'level_three_bg').setOrigin(0, 0)
    this.background.displayWidth = this.sys.canvas.width
    this.background.displayHeight = this.sys.canvas.height

    this.gameState.scoreText = this.add.text(
      10,
      25,
      `Score: ${this.gameState.score}`,
      {
        fontSize: 23,
        fontWeight: 900
      }
    )

    this.gameState.player = this.physics.add
      .sprite(225, 440, 'player')
      .setScale(0.6)
    this.gameState.cursors = this.input.keyboard.createCursorKeys()
    const platforms = this.physics.add.staticGroup()
    this.physics.add.collider(this.gameState.player, platforms)
    this.gameState.player.setCollideWorldBounds(true)

    platformPositions.map(plat => {
      platforms.create(plat.x, plat.y, 'platform')
    })

    const bugs = this.physics.add.group()
    const theBugList = ['green_bug', 'yellow_bug', 'red_bug']

    function bugGenerator () {
      const xCoordinate = Math.random() * 1000
      let randomBug = theBugList[Math.floor(Math.random() * 3)]

      bugs.create(xCoordinate, 10, randomBug)
    }

    const bugObject = {
      callback: bugGenerator,
      delay: 80,
      callbackScope: this,
      loop: true
    }

    const bugGeneratorLoop = this.time.addEvent(bugObject)
    // create animations on the player sprite
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

    // add a collider object between bugs & the platforms. Destroy the bug as it hits the platforms.
    this.physics.add.collider(bugs, platforms, bug => {
      bug.destroy()

      this.gameState.score += 10
      this.gameState.scoreText.setText(`Score: ${this.gameState.score}`)
    })

    // collide a bug & the player then its game over
    this.physics.add.collider(this.gameState.player, bugs, () => {
      bugGeneratorLoop.destroy()

      this.physics.pause()
      this.input.on('pointerup', () => {
        this.gameState.score = 0
        this.scene.restart()
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

export default Level3Scene
