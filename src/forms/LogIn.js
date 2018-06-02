import React, {Component} from 'react';
import $ from 'jquery';
import config from '../config';

import axios from 'axios';
import store from '../redux/store';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Sidemenu from '../components/Sidemenu.js';

class SignIn extends Component {
  componentWillMount(){
    if (store.getState() != undefined) {
      window.location = '/'
    }
  }
  formSubmit(event){
    event.preventDefault()
    let form = event.target;
    let elements = form.elements;

    let data = {};
    for (let i = 0; i < elements.length; i++) {
      let currentElement = elements[i];
      if (currentElement.type != 'submit'){
        data[currentElement.name] = currentElement.value;
      }
    };

    $(".form-modal").addClass("success").text("Loggin in...")

    axios.post(config.apiURL+'/api/auth', data)
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
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
};

export default SignIn;
