import axios from "axios";
import config from '../../config';

export const setUser = userData => ({
  type: 'SET_USER',
  payload: userData
});

export const setPopularSpaces = () => {
  return dispatch => {
    dispatch({type: 'SET_POPULAR_SPACES', payload: 'pending'});

    axios.get(config.apiURL + '/api/spaces')
    .then((response) => {
      dispatch({type: 'SET_POPULAR_SPACES', payload: response.data});
    })
    .catch((err) => {
      dispatch({type: 'SET_POPULAR_SPACES', payload: []});
    });
  };
}
