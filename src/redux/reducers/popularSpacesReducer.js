export default (state = 'pending', action) => {
  switch (action.type) {
    case "SET_POPULAR_SPACES":
      return action.payload || []
    default:
      return state
  }
}
