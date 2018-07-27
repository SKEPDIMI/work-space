import axios from "axios";
import config from '../../config';

export const setUser = userData => ({
  type: 'SET_USER',
  payload: userData || false
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

export const fetchUser = async () => {
    let workspaceData = JSON.parse(localStorage.getItem('workspaceToken'));
    if (!workspaceData) return setUser(false);

    try {
      let response = await axios.get(config.apiURL + '/api/auth?token=' + workspaceData.token);
      return setUser(response.data);
    }
    catch(error) {
      console.log('Error fetching user')
      localStorage.setItem('workspaceToken', "false");
      return setUser(false);
    }
};
