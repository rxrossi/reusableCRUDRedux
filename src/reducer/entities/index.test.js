import sut from './index';
import configureSyncActions from '../../actions/syncActionCreators';

const syncActions = configureSyncActions();

const defaultState = [];

describe('entities reducer', () => {
  it('returns the default state', () => {
    // Act
    const actual = sut(undefined, {});

    // Assert
    expect(actual).toEqual(defaultState);
  });

  it('works when receiving a getSucess', () => {
    // Prepare
    const payload = [{ name: 'name' }];
    const action = syncActions.getSuccess(payload);

    // Act
    const actual = sut(undefined, action);

    // Assert
    const expected = payload;
    expect(actual).toEqual(expected);
  });
});
