import React, {Component} from 'react';
import Logo from '../assets/logo.png';

class Loading extends Component {
  render(){
    return(
      <div className="loading-screen">
        <div className="inner-wrapper">
          <img src={Logo} alt="Loading.."/>
          <h1>Work Space</h1>
          <hr/>
          <span>Is Now Loading</span>
        </div>
      </div>
    );
  }
};

export default Loading;