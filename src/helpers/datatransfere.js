const axios = require('axios');
const Helpers = require('./utils');

const DataTransfere = {
  postGameScore: async (playerName, score) => {
    const result = await axios
      .post(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/gZ2LeAR8PEPald2qJWzE/scores/',
        {
          user: playerName,
          score,
        },
      )
      .then(res => res.data)
      .catch(error => error.response.data);

    return result;
  },

  getGameScore: async () => {
    const request = await axios.get(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/gZ2LeAR8PEPald2qJWzE/scores/',
      {},
    ).then(res => res.data.result)
      .then(res => Helpers.structureScores(res))
      .catch(err => {
        err.toJSON();
      });

    return request;
  },
};

module.exports = DataTransfere;
