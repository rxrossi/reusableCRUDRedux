import 'isomorphic-fetch'; /* global fetch */
import configureSyncActions from './syncActionCreators';

const jsonHeader = {
  'Content-Type': 'application/json',
};

export const get = (URL, syncActions) => () => (dispatch) => {
  dispatch(syncActions.getRequest());
  return fetch(URL)
    .then(res => res.json())
    .then((json) => {
      if (json.code === 200) {
        return dispatch(syncActions.getSuccess(json.body));
      }
      throw dispatch(syncActions.getFailure(json.errors));
    })
    .catch(err => dispatch(syncActions.getFailure(err)));
};

export const post = (URL, syncActions) => data => (dispatch) => {
  dispatch(syncActions.postRequest());
  return fetch(URL, { body: JSON.stringify(data), method: 'POST', headers: jsonHeader })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 201) {
        return dispatch(syncActions.postSuccess(json.body));
      }
      throw dispatch(syncActions.postFailure(json.errors));
    })
    .catch(err => dispatch(syncActions.postFailure(err)));
};

export const put = (URL, syncActions) => data => (dispatch) => {
  dispatch(syncActions.putRequest());
  return fetch(URL, { body: JSON.stringify(data), method: 'PUT', headers: jsonHeader })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 200) {
        return dispatch(syncActions.putSuccess(json.body));
      }
      throw dispatch(syncActions.putFailure(json.errors));
    })
    .catch(err => dispatch(syncActions.putFailure(err)));
};

export const del = (URL, syncActions) => data => (dispatch) => {
  dispatch(syncActions.deleteRequest());
  return fetch(URL, { body: JSON.stringify(data), method: 'DELETE', headers: jsonHeader })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 204) {
        return dispatch(syncActions.deleteSuccess(data));
      }
      throw dispatch(syncActions.deleteFailure(json.errors));
    })
    .catch(err => dispatch(syncActions.deleteFailure(err)));
};

export default (URL, uniqueKeyValuePairID) => {
  const syncActions = configureSyncActions(uniqueKeyValuePairID);
  return {
    get: get(URL, syncActions),
    post: post(URL, syncActions),
    put: put(URL, syncActions),
    delete: del(URL, syncActions),
  };
};
