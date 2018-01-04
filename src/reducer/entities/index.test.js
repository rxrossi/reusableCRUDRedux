import sut from './index';

const defaultState = [];

describe('entities reducer', () => {
  it('returns the default state', () => {
    // Act
    const actual = sut(undefined, {});

    // Assert
    expect(actual).toEqual(defaultState);
  });
});
