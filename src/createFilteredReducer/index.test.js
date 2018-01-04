import { combineReducers, createStore } from 'redux';
import sut from './index';

describe('createFilteredReducer', () => {
  it('works in a basic case', () => {
    // Prepare
    const entitiesReducer = (state = [], action) => {
      switch (action.type) {
        case 'ADD':
          return [
            ...state,
            action.entity,
          ];
        default:
          return state;
      }
    };

    const rootReducer = combineReducers({
      clients: sut(entitiesReducer, action => action.feature === 'clients'),
      professionals: sut(entitiesReducer, action => action.feature === 'professionals'),
    });

    const store = createStore(rootReducer);

    // Act
    store.dispatch({
      type: 'ADD',
      feature: 'clients',
      entity: {
        name: 'Client 1',
      },
    });

    // Assert
    expect(store.getState()).toEqual({
      clients: [
        { name: 'Client 1' },
      ],
      professionals: [],
    });
  });
});
