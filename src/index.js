import asyncActionCreators from './actions/asyncActionCreators';
import formActionsConfig from './actions/formActions';
import createFilteredReducer from './createFilteredReducer';
import crudReducer from './reducer';

export default (URL, resourceName) => ({
  asyncActions: asyncActionCreators(URL, { resourceName }),
  createFormFieldActions: formActionsConfig({ resourceName })('create'),
  updateFormFieldActions: formActionsConfig({ resourceName })('update'),
  reducer: createFilteredReducer(crudReducer, action => action.resourceName === resourceName),
});
