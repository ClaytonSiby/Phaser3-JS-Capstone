import PlayerScene from './PlayerScene';
import Helpers from '../helpers/utils';

class Level1Scene extends PlayerScene {
  constructor() {
    super('Level1Scene');
  }

  preload() {
    this.load.image('level_one_platform', 'assets/images/platform.png');
  }

  create() {
    const bgCoordinates = [
      { x: 100, y: 100 },
      { x: 500, y: 150 },
      { x: 800, y: 100 },
      { x: 300, y: 300 },
      { x: 100, y: 500 },
      { x: 900, y: 300 },
      { x: 600, y: 400 },
    ];

    const platformPositions = [
      { x: 158, y: 580 },
      { x: 350, y: 580 },
      { x: 500, y: 580 },
      { x: 800, y: 580 },
      { x: 1000, y: 580 },
    ];

    const nameInput = document.getElementById('nameInput');
    const submitBtn = document.getElementById('submitBtn');

    Helpers.hideElement(nameInput);
    Helpers.hideElement(submitBtn);

    this.gameOnSound = this.sound.add('game-music', { loop: true });
    this.gameOverSound = this.sound.add('game_over_sound', { loop: false });
    this.winSound = this.sound.add('win-sound');
    this.gameOnSound.play();

    this.scoreText = this.add.text(10, 25, `Score: ${this.score}`, {
      fill: '#37c3be',
      fontSize: 23,
      fontWeight: 900,
    });

    bgCoordinates.map(bgCoord => this.add.image(bgCoord.x, bgCoord.y, 'level1_bg'));

    this.gameState.character = this.physics.add
      .sprite(225, 440, 'character')
      .setScale(0.6);
    this.gameState.cursors = this.input.keyboard.createCursorKeys();

    const platforms = this.physics.add.staticGroup();
    this.physics.add.collider(this.gameState.character, platforms);

    platformPositions.map(plat => platforms
      .create(plat.x, plat.y, 'level_one_platform')
      .setScale(0.7));

    this.gameState.character.setCollideWorldBounds(true);
    this.physics.add.collider(this.gameState.character, platforms);

    const bugs = this.physics.add.group();
    const bugList = ['green_bug', 'green_bug', 'green_bug'];

    // generate & display bugs randomly on the game screen.
    function bugGenerator() {
      const xCoordinate = Math.random() * 1000;
      const randomBug = bugList[Math.floor(Math.random() * 3)];

      bugs.create(xCoordinate, 10, randomBug);
    }

    const bugObject = {
      callback: bugGenerator,
      delay: 150,
      callbackScope: this,
      loop: true,
    };

    this.bugGeneratorLoop = this.time.addEvent(bugObject);

    // create animations on the character sprite
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,
        end: 3,
      }),
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('character', {
        start: 4,
        end: 5,
      }),
    });

    // add a collider object between bugs & the platforms. Destroy the bug as it hits the platforms.
    this.physics.add.collider(bugs, platforms, bug => {
      bug.destroy();

      this.score += 10;
      this.scoreText.setText(`Score: ${this.score}`);
    });

    // collide a bug & the character then its game over
    this.physics.add.collider(this.gameState.character, bugs, () => {
      this.bugGeneratorLoop.destroy();
      this.gameOnSound.stop();
      this.gameOverSound.play();
      this.physics.pause();
      this.registry.set('playerScore', this.score);
      this.scene.start('GameOverScene');
    });
  }

  update() {
    if (this.score === 3000) {
      this.startNextLevel('Level2Scene');
    }

    this.movePlayer();
  }
}

export default Level1Scene;
