import { combineReducers } from 'redux';
import createFilteredReducer from '../../createFilteredReducer';
import genericReducer from './genericReducer';

export default combineReducers({
  create: genericReducer,
  update: createFilteredReducer(genericReducer, action => action.type && action.type.split('_')[1] === 'UPDATE'),
});
