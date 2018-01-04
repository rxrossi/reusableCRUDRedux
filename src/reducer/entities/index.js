import * as CONSTANTS from '../../actions/constants';

export default (state = [], action) => {
  switch (action.type) {
    case CONSTANTS.GET_SUCCESS:
      return [
        action.payload,
        ...state,
      ];
    default:
      return state;
  }
};
