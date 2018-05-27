import React, {Component} from 'react';
import {Style} from '../assets/stylesheets/landing.css';
import {Animation} from '../assets/stylesheets/animations.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Typewriter from '../components/Typewriter';
import Sidemenu from '../components/Sidemenu';

class Landing extends Component {
    constructor(props){
      super(props);
      this.state = {};
    };
    render(){
        return(
            <div>
                <Header/>

                <Sidemenu/>
                <div className="cover-main">
                    <div className="cover-main__middle">
                    <h1>WorkSpace</h1>
                    <h2>Find study groups on</h2>
                    <Typewriter words={['Computer Science', 'Calculus', 'Music Theory', 'Engineering']}/>
                    </div>
                </div>
                <div className="slide">
                    [insert content]
                </div>
                <Footer/>
            </div>
        );
    }
};

export default Landing;