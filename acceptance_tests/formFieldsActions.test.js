import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reusableCRUDRedux from '../src';

const URL = 'http://localhost:5001/clients';

describe('formFieldsActions', () => {
  describe('chnage fields', () => {
    it('can change a regular field', () => {
      // Prepare
      const {
        reducer,
        createFormFieldActions,
      } = reusableCRUDRedux(URL, 'clients');

      const store = createStore(
        combineReducers({
          clients: reducer,
        }),
        applyMiddleware(thunk),
      );

      const action = createFormFieldActions.changeField('name', 'someName');
      // Act
      store.dispatch(action);
      // Assert
      const expected = { name: 'someName' };
      expect(store.getState().clients.formFields.create).toEqual(expected);
    });
    it('can change a field inside and array', () => {
      // Prepare
      const {
        reducer,
        createFormFieldActions,
      } = reusableCRUDRedux(URL, 'clients');

      const store = createStore(
        combineReducers({
          clients: reducer,
        }),
        applyMiddleware(thunk),
      );

      const action = createFormFieldActions.changeField(['sons', 2, 'name'], 'someName');
      // Act
      store.dispatch(action);
      // Assert
      const expected = {
        sons: [
          undefined,
          undefined,
          {
            name: 'someName',
          },
        ],
      };
      expect(store.getState().clients.formFields.create).toEqual(expected);
    });
  });
});
