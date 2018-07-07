import React, {Component} from 'react';
import { connect } from 'react-redux';
import Logo from '../assets/logo.png';

class Sidemenu extends Component {
    render(){
        return(
            <div id="sideMenu">
                <header id="sideMenu__head">
                <img src={Logo} alt="WS"/>
                </header>
                <ul>
                    {this.props.user !== 'pending' && this.props.user ? ([<li key={1}><a href="/me">My Account</a></li>, <li key={2}><a href="/logout">Log out</a></li>]) : false}
                    <li><a href="/popular/spaces">Popular Spaces</a></li>
                    <li><a href="">My Spaces</a></li>
                </ul>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Sidemenu);