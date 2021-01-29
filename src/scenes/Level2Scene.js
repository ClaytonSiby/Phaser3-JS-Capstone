import PlayerScene from './PlayerScene'

class Level2Scene extends PlayerScene {
  constructor () {
    super('Level2Scene')
  }

  preload () {
    this.load.image('level_two_platform', 'assets/images/platform_2.png')
  }

  create () {
    this.physics.resume()

    const platformPositions = [
      { x: 92, y: 580 },
      { x: 272, y: 580 },
      { x: 452, y: 580 },
      { x: 632, y: 580 },
      { x: 812, y: 580 },
      { x: 992, y: 580 }
    ]

    this.gameOnSound = this.sound.add('game-music', { loop: true })
    this.gameOverSound = this.sound.add('game_over_sound', { loop: false })
    this.winSound = this.sound.add('win-sound')
    this.gameOnSound.play()

    this.backgroundImage = this.add.image(0, 0, 'level_two_bg').setOrigin(0, 0)
    this.backgroundImage.displayWidth = this.sys.canvas.width
    this.backgroundImage.displayHeight = this.sys.canvas.height
    this.score = 3000

    this.scoreText = this.add.text(10, 25, `Score: ${this.score}`, {
      fontSize: 23,
      fontWeight: 900
    })

    this.gameState.character = this.physics.add
      .sprite(225, 440, 'character')
      .setScale(0.6)
    this.gameState.cursors = this.input.keyboard.createCursorKeys()

    const platforms = this.physics.add.staticGroup()
    this.physics.add.collider(this.gameState.character, platforms)
    this.gameState.character.setCollideWorldBounds(true)

    platformPositions.map(plat => {
      platforms.create(plat.x, plat.y, 'level_two_platform').setScale(0.9)
    })

    const bugs = this.physics.add.group()
    const thebugs = ['green_bug', 'yellow_bug']

    function bugGenerator () {
      const xCoordinate = Math.random() * 1000
      const randomBug = thebugs[Math.floor(Math.random() * 2)]

      bugs.create(xCoordinate, 10, randomBug)
    }

    const bugObject = {
      callback: bugGenerator,
      delay: 90,
      callbackScope: this,
      loop: true
    }

    this.bugGeneratorLoop = this.time.addEvent(bugObject)

    // create animations on the character sprite
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,
        end: 3
      })
    })

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('character', {
        start: 4,
        end: 5
      })
    })

    // add a collider object between bugs & the platforms. Destroy the bug as it hits the platforms.
    this.physics.add.collider(bugs, platforms, bug => {
      bug.destroy()

      this.score += 10
      this.scoreText.setText(`Score: ${this.score}`)
    })

    // collide a bug & the character then its game over
    this.physics.add.collider(this.gameState.character, bugs, () => {
      this.bugGeneratorLoop.destroy()
      this.gameOnSound.stop()
      this.gameOverSound.play()

      this.physics.pause()
      this.registry.set('playerScore', this.score)
      this.scene.start('GameOverScene')
    })
  }

  update () {
    if (this.score == 10000) {
      this.startNextLevel('Level3Scene')
    }
    this.movePlayer()
  }
}

export default Level2Scene
