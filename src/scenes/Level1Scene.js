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
    this.load.audio('game-music', ['assets/game-sound.mp3'])
    this.load.audio('game_over_sound', ['assets/gameover.wav'])
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

    this.gameOnSound = this.sound.add('game-music', { loop: true })
    this.gameOverSound = this.sound.add('game_over_sound', { loop: false })
    this.gameOnSound.play()

    this.gameState.scoreText = this.add.text(
      10,
      25,
      `Score: ${this.gameState.score}`,
      {
        fill: '#37c3be',
        fontSize: 23,
        fontWeight: 900
      }
    )

    bgCoordinates.map(bg_cord => {
      this.add.image(bg_cord.x, bg_cord.y, 'level1_bg')
    })

    this.gameState.player = this.physics.add
      .sprite(225, 440, 'player')
      .setScale(0.6)
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

    // generate & display bugs randomly on the game screen.
    function bugGenerator () {
      const xCoordinate = Math.random() * 1000
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

      this.gameOnSound.stop()
      this.gameOverSound.play()
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

export default Level1Scene
