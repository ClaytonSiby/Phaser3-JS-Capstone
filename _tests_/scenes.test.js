import PlayerScene from '../src/scenes/player';
import MenuScene from '../src/scenes/menu';
import LeaderBoardScene from '../src/scenes/leaderboard';
import Level1Scene from '../src/scenes/level-one';
import Level2Scene from '../src/scenes/level-two';
import Level3Scene from '../src/scenes/level-three';
import GameOverScene from '../src/scenes/game-over';

jest.mock('../src/scenes/player');

beforeEach(() => {
  PlayerScene.mockClear();
});

describe('Check Data flow between classes through class inheritance', () => {
  const scenesArray = [
    MenuScene,
    LeaderBoardScene,
    Level1Scene,
    Level2Scene,
    Level3Scene,
    GameOverScene,
  ];

  it('Expect all scenes to inherit from the PlayerScene', () => {
    scenesArray.every(scene => expect(scene.prototype instanceof PlayerScene).toBeTruthy());
  });

  it('Does not expect any of the Scenes to not inherit from the PlayerScene', () => {
    scenesArray.every(scene => expect(scene.prototype instanceof PlayerScene).not.toBeFalsy());
  });
});
