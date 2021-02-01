import axios from 'axios';
import Helpers from './utils';

const DataTransfere = (() => {
  const postGameScore = async (playerName, score) => {
    const result = await axios
      .post(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/b4ZLMZxn9DJ0nhe2oyGy/scores/',
        {
          user: playerName,
          score,
        },
      )
      .then(res => res.data)
      .catch(error => error.response.data);

    return result;
  };

  const getGameScore = async () => {
    const request = await axios
      .get(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/b4ZLMZxn9DJ0nhe2oyGy/scores/',
        {},
      )
      .then(res => res.data.result)
      .then(res => Helpers.structureScores(res))
      .catch(err => {
        err.toJSON();
      });

    return request;
  };

  return { postGameScore, getGameScore };
})();

export default DataTransfere;
