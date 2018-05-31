import React, {Component} from 'react';
import Logo from '../assets/logo.png';

class Sidemenu extends Component {
    render(){
        return(
            <div id="sideMenu">
                <header id="sideMenu__head">
                <img src={Logo} alt="WS"/>
                </header>
                <button className="btn">
                    Popular Spaces
                </button>
                <button className="btn">
                    My Spaces
                </button>
                <button className="btn">
                    Create A Space
                </button>
            </div>
        );
    }
};

export default Sidemenu;