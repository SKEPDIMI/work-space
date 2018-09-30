import api from '../../api';
import localStorage from 'store';

export const setUser = userData => ({
  type: 'SET_USER',
  payload: userData || false
});
export const setUserDefault = () => ({
  type: 'SET_USER_DEFAULT'
});

export const fetchPopularSpaces = () => dispatch => {
  dispatch({type: 'SET_POPULAR_SPACES', payload: 'pending'});

  api.get('/spaces')
  .then((response) => {
    dispatch({type: 'SET_POPULAR_SPACES', payload: response.data});
  });
}

export const fetchUser = workspaceToken => dispatch => {
  if (!workspaceToken) return dispatch(setUserDefault());

  api.get('/auth', {}, {
    headers: {
      authorization: workspaceToken.token
    }
  }).then(response => {
    if (response.ok) {
      let user = response.data;
      user.token = workspaceToken.token;
      dispatch(setUser(user));
    } else {
      localStorage.setItem('workspaceToken', false);
      dispatch(setUserDefault());
    }
  });
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