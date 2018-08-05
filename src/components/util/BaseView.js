import React, { Component } from 'react';
import Header from '../global/Header';
import Sidemenu from '../global/Sidemenu';
import Footer from '../global/Footer';

class BaseView extends Component {
  render(){
    return(
      <div className="base-view">
        <Header/>
        <Sidemenu/>
          <div className="content">
            {this.props.children}
          </div>
        <Footer/>
      </div>
    );
  }
};

export default BaseView;
