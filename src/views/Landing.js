import React, {Component} from 'react';
import $ from 'jquery';
import ScrollMagic from 'scrollmagic';
import '../assets/stylesheets/landing.css';

import Typewriter from '../components/Typewriter';
import BaseView from '../components/util/BaseView';

class Landing extends Component {
	componentDidMount() {
		let controller = new ScrollMagic.Controller();
    $(".fade-in-text").each((i, text) => {
			let textScene = new ScrollMagic.Scene({
					offset: i * 100,
					triggerHook: .8,
					triggerElement: text
			});

			textScene
				.setClassToggle(text, "active")
				.addTo(controller);
		});
	}
	render(){
		return(
			<BaseView>
				<div className="cover-main">
					<div className="cover-main__middle">
						<h1>WorkSpace</h1>
						<h2>Find study groups on</h2>
						<Typewriter words={[
							'Computer Science', 'Calculus', 'Music Theory', 'Engineering'
						]}/>
					</div>
				</div>
				<div className="slide">
					<div className="container-fluid">
						<div className="row">
							<div className="col-6 fade-in-text main">
								<h4>Spaces</h4>
								<hr />
								<p>A place to discuss ideas and share resources amongst friends around the world</p>
							</div>
							<div className="col-6 fade-in-text main">
								<h4>Friends</h4>
								<hr />
								<p>Insert content here</p>
							</div>
							<div className="col-6 fade-in-text main">
								<h4>Lorem</h4>
								<hr />
								<p>Insert content here. This is filler while I work on the rest of the app.</p>
							</div>
							<div className="col-6 fade-in-text main">
								<h4>Ipsum</h4>
								<hr />
								<p>Insert content here. This is filler while I work on the rest of the app.</p>
							</div>
						</div>
						<div className="row-fluid">
							<blockquote className="blockquote text-left fade-in-text">
								<p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  							<footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
							</blockquote>
						</div>
					</div>
				</div>
			</BaseView>
		);
	}
};

export default (Landing);
