import * as types from './constants';

export const changeField = (uniquePairID, formName) => (path = '', value) => ({
  type: types[`CHANGE_${formName.toUpperCase()}_FIELD`],
  value,
  path,
  ...uniquePairID,
});

export const appendField = (uniquePairID, formName) => (path = '', value = {}) => ({
  type: types[`APPEND_${formName.toUpperCase()}_FIELD`],
  value,
  path,
  ...uniquePairID,
});

export const removeField = (uniquePairID, formName) => (path = '') => ({
  type: types[`REMOVE_${formName.toUpperCase()}_FIELD`],
  path,
  ...uniquePairID,
});

export default uniquePairID => formName => ({
  changeField: changeField(uniquePairID, formName),
  appendField: appendField(uniquePairID, formName),
  removeField: removeField(uniquePairID, formName),
});
