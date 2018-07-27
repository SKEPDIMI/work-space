import React, {Component} from 'react';
import LoadingScreen from './LoadingScreen';

import { setUser } from '../../redux/actions';
import { connect } from 'react-redux';

class LogOut extends Component {
  componentDidMount(){
    this.props.setUser(false);
    localStorage.removeItem("workspaceToken");
    window.location = '/';
  }
  render(){
    return(
      <LoadingScreen />
    );
  }
};

export default connect(null, { setUser })(LogOut);
