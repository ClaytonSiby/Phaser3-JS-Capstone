const axios = require('axios')

const DataTransfere = (() => {
  const postGameScore = async (playerName, score) => {
    const result = await axios
      .post(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ILbn2Qo4JTctKTTSvhYj/scores/',
        {
          user: playerName,
          score
        }
      )
      .then(res => res.data)
      .catch(error => error.response.data)

    return result
  }

  const structureScores = (arr) => arr.sort((a, b) => b.score - a.score).splice(0, 5);

  const getGameScore = async () => {
    const request = await axios.get(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ILbn2Qo4JTctKTTSvhYj/scores/',
      {}
    ).then(res => res.data.result)
    .then(res => structureScores(res))
    .catch(err => {
        console.log(err.toJSON());
    })

    return request;
  }

  const formValidator = (value) => {
    return value.length > 2 ? true : false
  }

  return { postGameScore, getGameScore, formValidator };
})();

export default DataTransfere;
