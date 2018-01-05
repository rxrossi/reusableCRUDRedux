import * as CONSTANTS from '../../actions/constants';

export default (state = [], action) => {
  switch (action.type) {
    case CONSTANTS.GET_SUCCESS:
      return action.payload;
    case CONSTANTS.PUT_SUCCESS: {
      const updadtedEntityID = state.findIndex(x => x.id === action.payload.id);
      return [
        action.payload,
        ...state.slice(0, updadtedEntityID),
        ...state.slice(updadtedEntityID + 1),
      ];
    }
    case CONSTANTS.DELETE_SUCCESS: {
      const deletedEntityID = state.findIndex(x => x.id === action.payload);
      return [
        ...state.slice(0, deletedEntityID),
        ...state.slice(deletedEntityID + 1),
      ];
    }
    case CONSTANTS.POST_SUCCESS:
      return [
        action.payload,
        ...state,
      ];
    default:
      return state;
  }
};
