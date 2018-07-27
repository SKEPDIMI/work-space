import React, {Component} from 'react';
import $ from 'jquery';
import config from '../config';

import axios from 'axios';
import { connect } from 'react-redux';

import Header from '../components/global/Header.js';
import Footer from '../components/global/Footer.js';
import Sidemenu from '../components/global/Sidemenu.js';

class SignIn extends Component {
  componentWillReceiveProps(nextProps){
    let { user } = nextProps;
    if (user) {
      console.log('user is ' + user)
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

    axios.post(config.apiURL+'/api/users', formData)
      .then(response=>{
        this.displaySuccess('Almost done...');

        let { userId } = response.data;

        axios.post(config.apiURL+'/api/verifyEmail', { userId })
        .then((response) => {
          this.setState({
            done: true
          })
        })
        .catch((err) => {
          this.displayError(err.response.data.message)
        })
      })
      .catch(error=>{
        this.displayError(error.response.data.message || 'Failed to log in!');
      })

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
        <div>
          <Header/>
          <Sidemenu/>
          <div className="container wrapper">
            <div className="row">
              <div className="col">
                <h1>Welcome to WorkSpace!</h1>
                <hr/>
                <span className="form-modal">Logged in!</span>
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
          <Footer/>
        </div>
      )
    } else {
      return(
        <div>
          <Header/>
          <Sidemenu/>
          <div className="container-fluid content">
            <h1>Almost done!</h1>
            <p>We have sent you a message at the email provided. Please check your inbox to continue. See you there!</p>
          </div>
          <Footer/>
        </div>
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
