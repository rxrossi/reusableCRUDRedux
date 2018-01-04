import sut from './index';
import formActionsConfig from '../../../actions/formActions';

const formActions = formActionsConfig('create');

describe('generic form', () => {
  it('returns the default state', () => {
    // Act
    const actual = sut(undefined, {});

    // Assert
    const expected = {};
    expect(actual).toEqual(expected);
  });

  describe('change values', () => {
    it('works for a regular field', () => {
      // Prepare
      const name = 'someName';
      const action = formActions.changeField('name', name);
      // Act
      const actual = sut(undefined, action);
      // Assert
      const expected = { name };
      expect(actual).toEqual(expected);
    });
  });
});
