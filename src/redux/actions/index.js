import Axios from "axios";

export const setUser = userData => ({
  type: 'SET_USER',
  payload: userData
});
export const setPopularSpaces = () => {
  return dispatch => {
    Axios.get('/api/spaces', {
      headers: {
        subscribed: "2"
      }
    })
    .then((response) => {
      dispatch({type: 'SET_POPULAR_SPACES', payload: response.data});
    })
    .catch((err) => {
      console.log(err.response.data)
    });
  };
}