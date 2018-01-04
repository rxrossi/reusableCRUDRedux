import 'isomorphic-fetch'; /* global fetch */
import configureSyncActions from './syncActionCreators';

const jsonHeader = {
  'Content-Type': 'application/json',
};

export const get = (URL, syncActions) => () => (dispatch) => {
  dispatch(syncActions.getRequest());
  return fetch(URL)
    .then(res => res.json())
    .then(json => dispatch(syncActions.getSuccess(json.body)))
    .catch(err => dispatch(syncActions.getError(err)));
};

export const post = (URL, syncActions) => data => (dispatch) => {
  dispatch(syncActions.postRequest());
  return fetch(URL, { body: JSON.stringify(data), method: 'POST', headers: jsonHeader })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 201) {
        return dispatch(syncActions.postSuccess(json.body));
      }
      return dispatch(syncActions.postError(json.errors));
    })
    .catch(err => dispatch(syncActions.postError(err)));
};

export default (URL, resourceName) => {
  const syncActions = configureSyncActions(resourceName);
  return {
    get: get(URL, syncActions),
  };
};
