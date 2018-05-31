import React, {Component} from 'react';
import Loading from './Loading';

class LogOut extends Component {
  componentDidMount(){
    localStorage.removeItem("workspaceData");
    window.location = '/';
  }
render(){
return(
<Loading/>
);
}
};

export default LogOut;