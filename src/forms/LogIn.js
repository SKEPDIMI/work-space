import React, {Component} from 'react';
import $ from 'jquery';
import config from '../config';

import axios from 'axios';
import { connect } from 'react-redux';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Sidemenu from '../components/Sidemenu.js';

class SignIn extends Component {
  componentWillMount(){
    if (this.props.user) {
      window.location = '/'
    }
  }
  formSubmit(event){
    event.preventDefault()
    let formData = new FormData(event.target);
    $(".form-modal").addClass("success").text("Logging in...")

    axios.post(config.apiURL+'/api/auth', formData)
      .then(response=>{
        localStorage.setItem('workspaceToken', JSON.stringify({token:response.data.token}));
        window.location = '/';
      })
      .catch(error=>{
        $(".form-modal").addClass('failure').text(error.response.data.message || 'Failed to log in!');
      })

  }
  constructor(props){
    super(props);
    this.state = {};
    this.formSubmit = this.formSubmit.bind(this);
  };
  render(){
    return(
      <div>
      <Header/>
      <Sidemenu/>
      <div className="container wrapper">
        <div className="row">
          <div className="col">
            <h1>Welcome back!</h1>
            <hr/>
            <span className="form-modal">Logged in!</span>
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
      <Footer/>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(SignIn);
