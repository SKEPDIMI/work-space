import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';
import './assets/stylesheets/global.css';

import Routes from './components/Routes';

import config from './config';
import store from './redux/store.js';
import addUser from './redux/actions';

//localStorage.workspace.token
if (localStorage.getItem('workspaceData')) {// IF THE USER HAS A TOKEN, VERIFY IT AND GET THE USER DATA FROM API
  let workspaceData = JSON.parse(localStorage.getItem('workspaceData'));
  axios.get(config.apiURL + '/api/auth', {
    headers: {
      'token': workspaceData.token
    }
  })
  .then(response=>{
    console.log(response.data)
  })
  .catch(error=>{
    console.log(error.response.status)
    store.dispatch(addUser({}));
  });
} else {
  let stringifiedPayload = JSON.stringify({token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMGQ5Y2VkY2JkOGZmMTQyMjM1MGFkZSIsImlhdCI6MTUyNzcxNTA2MSwiZXhwIjoxNTI3ODAxNDYxfQ.oeARzj_PpYRzNcWDHeylXiiQfPVEdW_oLM4yraYt7bU'});
  localStorage.setItem('workspaceData', stringifiedPayload )
}
ReactDOM.render((
    <Routes/>
  ), document.getElementById('root'));