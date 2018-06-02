const reducer = (state = {}, action) => {
  if (action.type === 'ADD_USER') {
    return { ...state, currentUser: action.payload }
  } else {
    return state
  }
};
export default reducer;
