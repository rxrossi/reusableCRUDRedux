import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reusableCRUDRedux from '../src';

const URLS = {
  CLIENTS: 'http://localhost:5001/clients',
  PRODUCTS: 'http://localhost:5001/products',
};


const preAPIStatusWithErrors = {
  get: {
    working: true,
    errors: {
      someKey: 'someVall',
    },
  },
  post: {
    working: true,
    errors: {
      someKey: 'someVall',
    },
  },
  put: {
    working: true,
    errors: {
      someKey: 'someVall',
    },
  },
  delete: {
    working: true,
    errors: {
      someKey: 'someVall',
    },
  },
};

describe('asyncActions test', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('using URLS.CLIENTS and clients as params, asserting against state.clients.entities, state.clients.formFields state.APIStatus', () => {
    it('works for get action', async () => {
      // Prepare

      const clientsList = [
        { name: 'client1' },
        { name: 'client2' },
      ];
      fetchMock.get(URLS.CLIENTS, { code: 200, body: clientsList });
      const { reducer, asyncActions } = reusableCRUDRedux(URLS.CLIENTS, 'clients');

      const initialState = {
        clients: {
          entities: [],
          APIStatus: preAPIStatusWithErrors,
          formFields: {
            create: {},
            update: {},
          },
        },
      };

      const expectedAPIStatus = {
        ...preAPIStatusWithErrors,
        get: {
          errors: {},
          working: false,
        },
      };

      const store = createStore(
        combineReducers({
          clients: reducer,
        }),
        initialState,
        applyMiddleware(thunk),
      );

      const action = asyncActions.get();
      // Act
      return store.dispatch(action).then(() => {
        // Assert
        expect(store.getState().clients.entities).toEqual(clientsList);
        expect(store.getState().clients.APIStatus).toEqual(expectedAPIStatus);
      });
    });

    it('works for post action', () => {
      // Prepare
      const clientBody = { name: 'clientPosted' };
      fetchMock.post(
        (url, opts) => url === URLS.CLIENTS && opts.body === JSON.stringify(clientBody)
        , { code: 201, body: clientBody },
      );
      const { reducer, asyncActions } = reusableCRUDRedux(URLS.CLIENTS, 'clients');

      const clientsList = [
        { name: 'client1' },
        { name: 'client2' },
      ];

      const initialState = {
        clients: {
          ...reducer(undefined, {}),
          entities: clientsList,
          formFields: {
            create: {
              ...clientBody,
            },
          },
          APIStatus: preAPIStatusWithErrors,
        },
      };

      const expectedAPIStatus = {
        ...preAPIStatusWithErrors,
        post: {
          working: false,
          errors: {},
        },
      };

      const expectedEntities = [
        clientBody,
        ...clientsList,
      ];

      const store = createStore(
        combineReducers({
          clients: reducer,
        }),
        initialState,
        applyMiddleware(thunk),
      );

      const action = asyncActions.post(clientBody);
      // Act
      return store.dispatch(action).then(() => {
        // Assert
        expect(store.getState().clients.entities).toEqual(expectedEntities);
        expect(store.getState().clients.formFields.create).toEqual({});
        expect(store.getState().clients.APIStatus).toEqual(expectedAPIStatus);
      });
    });

    it('works for put actions', () => {
      const clientBody = { id: '1', name: 'renamedClient' };
      fetchMock.put(
        (url, opts) => url === URLS.CLIENTS && opts.body === JSON.stringify(clientBody)
        , { code: 200, body: clientBody }, // 200 because it returns data,
        // 204 would not return a body
      );
      const { reducer, asyncActions } = reusableCRUDRedux(URLS.CLIENTS, 'clients');

      const clientsList = [
        { id: '1', name: 'client1' },
        { id: '2', name: 'client2' },
      ];

      const initialState = {
        clients: {
          ...reducer(undefined, {}),
          entities: clientsList,
          formFields: {
            update: {
              ...clientBody,
            },
          },
          APIStatus: preAPIStatusWithErrors,
        },
      };

      const expectedAPIStatus = {
        ...preAPIStatusWithErrors,
        put: {
          working: false,
          errors: {},
        },
      };

      const expectedEntities = [
        clientBody,
        clientsList[1],
      ];

      const store = createStore(
        combineReducers({
          clients: reducer,
        }),
        initialState,
        applyMiddleware(thunk),
      );

      const action = asyncActions.put(clientBody);
      // Act
      return store.dispatch(action).then(() => {
        // Assert
        expect(store.getState().clients.entities).toEqual(expectedEntities);
        expect(store.getState().clients.formFields.update).toEqual({});
        expect(store.getState().clients.APIStatus).toEqual(expectedAPIStatus);
      });
    });

    it('works for delete actions', () => {
      const deleteId = '2';
      fetchMock.delete(
        (url, opts) => url === URLS.CLIENTS && opts.body === JSON.stringify(deleteId)
        , { code: 204, body: undefined }, // 200 because it returns data,
        // 204 would not return a body
      );
      const { reducer, asyncActions } = reusableCRUDRedux(URLS.CLIENTS, 'clients');

      const clientsList = [
        { id: '1', name: 'client1' },
        { id: '2', name: 'client2' },
        { id: '3', name: 'client3' },
      ];

      const initialState = {
        clients: {
          ...reducer(undefined, {}),
          entities: clientsList,
          APIStatus: preAPIStatusWithErrors,
        },
      };

      const expectedEntities = [
        clientsList[0],
        clientsList[2],
      ];

      const store = createStore(
        combineReducers({
          clients: reducer,
        }),
        initialState,
        applyMiddleware(thunk),
      );

      const action = asyncActions.delete(deleteId);
      const expectedAPIStatus = {
        ...preAPIStatusWithErrors,
        delete: {
          errors: {},
          working: false,
        },
      };
      // Act
      return store.dispatch(action).then(() => {
        // Assert
        expect(store.getState().clients.entities).toEqual(expectedEntities);
        expect(store.getState().clients.APIStatus).toEqual(expectedAPIStatus);
      });
    });
  });
});
