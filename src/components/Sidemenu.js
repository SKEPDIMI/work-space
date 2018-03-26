import React, {Component} from 'react';
import Logo from '../assets/logo.png';

class Sidemenu extends Component {
    render(){
        return(
            <div id="sideMenu">
                <header id="sideMenu__head">
                <img src={Logo} alt="WS"/>
                <hr/>
                <h2>WorkSpace</h2>
                </header>
                <button className="btn">
                    Popular teams
                </button>
                <button className="btn">
                    Create a team
                </button>
            </div>
        );
    }
};

export default Sidemenu;