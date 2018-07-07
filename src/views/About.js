import React, {Component} from 'react';
import Header from '../components/Header';
import Sidemenu from '../components/Sidemenu';
import Footer from '../components/Footer';

class About extends Component {
  render(){
    return(
      <div>
        <Header />
        <Sidemenu />
        <div className="container-fluid content">
          <h1>About Workspace</h1>
          <hr />
          <div className="container-fluid">
            <p className="lead">A platform dedicated to the community and learning</p>
          </div>

          <p>Workspace is a platform for users to share ideas, find resources, ask questions, and learn more every day. You can think of it as a Q&A for any topic you might be interested in.</p>
        </div>
        <Footer />
      </div>
    );
  }
};

export default About;