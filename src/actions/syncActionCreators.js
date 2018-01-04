import * as types from './constants';

const request = (method, uniquePairID) => () => ({
  type: types[`${method}_REQUEST`],
  ...uniquePairID,
});

const success = (method, uniquePairID) => payload => ({
  type: types[`${method}_SUCCESS`],
  ...uniquePairID,
  payload,
});

const failure = (method, uniquePairID) => payload => ({
  type: types[`${method}_ERROR`],
  ...uniquePairID,
  payload,
});

const setConfigurer = (method, uniquePairID) => ({
  [`${method.toLowerCase()}Request`]: request(method, uniquePairID),
  [`${method.toLowerCase()}Success`]: success(method, uniquePairID),
  [`${method.toLowerCase()}Failure`]: failure(method, uniquePairID),
});

export default uniquePairID => ({
  ...setConfigurer('GET', uniquePairID),
  ...setConfigurer('POST', uniquePairID),
  ...setConfigurer('PUT', uniquePairID),
  ...setConfigurer('DELETE', uniquePairID),
});
