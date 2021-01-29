const Helpers = require('../src/helpers/utils');

describe('Provides helpers to validate, sort & hide elements', () => {
  it('hides an element from the dom', () => {
    const element = document.createElement('div');
    expect(Helpers.hideElement(element)).toBe('none');
  });

  it('Structures array elements in descending order', () => {
    const exampleArray = [1, 2, 3, 4, 5, 6, 7];
    expect(Helpers.structureScores(exampleArray).length).toEqual(5);
  });

  it('Sorts an array of objects', () => {
    const exampleArray = [
      { name: 'Disco', score: 2 },
      { name: 'Casino', score: 1 },
      { name: 'Games', score: 5 },
      { name: 'Moview', score: 10 },
    ];

    expect(Helpers.structureScores(exampleArray)[0].score).toEqual(10);
  });

  it('Returns false if the user does not enter a valid name', () => {
    const inputValue = '';
    expect(Helpers.formValidator(inputValue)).toBeFalsy();
  });

  it('Validates to true if user provides a name', () => {
    const inputValue = 'John Doe';
    expect(Helpers.formValidator(inputValue)).toBeTruthy();
  });
});
