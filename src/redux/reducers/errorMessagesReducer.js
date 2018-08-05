export default (state = [], action) => {
  switch(action.type) {
    case "SHOW_ERROR":
      if (state.includes(action.payload)) {
        return state
      }
      return [...state, action.payload]
    case "REMOVE_ERROR":
      if (state.includes(action.payload)) {
        return [
          ...state
          .filter(m => m !== action.payload)
        ]
      }
      return state
    default:
      return state
  }
}