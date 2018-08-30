import React, {Component} from 'react';
import $ from 'jquery';

import api from '../api';
import { connect } from 'react-redux';

import BaseView from '../components/util/BaseView';

class SignIn extends Component {
  componentDidMount(){
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

    $(".form-modal").removeClass('failure').addClass('success').text('Creating Account...');

    api.post('/users', formData)
    .then( response => {
      if (response.ok) {
        this.displaySuccess('Almost done...');

        let { id } = response.data;

        api.post('/verifyEmail', { userId: id })
        .then( response => {
          if (response.ok) {
            this.setState({
              done: true
            })
          } else {
            this.displayError(response.data.message);
          }
        });
      } else {
        this.displayError(response.data.message);
      }
    });
  }
  constructor(props){
    super(props);
    this.state = {
      done: false
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.displayError = this.displayError.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
  };
  render(){
    if (!this.state.done) {
      return (
        <BaseView>
          <div className="content-wrapper container-fluid">
            <div className="row">
              <div className="col">
                <h1>Welcome to WorkSpace!</h1>
                <hr/>
                <span className="form-modal"></span>
              </div>

              <div className="col-8">
                <form onSubmit={this.formSubmit} encType="multipart/form-data">
                <div className="form-group">
                  <label>Username</label>
                  <input name="username" className="form-control" type="text" placeholder="Public username" required/>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" className="form-control" type="email" placeholder="Email" required/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input name="password" className="form-control" type="password" placeholder="Password" required/>
                </div>
                <div className="form-group">
                  <label>Profile picture</label>
                  <input name="avatar" className="form-control" type="file" accept="image/*"/>
                </div>

                <button type="submit" className="btn btn-info">Sign Up</button>
                </form>
                <a href="login">Or you can log in</a>
              </div>
            </div>
          </div>
        </BaseView>
      )
    } else {
      return(
        <BaseView>
          <div className="container-fluid content-wrapper">
            <h1>Almost done!</h1>
            <p>We have sent you a message at the email provided. Please check your inbox to continue. See you there!</p>
          </div>
        </BaseView>
      )
    }
  }
};

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(SignIn);
