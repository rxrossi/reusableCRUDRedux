export default (reducerFunction, reducerPredicate) => (state, action) => {
  const isInitializationCall = state === undefined;
  const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
  return shouldRunWrappedReducer ?
    reducerFunction(state, reducerPredicate(action) ? action : {}) :
    state;
};
