import React, { Component } from 'react';
import Logo from '../assets/thumbnail.png';
import { Link } from 'react-router-dom'
import $ from 'jquery';

import {connect} from 'react-redux';

class Header extends Component {
  constructor(props){
    super(props);

    this.toggleSide = this.toggleSide.bind(this);
  };

  toggleSide(){
    $(".nav-bars").toggleClass("active")
    $('#sideMenu').stop().animate({
      'width' : 'toggle'
    });
  }
  render() {
    return (
        <div className="header-master">
          <header className="header-pre">
          <Link to="/landing">Home</Link><Link to="/about">About Us</Link><Link to="/help">Help</Link><Link to="/donate">Donate</Link>
          </header>
          <header className="header-main">
            <div className="header-main__left navbar">       
                <a href="/landing"><img src={Logo} alt="WS"/></a>
            </div>
            <div className="header-main__right navbar">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Popular
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/popular/spaces">Spaces</a>
                  <a className="dropdown-item" href="/popular/users">Users</a>
                  <a className="dropdown-item" href="/popular/posts">Posts</a>
                </div>
              </li>
            {!this.props.user ? ([
            <a key={1} href="/signup" className="signup">Sign Up</a>,
            <a key={2} href="/login" className="login">Log In</a> ]) : [<a key={1}href="/me">My Account</a>]}
              <div className="nav-bars" onClick={this.toggleSide}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </header>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Header);
