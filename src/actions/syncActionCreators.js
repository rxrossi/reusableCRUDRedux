import * as types from './constants';

const request = (method, feature) => () => ({
  type: types[`${method}_REQUEST`],
  feature,
});

const success = (method, feature) => payload => ({
  type: types[`${method}_SUCCESS`],
  feature,
  payload,
});

const failure = (method, feature) => payload => ({
  type: types[`${method}_ERROR`],
  feature,
  payload,
});

const setConfigurer = (method, feature) => ({
  [`${method.toLowerCase()}Request`]: request(method, feature),
  [`${method.toLowerCase()}Success`]: success(method, feature),
  [`${method.toLowerCase()}Failure`]: failure(method, feature),
});

export default feature => ({
  ...setConfigurer('GET', feature),
  ...setConfigurer('POST', feature),
  ...setConfigurer('PUT', feature),
  ...setConfigurer('DELETE', feature),
});
