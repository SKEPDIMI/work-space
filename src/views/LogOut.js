import React, {Component} from 'react';
import Loading from './Loading';

import { setUser } from '../redux/actions';
import { connect } from 'react-redux';

class LogOut extends Component {
  componentDidMount(){
    this.props.setUser(false);
    localStorage.removeItem("workspaceToken");
    window.location = '/';
  }
  render(){
    return(
      <Loading/>
    );
  }
};

export default connect(null, { setUser })(LogOut);
