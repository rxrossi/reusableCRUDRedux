import sut from './index';

describe('generic method status handler', () => {
  it('returns the default state', () => {
    // Prepare
    const defaultState = {
      working: false,
      errors: {},
    };

    // Act
    const actual = sut(undefined, {});

    // Assert
    expect(actual).toEqual(defaultState);
  });

  it('works for an action that ends with _REQUEST', () => {
    // Prepare
    const expected = {
      working: true,
      errors: {},
    };

    // Act
    const actual = sut(undefined, {
      type: 'SOMETHING_REQUEST',
    });

    // Assert
    expect(actual).toEqual(expected);
  });

  it('works for an action that ends with _SUCCESS', () => {
    // Prepare
    const previousState = {
      working: true,
      errors: {
        someKey: 'someValue',
      },
    };

    const expected = {
      working: false,
      errors: {},
    };

    // Act
    const actual = sut(previousState, {
      type: 'SOMETHING_SUCCESS',
    });

    // Assert
    expect(actual).toEqual(expected);
  });

  it('works for an action that ends with _ERROR', () => {
    // Prepare
    const previousState = {
      working: true,
      errors: {},
    };

    const action = {
      type: 'SOMETHING_ERROR',
      payload: {
        someKey: 'someValue',
      },
    };

    const expected = {
      working: false,
      errors: action.payload,
    };

    // Act
    const actual = sut(previousState, action);

    // Assert
    expect(actual).toEqual(expected);
  });
});
