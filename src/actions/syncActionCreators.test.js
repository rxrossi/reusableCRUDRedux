import configureActions from './syncActionCreators';

describe('actionCreators', () => {
  describe('works when passing a "feature" param', () => {
    it('returns the function names', () => {
      // Prepare
      const expectedFunctionNames = [
        'getRequest',
        'getSuccess',
        'getFailure',
        'postRequest',
        'postSuccess',
        'postFailure',
        'putRequest',
        'putSuccess',
        'putFailure',
        'deleteRequest',
        'deleteSuccess',
        'deleteFailure',
      ];

      // Act
      const actions = configureActions('clients');

      // assert
      expect(Object.keys(actions)).toEqual(expectedFunctionNames);
    });
  });
});
