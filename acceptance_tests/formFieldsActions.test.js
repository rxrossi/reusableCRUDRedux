import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reusableCRUDRedux from '../src';

const URL = 'http://localhost:5001/clients';

describe('formFieldsActions', () => {
  describe('change fields', () => {
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
        updateFormFieldActions,
      } = reusableCRUDRedux(URL, 'clients');

      const store = createStore(
        combineReducers({
          clients: reducer,
        }),
        applyMiddleware(thunk),
      );

      const action = updateFormFieldActions.changeField(['sons', 2, 'name'], 'someName');
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
      expect(store.getState().clients.formFields.update).toEqual(expected);
    });
  });
  describe('append and remove fields', () => {
    it('can append a field when formFields.create is empty', () => {
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

      const action = createFormFieldActions.appendField('sons');
      // Act
      store.dispatch(action);
      // Assert
      const expected = { sons: [{}] };
      expect(store.getState().clients.formFields.create).toEqual(expected);
    });

    it('can append a field when formFields.create is not empty', () => {
      // Prepare
      const {
        reducer,
        createFormFieldActions,
      } = reusableCRUDRedux(URL, 'clients');

      const initialState = {
        clients: {
          ...reducer(undefined, {}),
          formFields: {
            create: {
              name: 'someName',
            },
          },
        },
      };

      const store = createStore(
        combineReducers({
          clients: reducer,
        }),
        initialState,
        applyMiddleware(thunk),
      );

      const action = createFormFieldActions.appendField('sons');
      // Act
      store.dispatch(action);
      // Assert
      const expected = {
        ...initialState.clients.formFields.create,
        sons: [{}],
      };
      expect(store.getState().clients.formFields.create).toEqual(expected);
    });
  });
});
