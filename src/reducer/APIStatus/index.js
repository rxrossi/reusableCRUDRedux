import { combineReducers } from 'redux';
import createFilteredReducer from '../../createFilteredReducer';
import genericReducer from './genericReducer';

export default combineReducers({
  get: createFilteredReducer(genericReducer, action => action.type && action.type.startsWith('GET')),
  post: createFilteredReducer(genericReducer, action => action.type && action.type.startsWith('POST')),
  put: createFilteredReducer(genericReducer, action => action.type && action.type.startsWith('PUT')),
  delete: createFilteredReducer(genericReducer, action => action.type && action.type.startsWith('DELETE')),
});
