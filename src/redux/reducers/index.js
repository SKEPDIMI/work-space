const reducer = (state = {}, action) => {
  if (action.type === 'ADD_USER') {
    return action.payload
  } else {
    return state
  }
};
export default reducer;