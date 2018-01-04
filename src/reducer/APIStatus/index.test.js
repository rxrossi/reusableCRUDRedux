import sut from './index';
import * as types from '../../actions/constants';

describe('APICommunicationStatus', () => {
  const defaultState = {
    get: {
      working: false,
      errors: {},
    },
    post: {
      working: false,
      errors: {},
    },
    put: {
      working: false,
      errors: {},
    },
    delete: {
      working: false,
      errors: {},
    },
  };

  it('returns the default state', () => {
    // Prepare
    const expected = defaultState;

    // Act
    const actual = sut(undefined, {});

    // Assert
    expect(actual).toEqual(expected);
  });

  it('works for a GET_REQUEST action', () => {
    // Prepare
    const action = {
      type: types.GET_REQUEST,
    };
    const expected = {
      ...defaultState,
      get: {
        working: true,
        errors: {},
      },
    };

    // Act
    const actual = sut(undefined, action);

    // Assert
    expect(actual).toEqual(expected);
  });
});
