import React, { Component } from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import Sidemenu from '../components/global/Sidemenu';
import Axios from 'axios';
import config from '../config';

class VerifyEmail extends Component {
  componentDidMount() {
    let TFASessionID = this.props.match.params.id;
    if (!TFASessionID) {
      return window.location = ''
    };

    Axios.get(config.apiURL + '/api/verifyEmail?id=' + TFASessionID )
    .then(response => {
      this.setState({message: response.data.message + '. Redirecting...'});

      localStorage.setItem('workspaceToken', JSON.stringify({ token: response.data.token }));
      setTimeout(() => window.location = '/me', 3000)
    })
    .catch(err => {
      /* Give us an error */
      this.setState({message: err.response.data.message + '. If you think this is an error, contact customer support'});
    });
  }
  constructor(props){
    super(props);

    this.state = {
      message: 'Verifying email'
    };
  };
  render(){
    return(
      <div>
        <Header/>
        <Sidemenu/>
        <div className="content container-fluid">
          <h1>Verifying email</h1>
          <hr/>
          <p>{this.state.message}</p>
        </div>
        <Footer/>
      </div>
    );
  }
};

export default VerifyEmail;
