import React, {Component} from 'react';
import config from '../config';
import axios from 'axios';
import Header from '../components/Header.js';
import store from '../redux/store';
import Footer from '../components/Footer.js';
import Sidemenu from '../components/Sidemenu.js';

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = { formSuccess: false, formError: "" };
    this.formSubmit = this.formSubmit.bind(this);
  }
  componentWillMount(){
    // this is checking whether a user is signed in

    if (typeof store.getState().user === "object") {
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

    this.setState({ formSuccess: error.response.data.message || 'Logging in...', formError: false })

    axios.post(config.apiURL+'/api/auth', data)
      .then(response=>{
        localStorage.setItem('workspaceToken', JSON.stringify({token:response.data.token}));
        window.location = '/'; // maybe this should be setting the global state as well so that redirecting doesn't go into a loop
      })
      .catch(error=>{
        this.setState({ formError: error.response.data.message || 'Failed to log in!' })
      })
  }

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
              {this.state.formError ? <span className="form-modal error">{this.state.formError}</span> : ""}
              {this.state.formSuccess ? <span className="form-modal success">{this.state.formSuccess}</span> : ""}
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
