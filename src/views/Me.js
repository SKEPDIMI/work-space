import React,{Component} from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidemenu from '../components/Sidemenu';

import $ from 'jquery';
import axios from 'axios';
import config from '../config';

import '../assets/stylesheets/account.css';
import avatar from '../assets/avatar.png';

class Me extends Component {
  onEnabled(){
    $("form button.btn-info").prop("disabled",false);
  }
  formSubmit(event){
    event.preventDefault();
    let form = event.target;

    $(".form-modal").addClass("success").text("Saving changes...")
    
      var formData = new FormData(form);
    
    axios(config.apiURL+'/api/users', { method:'put', body:formData, headers: {'content-type' : 'multipart/form-data'} })
    .then(response=>{
      $(".form-modal").addClass('success').text('Changes have been saved.');
      $("form button.btn-info").prop("disabled",true);
    })
    .catch(error=>{
      $(".form-modal").addClass('failure').text(error.response.data.message || 'Failed to save changes!');
    });
  }
  constructor(props){
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
    this.onEnabled = this.onEnabled.bind(this);
  };
render(){
    if (!this.props.user) {
      return(
      <div>
        <Header/><Sidemenu/>
        <div className="wrapper">
            <h1>You are not logged in</h1>
            <a href="/">Back home</a>
        </div>
        <Footer/>
      </div>
      )
    } else {
      return(
        <div>
        <Header/><Sidemenu/>
        <div className="account-dashboard">
          <header>
            <img src={avatar} alt="avatar"/><p>{this.props.user.username}</p>
          </header>
          <form onSubmit={this.formSubmit} onChange={this.onEnabled} className="container" encType="multipart/form-data">
          <p className="form-modal"></p>
          <div className="form-group">
            <label>Email</label>
            <input name="email" className="form-control" type="email" value={this.props.user.email} required readOnly/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" className="form-control" type="password" required/>
          </div>
          <hr/>
            <div className="form-group">
              <label>User name</label>
              <input name="newUsername" className="form-control" defaultValue={this.props.user.username}/>
            </div>
            <div className="form-group">

            </div>
            <label>Profile picture</label>
              <input name="image" id='form-avatar' className="form-control" type="file" accept="image/*"/>
            <div className="form-group">
              <label>Bio</label>
              <textarea name="bio" className="form-control" defaultValue={this.props.user.bio}></textarea>
            </div>

            <button className="btn btn-info" type="submit" disabled>Update</button>
          </form>
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

export default connect(mapStateToProps)(Me);