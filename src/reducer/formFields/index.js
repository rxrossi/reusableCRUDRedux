import { combineReducers } from 'redux';
import * as CONSTANTS from '../../actions/constants';
import createFilteredReducer from '../../createFilteredReducer';
import genericReducer from './genericReducer';

export default combineReducers({
  create: createFilteredReducer(genericReducer, action =>
    (action.type && action.type.split('_')[1] === 'CREATE') || (action.type && action.type === CONSTANTS.POST_SUCCESS)),
  update: createFilteredReducer(genericReducer, action =>
    (action.type && action.type.split('_')[1] === 'UPDATE') || (action.type && action.type === CONSTANTS.PUT_SUCCESS)),
});
