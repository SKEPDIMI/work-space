import React, { Component } from 'react';
import BaseView from '../components/util/BaseView';

class About extends Component {
  render(){
    return(
      <div>
        <BaseView>
          <div className="content-wrapper">
            <h1>About Workspace</h1>
            <hr />
            <div className="container-fluid">
              <p className="lead">A platform dedicated to the community and learning</p>
            </div>

            <p>Workspace is a platform for users to share ideas, find resources, ask questions, and learn more every day. You can think of it as a Q&A for any topic you might be interested in.</p>
          </div>
        </BaseView>
      </div>
    );
  }
};

export default About;