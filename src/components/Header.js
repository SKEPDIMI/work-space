import React, { Component } from 'react';
import Logo from '../assets/thumbnail.png';
import { Link } from 'react-router-dom'
import $ from 'jquery';

import store from '../redux/store';

class Header extends Component {
  constructor(props){
    super(props);

    this.toggleSide = this.toggleSide.bind(this);
    this.state = ({user:store.getState()})
  };
  componentDidMount(){
    store.subscribe(() => {
      let user = store.getState();
      
      user ? this.setState({user}) : this.setState({user:undefined});
    })
  }

  toggleSide(){
    $(".nav-bars").toggleClass("active")
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
  render() {
    return (
        <div className="header-master">
        <header className="header-pre">
        <Link to="/landing">Home</Link><Link to="/about">About Us</Link><Link to="/help">Help</Link><Link to="/donate">Donate</Link>
        </header>
        <header className="header-main">
        <div className="header-main__left">       
            <Link to="/"><img src={Logo} alt="WS"/></Link>
            <Link to="/"><h1>WorkSpace</h1></Link>
        </div>
        <div className="header-main__right">
        <Link to="/teams">Spaces</Link>

        {!this.state.user ? ([
        <a key={1} href="/signup" className="signup">Sign Up</a>,
        <a key={2} href="/login" className="login">Log In</a> ]) : [<a key={1}href="/me">My Account</a>,<a key={2}href="/logout">Log out</a>]}
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

export default Header;
