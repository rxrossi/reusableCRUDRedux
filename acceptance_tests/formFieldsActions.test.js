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

    it('can remove a field', () => {
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
              sons: [
                { name: 'name1' },
                { name: 'name2' },
                { name: 'name3' },
              ],
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

      const action = createFormFieldActions.removeField(['sons'], 1);
      // Act
      store.dispatch(action);
      // Assert
      const expected = [
        initialState.clients.formFields.create.sons[0],
        initialState.clients.formFields.create.sons[2],
      ];
      expect(store.getState().clients.formFields.create.sons).toEqual(expected);
    });
  });
  describe('clear a form', () => {
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
    it('works for createForm', () => {
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
              sons: [
                { name: 'name1' },
                { name: 'name2' },
                { name: 'name3' },
              ],
            },
          },
          APIStatus: preAPIStatusWithErrors,
        },
      };

      const store = createStore(
        combineReducers({
          clients: reducer,
        }),
        initialState,
        applyMiddleware(thunk),
      );

      const action = createFormFieldActions.clear();
      // Act
      store.dispatch(action);
      // Assert
      const expectedFormFields = {};
      const expectedAPIStatus = {
        ...preAPIStatusWithErrors,
        post: {
          errors: {},
          working: false,
        },
      };
      expect(store.getState().clients.formFields.create).toEqual(expectedFormFields);
      expect(store.getState().clients.APIStatus).toEqual(expectedAPIStatus);
    });

    it('works for updateForm', () => {
      // Prepare
      const {
        reducer,
        updateFormFieldActions,
      } = reusableCRUDRedux(URL, 'clients');

      const initialState = {
        clients: {
          ...reducer(undefined, {}),
          formFields: {
            update: {
              sons: [
                { name: 'name1' },
                { name: 'name2' },
                { name: 'name3' },
              ],
            },
          },
          APIStatus: preAPIStatusWithErrors,
        },
      };

      const store = createStore(
        combineReducers({
          clients: reducer,
        }),
        initialState,
        applyMiddleware(thunk),
      );

      const action = updateFormFieldActions.clear();
      // Act
      store.dispatch(action);
      // Assert
      const expectedFormFields = {};
      const expectedAPIStatus = {
        ...preAPIStatusWithErrors,
        put: {
          errors: {},
          working: false,
        },
      };
      expect(store.getState().clients.formFields.update).toEqual(expectedFormFields);
      expect(store.getState().clients.APIStatus).toEqual(expectedAPIStatus);
    });
  });
});
