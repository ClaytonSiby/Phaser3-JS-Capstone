
import axios from 'axios';
import { postGameScore, getGameScore } from '../src/helpers/DataTransfere';

jest.mock('axios');

describe('Make a POST api action to update the leaderboard', () => {
  it('Posts the player name & score to the API', async () => {
    axios.post.mockResolvedValue({
      data: {
        result: 'Leaderboard score updated successfully',
      },
    });

    const response = await postGameScore('Game', 40);
    expect(response.result).toEqual('Leaderboard score updated successfully');
  });
});

describe('Make a GET api request to get game info', () => {
  it('Gets the game data as an array of objects', async () => {
    axios.get.mockResolvedValue({
      data: {
        result: [
          {
            user: 'Michael',
            score: 60,
          },
          {
            user: 'Yolanda',
            score: 460,
          },
        ],
      },
    });

    const response = await getGameScore();
    expect(response.result).toEqual(response.isArray);
  });
});
