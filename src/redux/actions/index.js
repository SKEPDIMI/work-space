import axios from "axios";
import config from '../../config';

export const setUser = userData => ({
  type: 'SET_USER',
  payload: userData || false
});

export const fetchPopularSpaces = () => {
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
    let workspaceToken = JSON.parse(
      localStorage.getItem('workspaceToken') || "false"
    );
    if (!workspaceToken) return setUser(false);

    try {
      let response = await axios.get(config.apiURL + '/api/auth', {
        headers: {
          token: workspaceToken.token
        }
      });
      let user = response.data;
      
      user.token = workspaceToken.token;

      return setUser(user);
    }
    catch(error) {
      localStorage.setItem('workspaceToken', "false");
      return setUser(false);
    }
};

export const showError = message => {
  return {
    type: 'SHOW_ERROR',
    payload: message
  }
}

export const removeError = message => {
  return {
    type: 'REMOVE_ERROR',
    payload: message
  }
}