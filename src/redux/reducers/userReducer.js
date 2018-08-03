export default (state = 'pending', action) => {
  switch(action.type){
    case "SET_USER":
      return action.payload
    default:
      return state
  }
}
