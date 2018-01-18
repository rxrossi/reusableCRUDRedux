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
      dispatch(syncActions.getFailure(json.errors));
      return false;
    })
    .catch((err) => {
      dispatch(syncActions.getFailure(err));
      throw new Error(err);
    });
};

export const post = (URL, syncActions) => data => (dispatch) => {
  dispatch(syncActions.postRequest());
  return fetch(URL, { body: JSON.stringify(data), method: 'POST', headers: jsonHeader })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 200) {
        return dispatch(syncActions.postSuccess(json.body));
      }
      dispatch(syncActions.postFailure(json.errors));
      return false;
    })
    .catch((err) => {
      dispatch(syncActions.postFailure(err));
      throw new Error(err);
    });
};

export const put = (URL, syncActions) => data => (dispatch) => {
  dispatch(syncActions.putRequest());
  return fetch(URL, { body: JSON.stringify(data), method: 'PUT', headers: jsonHeader })
    .then(res => res.json())
    .then((json) => {
      if (json.code === 200) {
        return dispatch(syncActions.putSuccess(json.body));
      }
      dispatch(syncActions.putFailure(json.errors));
      return false;
    })
    .catch((err) => {
      dispatch(syncActions.putFailure(err));
      throw new Error(err);
    });
};

export const del = (URL, syncActions) => data => (dispatch) => {
  dispatch(syncActions.deleteRequest());
  return fetch(URL, { body: JSON.stringify(data), method: 'DELETE', headers: jsonHeader })
    .then(res => res.json())
    .then((json) => {
      console.log(json);
      if (json.code === 204) {
        return dispatch(syncActions.deleteSuccess(data));
      }
      dispatch(syncActions.deleteFailure(json.errors));
      return false;
    })
    .catch((err) => {
      dispatch(syncActions.deleteFailure(err));
      throw new Error(err);
    });
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
