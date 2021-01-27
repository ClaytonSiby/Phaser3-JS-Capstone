import PlayerScene from './PlayerScene';
import DataTransfere from '../helpers/DataTransfere';
class Level2Scene extends PlayerScene {
  constructor () {
    super('Level2Scene')
  }

  preload () {
    this.load.image('green_bug', 'assets/bug_2.png')
    this.load.image('yellow_bug', 'assets/bug_1.png')
    this.load.spritesheet('character', 'assets/player.png', {
      frameWidth: 72,
      frameHeight: 90
    })
    this.load.image('level_two_bg', 'assets/bg-image.png')
    this.load.image('platform', 'assets/platform_2.png')
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

    this.background = this.add.image(0, 0, 'level_two_bg').setOrigin(0, 0)
    this.background.displayWidth = this.sys.canvas.width
    this.background.displayHeight = this.sys.canvas.height
    this.score = 0;

    this.scoreText = this.add.text(
      10,
      25,
      `Score: ${this.score}`,
      {
        fontSize: 23,
        fontWeight: 900
      }
    )

    this.gameState.character = this.physics.add.sprite(225, 440, 'character').setScale(.6);
    this.gameState.cursors = this.input.keyboard.createCursorKeys();

    const platforms = this.physics.add.staticGroup();
    this.physics.add.collider(this.gameState.character, platforms);
    this.gameState.character.setCollideWorldBounds(true);

    platformPositions.map(plat => {
      platforms.create(plat.x, plat.y, 'platform').setScale(.9);
    })

    const bugs = this.physics.add.group();
    const thebugs = ['green_bug', 'yellow_bug'];

    function bugGenerator() {
      const xCoordinate = Math.random() * 1000;
      let randomBug = thebugs[Math.floor(Math.random() * 2)];

      bugs.create(xCoordinate, 10, randomBug)
    }

    const bugObject = {
      callback: bugGenerator,
      delay: 100,
      callbackScope: this,
      loop: true
    }

    const bugGeneratorLoop = this.time.addEvent(bugObject);

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
      bug.destroy();

      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
    })

    // collide a bug & the character then its game over
    this.physics.add.collider(this.gameState.character, bugs, () => {
      bugGeneratorLoop.destroy();

      this.physics.pause();
      this.scene.stop('Level3Scene');
      this.scene.start('GameOverScene');
      // this.scene.start('Level3Scene')
      // this.input.on('pointerup', () => {
      //   this.score = 0;
      //   this.scene.start('Level3Scene');
      // })
    })
  }

  update () {
    const gameState = this.gameState
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

export default Level2Scene
