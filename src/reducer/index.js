import { combineReducers } from 'redux';
import APIStatus from './APIStatus';
import entities from './entities';
import formFields from './formFields';

export default combineReducers({
  entities,
  APIStatus,
  formFields,
});
