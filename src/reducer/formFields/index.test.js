import sut from './index';

const defaultState = {
  create: {},
  update: {},
};

describe('formFields reducer', () => {
  it('returns the default state', () => {
    // Act
    const actual = sut(undefined, {});
    // Assert
    expect(actual).toEqual(defaultState);
  });
});
