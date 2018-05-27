import React, { Component } from 'react';
import Logo from '../assets/thumbnail.png';
import { Link } from 'react-router-dom'

class Header extends Component {
  toggleSide(){
    let sideMenu = document.getElementById('sideMenu');
    let width = sideMenu.offsetWidth;
    sideMenu.removeAttribute('class');
    if(width <= 0){
      sideMenu.setAttribute( 'class', 'slideOpen' );
    } else {
      sideMenu.setAttribute( 'class', 'slideClosed' );
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
            <img src={Logo} alt="WS"/>
            <Link to="/landing">WorkSpace</Link>
        </div>
        <div className="header-main__right">
        <Link to="/teams"><i></i>Teams</Link>
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
