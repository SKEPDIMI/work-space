import React, {Component} from 'react';
import '../assets/stylesheets/landing.css';

import Header from '../components/global/Header';
import Footer from '../components/global/Footer';

import Typewriter from '../components/Typewriter';
import Sidemenu from '../components/global/Sidemenu';

class Landing extends Component {
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

export default (Landing);