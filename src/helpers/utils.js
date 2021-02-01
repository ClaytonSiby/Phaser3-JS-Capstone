const Helpers = (() => {
  const hideElement = element => { element.style.display = 'none'; };
  const structureScores = (arr) => arr.sort((a, b) => b.score - a.score).splice(0, 5);
  const formValidator = (value) => (value.length > 2);

  return { hideElement, structureScores, formValidator };
})();

export default Helpers;
