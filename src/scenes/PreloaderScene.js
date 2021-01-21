class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('PreloaderScene');
  }

  preload() {
    this.load.image('logo', 'assets/player.png');
  }

  create() {
    this.add.image(440, 400, 'logo').setOrigin(0, 0);
    this.input.on('pointerdown', () => {
      this.scene.start('Level1Scene');
    });
  }
}

export default PreloaderScene;
