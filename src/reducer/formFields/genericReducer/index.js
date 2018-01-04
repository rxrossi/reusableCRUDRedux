/* eslint-disable */
function changeObject(obj, value, path, typeOfOperation) {
  const pathToReduce = Array.isArray(path) ? path : [path];

  pathToReduce.reduce((dir, p, i, arr) => {
    if (i + 1 === arr.length) {
      if (typeOfOperation === 'append_to_arr') {
        return dir[p] = [
          ...dir[p] || [],
          value,
        ];
      } else if (typeOfOperation === 'remove_of_arr') {
        return dir[p] = [
          ...dir[p].slice(0, value),
          ...dir[p].slice(value + 1),
        ];
      }
      return dir[p] = value;
    }
    if (dir[p]) {
      return dir[p];
    }
    return dir[p] = typeof arr[i + 1] === 'number' ? [] : {};
  }, obj);

  return obj;
}
/* eslint-enable */

export default (state = {}, action) => {
  const variable = action.type ? action.type.split('_')[0] : '';
  switch (variable) {
    case 'CHANGE':
      return changeObject({ ...state.fields }, action.value, action.path);
    default:
      return state;
  }
};
