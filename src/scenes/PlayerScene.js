import Phaser from 'phaser';

import DataTransfere from '../helpers/DataTransfere';
import Helpers from '../helpers/utils';

class PlayerScene extends Phaser.Scene {
  constructor(key) {
    super(key);
    this.gameState = { player: '' };
    this.score = 0;
  }

  preload() {
    this.load.image('red_bug', 'assets/images/bug_3.png');
    this.load.image('green_bug', 'assets/images/bug_2.png');
    this.load.image('yellow_bug', 'assets/images/bug_1.png');
    this.load.spritesheet('character', 'assets/images/player.png', {
      frameWidth: 72,
      frameHeight: 90,
    });
    this.load.image('player-scene-bg', 'assets/images/start-page.png');
    this.load.image('menu-bg', 'assets/images/menu-bg.png');
    this.load.image('level1_bg', 'assets/images/level1_bg.png');
    this.load.image('level_two_bg', 'assets/images/bg-image.png');
    this.load.image('level_three_bg', 'assets/images/level-3-bg.png');
    this.load.audio('game-music', ['assets/audio/game-bg-music.ogg']);
    this.load.audio('game_over_sound', ['assets/audio/gameover.wav']);
    this.load.audio('win-sound', ['assets/audio/win.wav']);
  }

  create() {
    this.form = document.querySelector('form');
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

    this.form.style.display = 'block';

    DataTransfere.getGameScore().then(async result => { await (this.highScores = result); });

    this.add.text(300, 200, 'Please enter your name to get started');
    this.submitBtn.addEventListener('click', e => {
      e.preventDefault();
      const nameHolder = document.getElementById('nameHolder');
      const validateForm = Helpers.formValidator;
      if (validateForm(this.nameInput.value)) {
        this.gameState.player = this.nameInput.value;
        this.registry.set('user', this.gameState.player);
        this.registry.set('score', this.highScores);
        nameHolder.textContent = `Enjoy the Game ${this.gameState.player}!`;
        this.form.style.display = 'none';
        this.scene.start('MenuScene');
      } else {
        nameHolder.textContent = 'Please provide your name to proceed!';
      }
    });
  }

  startNextLevel(nextLevel) {
    this.winSound.play();
    this.bugGeneratorLoop.destroy();
    this.gameOnSound.stop();
    this.physics.pause();

    this.scene.start(nextLevel);
  }

  movePlayer() {
    const { gameState } = this;
    if (gameState.cursors.right.isDown) {
      gameState.character.setVelocityX(200);
      gameState.character.anims.play('run', true);

      gameState.character.flipX = false;
    } else if (gameState.cursors.left.isDown) {
      gameState.character.setVelocityX(-200);
      gameState.character.anims.play('run', true);

      gameState.character.flipX = true;
    } else {
      gameState.character.setVelocityX(0);
      gameState.character.anims.play('idle', true);
    }
  }
}

export default PlayerScene;
