import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reusableCRUDRedux from '../src';

const URLS = {
  CLIENTS: 'http://localhost:5001/clients',
  PRODUCTS: 'http://localhost:5001/products',
};

describe('asyncActions test', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('get actions', () => {
    describe('using URLS.CLIENTS and clients as params', () => {
      it('works for get action', async () => {
        // Prepare
        const clientsList = [
          { name: 'client1' },
          { name: 'client2' },
        ];
        fetchMock.get(URLS.CLIENTS, { code: 200, body: clientsList });
        const { reducer, asyncActions } = reusableCRUDRedux(URLS.CLIENTS, 'clients');

        const store = createStore(
          combineReducers({
            clients: reducer,
          }),
          applyMiddleware(thunk),
        );

        const action = asyncActions.get();
        // Act
        return store.dispatch(action).then(() =>
          // Assert
          expect(store.getState().clients.entities).toEqual(clientsList));
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
        return store.dispatch(action).then(() =>
          // Assert
          expect(store.getState().clients.entities).toEqual(expectedEntities));
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
        return store.dispatch(action).then(() =>
          // Assert
          expect(store.getState().clients.entities).toEqual(expectedEntities));
      });

      it.only('works for delete actions', () => {
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
        // Act
        return store.dispatch(action).then(() =>
          // Assert
          expect(store.getState().clients.entities).toEqual(expectedEntities));
      });
    });
  });
});
