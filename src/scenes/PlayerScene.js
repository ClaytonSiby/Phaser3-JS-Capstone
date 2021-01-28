import DataTransfere from '../helpers/DataTransfere';

class PlayerScene extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.gameState = { player: '' };
    this.score = 0;
  }

  preload() {
    this.load.image('red_bug', 'assets/bug_3.png');
    this.load.image('green_bug', 'assets/bug_2.png');
    this.load.image('yellow_bug', 'assets/bug_1.png');
    this.load.spritesheet('character', 'assets/player.png', {
      frameWidth: 72,
      frameHeight: 90,
    });
    this.load.image('player-scene-bg', 'assets/start-page.png');
    this.load.image('menu-bg', 'assets/menu-bg.png');
    this.load.image('level1_bg', 'assets/level1_bg.png');
    this.load.image('level_two_bg', 'assets/bg-image.png');
    this.load.image('level_three_bg', 'assets/level-3-bg.png');
    this.load.audio('game-music', ['assets/game-bg-music.ogg']);
    this.load.audio('game_over_sound', ['assets/gameover.wav']);
  }

  create() {
    this.nameInput = document.querySelector('#nameInput');
    this.submitBtn = document.querySelector('#submitBtn');
    this.background = this.add.image(0, 0, 'player-scene-bg').setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;
    this.add.text(395, 100, 'Bug Dodger', {
      fontSize: 30,
      fontFamily: 'Times New Roman',
      fontWeight: 'bold',
    });

    DataTransfere.getGameScore().then(result => this.highScores = result);

    this.add.text(300, 200, 'Please enter your name to get started');
    this.submitBtn.addEventListener('click', e => {
      e.preventDefault();
      const nameHolder = document.getElementById('nameHolder');
      const validateForm = DataTransfere.formValidator;
      if (validateForm(this.nameInput.value)) {
        this.gameState.player = this.nameInput.value;
        this.registry.set('user', this.gameState.player);
        this.registry.set('score', this.highScores);
        nameHolder.textContent = `Enjoy the Game ${this.gameState.player}!`;
        this.scene.start('MenuScene');
      } else {
        nameHolder.textContent = 'Please provide your name to proceed!';
      }
    });
  }

  startNextLevel(nextLevel) {
    this.bugGeneratorLoop.destroy();
    this.gameOnSound.stop();
    this.physics.pause();
    setTimeout(() => {
      this.add.text(400, 300, 'Level Up, Get Ready For The Next One!', { fill: '#0f0' });
    }, 1000);

    this.scene.start(nextLevel);
  }

  gameOver() {}
}

export default PlayerScene;
