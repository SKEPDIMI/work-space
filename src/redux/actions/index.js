import api from '../../api';

export const setUser = userData => ({
  type: 'SET_USER',
  payload: userData || false
});

export const fetchPopularSpaces = () => dispatch => {
  dispatch({type: 'SET_POPULAR_SPACES', payload: 'pending'});

  api.get('/spaces')
  .then((response) => {
    dispatch({type: 'SET_POPULAR_SPACES', payload: response.data || []});
  });
}

export const fetchUser = () => dispatch => {
  let workspaceToken = JSON.parse(
    localStorage.getItem('workspaceToken') || "false"
  );

  if (!workspaceToken) return dispatch(setUser(false));

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
      localStorage.setItem('workspaceToken', "false");
      dispatch(setUser(false));
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