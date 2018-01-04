import * as types from './constants';

export const changeField = formName => (path = '', value) => ({
  type: types[`CHANGE_${formName.toUpperCase()}_FIELD`],
  value,
  path,
});

export default formName => ({
  changeField: changeField(formName),
});
