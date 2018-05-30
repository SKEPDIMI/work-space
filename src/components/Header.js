import React, { Component } from 'react';
import Logo from '../assets/thumbnail.png';
import { Link } from 'react-router-dom'
import $ from 'jquery';

class Header extends Component {
  toggleSide(){
    $('#sideMenu').stop().animate({
      'width' : 'toggle'
    });
    if ($('body').hasClass('lock-scroll')) {
      $('body').removeClass('lock-scroll');
    }
    else {
        $('body').addClass('lock-scroll');
    }
  }
  constructor(props){
    super(props);
    this.toggleSide = this.toggleSide.bind(this);
  };
  render() {
    return (
        <div className="header-master">
        <header className="header-pre">
        <Link to="/landing">Home</Link><Link to="/FAQ">FAQ</Link><Link to="/help">Help</Link><Link to="/service">Service</Link>
        </header>
        <header className="header-main">
        <div className="header-main__left">       
            <Link to="/landing"><img src={Logo} alt="WS"/></Link>
        </div>
        <div className="header-main__right">
        <Link to="/teams"><i></i>Spaces</Link>
        <Link to="/about"><i></i>About</Link>
        <Link to="/signin"><i></i>Sign In</Link>
        <button className="btn fa fa-bars" onClick={this.toggleSide}></button>
        </div>
        </header>
        </div>
    );
  }
}

export default Header;
