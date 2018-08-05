import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showError } from '../redux/actions';

import api from '../api';

import BaseView from '../components/util/BaseView';

class VerifyEmail extends Component {
  componentDidMount() {
    let TFASessionID = this.props.match.params.id;
    if (!TFASessionID) {
      return window.location = ''
    };

    api.get('/verifyEmail?id=' + TFASessionID )
    .then(response => {
      if (response.ok) {
        this.setState({
          message: response.data.message + '. Redirecting...'
        });
  
        localStorage.setItem('workspaceToken', JSON.stringify({ token: response.data.token }));
        setTimeout(() => window.location = '/me', 3000)
      } else {
        this.setState({
          message: response.data.message
        })
      }
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
      <BaseView>
        <div className="content-wrapper">
          <h1>Verifying email</h1>
          <hr/>
          <p>{this.state.message}</p>
        </div>
      </BaseView>
    );
  }
};

export default connect(
  null,
  { showError }
)(VerifyEmail);
