import React, {Component} from 'react';
import LoadingScreen from './LoadingScreen';

import { setUserDefault } from '../../redux/actions';
import { connect } from 'react-redux';

class LogOut extends Component {
  componentDidMount(){
    this.props.setUserDefault();
    localStorage.removeItem("workspaceToken");
    window.location = '/';
  }
  render(){
    return(
      <LoadingScreen />
    );
  }
};

export default connect(
  null, 
  { setUserDefault }
)(LogOut);
