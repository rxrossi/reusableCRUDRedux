import sut from './index';
import configureActions from '../actions/syncActionCreators';

const actions = configureActions();

const APIStatusDefault = { working: false, errors: {} };

const defaultState = {
  entities: [],
  formFields: {
    create: {},
    update: {},
  },
  APIStatus: {
    get: APIStatusDefault,
    post: APIStatusDefault,
    put: APIStatusDefault,
    delete: APIStatusDefault,
  },
};

describe('CRUD reducer', () => {
  it('return the default on initialization', () => {
    // Act
    const actual = sut(undefined, {});

    // Assert
    expect(actual).toEqual(defaultState);
  });

  describe('without initializing actions with a valid feature', () => {
    it('gets the correct state on getRequest', () => {
      // Prepare
      const action = actions.getRequest();

      // Act
      const actual = sut(undefined, action);

      // Assert
      const expected = {
        ...defaultState,
        APIStatus: {
          ...defaultState.APIStatus,
          get: {
            ...APIStatusDefault,
            working: true,
          },
        },
      };
      expect(actual).toEqual(expected);
    });

    it('gets the correct state on postError', () => {
      // Prepare
      const action = actions.postFailure('someErr');

      // Act
      const actual = sut(undefined, action);

      // Assert
      const expected = {
        ...defaultState,
        APIStatus: {
          ...defaultState.APIStatus,
          post: {
            ...APIStatusDefault,
            errors: 'someErr',
          },
        },
      };
      expect(actual).toEqual(expected);
    });
  });
});
