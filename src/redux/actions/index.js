import axios from "axios";
import config from '../../config';

export const setUser = userData => ({
  type: 'SET_USER',
  payload: userData
});

export const setPopularSpaces = () => {
  return dispatch => {
    axios.get(config.apiURL + '/api/spaces?subscribed=2')
      .then((response) => {
        dispatch({type: 'SET_POPULAR_SPACES', payload: response.data});
      })
      .catch((err) => {
        console.log(err.response.data)
      });
  };
}
