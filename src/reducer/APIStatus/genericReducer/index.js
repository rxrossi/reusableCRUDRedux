const defaultState = {
  working: false,
  errors: {},
};

export default (state = defaultState, action) => {
  if (!action.type) {
    return state;
  }
  switch (action.type.split('_')[1]) {
    case 'REQUEST':
      return {
        working: true,
        errors: {},
      };
    case 'SUCCESS':
      return {
        working: false,
        errors: {},
      };
    case 'ERROR':
      return {
        working: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};
