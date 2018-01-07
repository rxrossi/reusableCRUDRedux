import { combineReducers } from 'redux';
import createFilteredReducer from '../../createFilteredReducer';
import genericReducer from './genericReducer';

export default combineReducers({
  get: createFilteredReducer(genericReducer, action => action.type && action.type.startsWith('GET')),
  post: createFilteredReducer(genericReducer, action =>
    (action.type && action.type.startsWith('POST')) || (action.type && action.type.startsWith('CLEAR_CREATE'))),
  put: createFilteredReducer(genericReducer, action =>
    (action.type && action.type.startsWith('PUT')) || (action.type && action.type.startsWith('CLEAR_UPDATE'))),
  delete: createFilteredReducer(genericReducer, action => action.type && action.type.startsWith('DELETE')),
});
