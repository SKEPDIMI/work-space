import React, {Component} from 'react';
import Loading from './Loading';

import store from '../redux/store';
import addUser from '../redux/actions';

class LogOut extends Component {
  componentDidMount(){
    store.dispatch(addUser(undefined))
    localStorage.removeItem("workspaceToken");
    window.location = '/';
  }
render(){
return(
<Loading/>
);
}
};

export default LogOut;