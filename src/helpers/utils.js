const Helpers = {
  hideElement: element => element.style.display = 'none',
  structureScores: (arr) => arr.sort((a, b) => b.score - a.score).splice(0, 5),
  formValidator: (value) => (value.length > 2)
};

module.exports = Helpers;
