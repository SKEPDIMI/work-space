import React, { Component } from 'react';

class NotFound extends Component {
  render(){
    return(
      <div className="slide bg-primary text-white d-flex justify-content-center">
        <div className="container-fluid d-flex flex-column justify-content-center">
          <h1 className="display-1">404</h1>
          <p>That page could not be found. Maybe it's doesn't exist anymore.</p>
          <div className="container">
            <button className="btn btn-light" onClick={() => window.location = '/landing'}>Back Home</button>
          </div>
        </div>
      </div>
    );
  }
};

export default NotFound;