import React, { Component } from 'react';
import Logo from '../../assets/logo.png';

class CouldNotLoad extends Component {
  render(){
    return(
      <div className="error-screen">
        <div className="inner-wrapper">
          <img src={Logo} alt="Loading.."/>
          <h1>Work Space</h1>
          <hr/>
          <p>Sorry, but {this.props.name} could not be loaded...</p>
          <a href="/landing">Back home </a>
          <a href={window.location} onClick={window.location.reload}> Refresh</a>
        </div>
      </div>
    );
  }
};

export default CouldNotLoad;
