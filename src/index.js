import asyncActionCreators from './actions/asyncActionCreators';
import formActionsConfig from './actions/formActions';
import createFilteredReducer from './createFilteredReducer';
import crudReducer from './reducer';

const defaultFetchHeaderCreator = () => ({
  'Content-Type': 'application/json',
});

export default (URL, resourceName, headerCreator = defaultFetchHeaderCreator) => ({
  asyncActions: asyncActionCreators(URL, { resourceName }, headerCreator),
  createFormFieldActions: formActionsConfig({ resourceName })('create'),
  updateFormFieldActions: formActionsConfig({ resourceName })('update'),
  reducer: createFilteredReducer(crudReducer, action => action.resourceName === resourceName),
});
