import React, {Component} from 'react';
import '../assets/stylesheets/landing.css';

import Typewriter from '../components/Typewriter';
import BaseView from '../components/util/BaseView';

class Landing extends Component {
	render(){
		return(
			<div>
				<BaseView>
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
				</BaseView>
			</div>
		);
	}
};

export default (Landing);