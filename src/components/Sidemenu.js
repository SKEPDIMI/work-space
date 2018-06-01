import React, {Component} from 'react';
import Logo from '../assets/logo.png';

class Sidemenu extends Component {
    render(){
        return(
            <div id="sideMenu">
                <header id="sideMenu__head">
                <img src={Logo} alt="WS"/>
                </header>
                <ul>
                    <li><a href="">Popular Spaces</a></li>
                    <li><a href="">My Spaces</a></li>
                </ul>
            </div>
        );
    }
};

export default Sidemenu;