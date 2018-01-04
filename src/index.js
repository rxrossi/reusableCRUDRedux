import asyncActionCreators from './actions/asyncActionCreators';
import createFilteredReducer from './createFilteredReducer';
import crudReducer from './reducer';

export default (URL, resourceName) => ({
  asyncActions: asyncActionCreators(URL, { resourceName }),
  reducer: createFilteredReducer(crudReducer, action => action.resourceName === resourceName),
});
