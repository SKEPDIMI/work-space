import React, {Component} from 'react';
import $ from 'jquery';
import api from '../api';

import queryString from 'query-string'
import { connect } from 'react-redux';

import BaseView from '../components/util/BaseView';

class SignIn extends Component {
  componentWillMount(){
    if (this.props.user === true) {
      window.location = '/'
    }
  }
  displayError(error) {
    $(".form-modal").removeClass('success').addClass('failure').text(error);
  }
  displaySuccess(message) {
    $(".form-modal").removeClass('failure').addClass('success').text(message);
  }
  formSubmit(event){
    event.preventDefault()
    let formData = new FormData(event.target);
    formData.append('id', this.props.user._id)
    this.displaySuccess("Logging in...")

    api.post('/auth', formData)
      .then(response => {
        if (!response.ok) {
          return this.displayError(response.data.message);
        }

        localStorage.setItem('workspaceToken', JSON.stringify({token:response.data.token}));

        let values = queryString.parse(window.location.search);
        if (values.redirect) {
          window.location = values.redirect
        } else {
          window.location = '/'
        }
      })
      .catch( error => {

      })

  }
  constructor(props){
    super(props);
    this.state = {};
    this.formSubmit = this.formSubmit.bind(this);
    this.displayError = this.displayError.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
  };
  render(){
    return(
      <BaseView>
        <div className="content-wrapper container-fluid">
          <div className="row">
            <div className="col">
              <h1>Welcome back!</h1>
              <hr/>
              <span className="form-modal"></span>
            </div>

            <div className="col-8">
              <form onSubmit={this.formSubmit}>
              <div className="form-group">
              <label>Email</label>
              <input name="email" className="form-control" type="email" placeholder="Email" required/>
              </div>
              <div className="form-group">
              <label>Password</label>
              <input name="password" className="form-control" type="password" placeholder="Password" required/>
              </div>

              <button type="submit" className="btn btn-info">Log In</button>
              </form>
              <a href="signup">No account?</a>
            </div>
          </div>
        </div>
      </BaseView>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(SignIn);
