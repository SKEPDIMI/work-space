import React,{Component} from 'react';
import Loading from './Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidemenu from '../components/Sidemenu';

import $ from 'jquery';
import axios from 'axios';
import config from '../config';

import '../assets/stylesheets/account.css';
import avatar from '../assets/avatar.png';

import store from '../redux/store';

class Me extends Component {
  onEnabled(){
    $("form button.btn-info").prop("disabled",false);
  }
  formSubmit(event){
    event.preventDefault();
    let form = event.target;
    let elements = form.elements;
    
    let data = {};
    for (let i = 0; i < elements.length; i++) {
      let currentElement = elements[i];
      if (currentElement.type != 'submit'){
        data[currentElement.name] = currentElement.value;
      }
    };

    $(".form-modal").addClass("success").text("Saving changes...")
    
    axios.put(config.apiURL+'/api/users', data)
    .then(response=>{
      $(".form-modal").addClass('failure').text('Changes have been saved.');
      $("form button.btn-info").prop("disabled",true);
    })
    .catch(error=>{
      $(".form-modal").addClass('failure').text(error.response.data.message || 'Failed to save changes!');
    });
  }
  constructor(props){
    super(props);
    this.state = {user:store.getState()};

    this.formSubmit = this.formSubmit.bind(this);
    this.onEnabled = this.onEnabled.bind(this);
  };
  componentWillMount(){
    store.subscribe(()=>{
      let user = store.getState();

      user ? this.setState({user}) : this.setState({user:undefined});
    });
  }
render(){
  {
    if (this.state.user === 'pending') {
      return(<Loading/>)
    } else if (this.state.user === undefined) {
      return(<div><Header/><Sidemenu/>
      <div className="wrapper">
          <h1>You are not logged in</h1>
          <a href="/">Back home</a>
      </div>
        <Footer/></div>)
    } else {
      return(
        <div>
        <Header/><Sidemenu/>
        <div className="account-dashboard">
          <header>
            <img src={avatar}/> <p>{this.state.user.username}</p>
          </header>
          <form onSubmit={this.formSubmit} onChange={this.onEnabled} className="container">
          <p className="form-modal"></p>
          <div className="form-group">
            <label>Email</label>
            <input name="email" className="form-control" type="email" value={this.state.user.email} required readonly/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" className="form-control" type="password" required/>
          </div>
          <hr/>
            <div className="form-group">
              <label>User name</label>
              <input name="newUsername" className="form-control" defaultValue={this.state.user.username}/>
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea name="bio" className="form-control" defaultValue={this.state.user.bio}></textarea>
            </div>

            <button className="btn btn-info" type="submit" disabled>Update</button>
          </form>
        </div>
        <Footer/>
        </div>
      )
    }
  }
}
};

export default Me;