import * as types from './constants';

export const changeField = (uniquePairID, formName) => (path = '', value) => ({
  type: types[`CHANGE_${formName.toUpperCase()}_FIELD`],
  value,
  path,
  ...uniquePairID,
});

export default uniquePairID => formName => ({
  changeField: changeField(uniquePairID, formName),
});
