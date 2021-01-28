import PlayerScene from './PlayerScene'
import DataTransfere from '../helpers/DataTransfere'

class Level3Scene extends PlayerScene {
  constructor () {
    super('Level3Scene')
  }

  preload () {
    this.load.image('level_three_platform', 'assets/platform_2.png')
  }

  create () {
    const levelAlert = this.add.text(370, 300, "You're now playing level 3", { fill: '#f00' });

    setTimeout(() => {
      levelAlert.show();
    }, 500)

    clearTimeout(levelAlert);

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
    this.gameOnSound.play()

    this.background = this.add.image(0, 0, 'level_three_bg').setOrigin(0, 0)
    this.background.displayWidth = this.sys.canvas.width
    this.background.displayHeight = this.sys.canvas.height
    this.score = 10000

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
      platforms.create(plat.x, plat.y, 'level_three_platform')
    })

    const bugs = this.physics.add.group()
    const theBugList = ['green_bug', 'yellow_bug', 'red_bug']

    function bugGenerator () {
      const xCoordinate = Math.random() * 1000
      const randomBug = theBugList[Math.floor(Math.random() * 3)]

      bugs.create(xCoordinate, 10, randomBug)
    }

    const bugObject = {
      callback: bugGenerator,
      delay: 50,
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
    const { gameState } = this
    if (gameState.cursors.right.isDown) {
      gameState.character.setVelocityX(200)
      gameState.character.anims.play('run', true)

      gameState.character.flipX = false
    } else if (gameState.cursors.left.isDown) {
      gameState.character.setVelocityX(-200)
      gameState.character.anims.play('run', true)

      gameState.character.flipX = true
    } else {
      gameState.character.setVelocityX(0)
      gameState.character.anims.play('idle', true)
    }
  }
}

export default Level3Scene
