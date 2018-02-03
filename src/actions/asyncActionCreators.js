import 'isomorphic-fetch'; /* global fetch */
import configureSyncActions from './syncActionCreators';

export const get = (URL, syncActions, headerCreator) => () => (dispatch) => {
  dispatch(syncActions.getRequest());
  return fetch(URL, { headers: headerCreator() })
    .then(res => res.json())
    .then((json) => {
      if (json.statusCode === 200) {
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

export const post = (URL, syncActions, headerCreator) => data => (dispatch) => {
  dispatch(syncActions.postRequest());
  return fetch(URL, { body: JSON.stringify(data), method: 'POST', headers: headerCreator() })
    .then(res => res.json())
    .then((json) => {
      if (json.statusCode === 200) {
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

export const put = (URL, syncActions, headerCreator) => data => (dispatch) => {
  dispatch(syncActions.putRequest());
  return fetch(URL, { body: JSON.stringify(data), method: 'PUT', headers: headerCreator() })
    .then(res => res.json())
    .then((json) => {
      if (json.statusCode === 200) {
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

export const del = (URL, syncActions, headerCreator) => data => (dispatch) => {
  dispatch(syncActions.deleteRequest());
  return fetch(URL, { body: JSON.stringify(data), method: 'DELETE', headers: headerCreator() })
    .then(res => res.json())
    .then((json) => {
      if (json.statusCode === 204) {
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

export default (URL, uniqueKeyValuePairID, headerCreator) => {
  const syncActions = configureSyncActions(uniqueKeyValuePairID);
  return {
    get: get(URL, syncActions, headerCreator),
    post: post(URL, syncActions, headerCreator),
    put: put(URL, syncActions, headerCreator),
    delete: del(URL, syncActions, headerCreator),
  };
};
