import React, { Component } from 'react';
import Logo from '../../assets/logo.png';

class Spinner extends Component {
  render(){
    return(
        <img className={"spinner-img " + this.props.size || ''} src={Logo} alt="Loading.."/>
    );
  }
};

export default Spinner;