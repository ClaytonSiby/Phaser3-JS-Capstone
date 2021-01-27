import PlayerScene from './PlayerScene';
import Helpers from '../helpers/utils';

class MenuScene extends PlayerScene {
  constructor () {
    super('MenuScene')
  }

  preload() {}

  create() {
    const nameInput = document.getElementById('nameInput')
    const submitBtn = document.getElementById('submitBtn')
    Helpers.hideElement(nameInput)
    Helpers.hideElement(submitBtn);

    this.add.text(300, 300, 'This is the Menu scene press anywhere to proceed');
    this.input.on('pointerup', () => {
      this.scene.start('Level1Scene');
    })
  }

  update() {}
}

export default MenuScene;
