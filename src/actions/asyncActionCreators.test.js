import fetchMock from 'fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import syncActionsConfigurer from './syncActionCreators';
import asyncActionsConfigurer from './asyncActionCreators';

const RESOURCE_URL = 'http:localhost:5001/clients';

const asyncActions = asyncActionsConfigurer(RESOURCE_URL, 'clients');

const syncActions = syncActionsConfigurer('clients');

const headers = { 'content-type': 'application/json' };
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Async actions tests', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('Tests considering clients as name of resource', () => {
    describe('GET', () => {
      it('works in a basic case ', () => {
        // Prepare
        const expectedPayload = [
          { name: 'Mary', phone: '123' },
          { name: 'John', phone: '456' },
        ];
        fetchMock.get(RESOURCE_URL, { body: { code: 200, body: expectedPayload }, headers });

        const store = mockStore({});

        // Act
        return store.dispatch(asyncActions.get())
          .then(() => {
            // Assert
            expect(store.getActions()).toEqual([
              syncActions.getRequest(),
              syncActions.getSuccess(expectedPayload),
            ]);
          });
      });
    });

    describe('POST', () => {

    });
  });
});
