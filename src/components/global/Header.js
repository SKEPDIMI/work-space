import React, { Component } from 'react';
import Logo from '../../assets/thumbnail.png';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import { connect } from 'react-redux';
import GlobalError from '../util/GlobalError';

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
    let { user } = this.props;
    
    return (
      <div className="header-master">
        <header className="header-pre">
          <GlobalError />
          <Link to="/landing">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/help">Help</Link>
          <Link to="/donate">Donate</Link>
        </header>
        <header className="header-main">
          <div className="header-main__left navbar">
              <a href="/landing"><img src={Logo} alt="WS"/></a>
          </div>
          <div className="header-main__right navbar">
            <a href="#" className="nav-link" onClick={() => $('.header-dropdown').slideToggle()}>
              Popular
            </a>
            {!user.authenticated && !user.loading ? ([
              <a key={1} href="/signup" className="signup">Sign Up</a>,
              <a key={2} href="/login" className="login">Log In</a> ]) : [<a key={1}href="/me">My Account</a>
            ]}
            <div className="nav-bars" onClick={this.toggleSide}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </header>
        <div className="header-dropdown" onMouseLeave={() => $('.header-dropdown').slideUp()}>
          <a href="/popular/spaces">Spaces</a>
          <a href="/popular/users">Users</a>
          <a href="/popular/posts">Posts</a>
        </div>
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
