import React,{Component} from 'react';
import { connect } from 'react-redux';
import { showError } from '../redux/actions';

import LoadingScreen from '../views/util/LoadingScreen';

import $ from 'jquery';
import api from '../api';

import '../assets/stylesheets/account.css';
import BaseView from '../components/util/BaseView';

class Me extends Component {
  onEnabled() {
    $("form button.btn-info").prop("disabled",false);
  }
  formSubmit(event) {
    event.preventDefault();

    if (event.target.elements.namedItem("avatar").files[0]) {
      if (event.target.elements.namedItem("avatar").files[0].size > 250 * 1024) return $(".form-modal").addClass("failure").text("Image is too large")
    }

    $(".form-modal").removeClass('failure').addClass("success").text("Saving changes...")

    var formData = new FormData(event.target);
    formData.append('id', this.props.user._id);

    api.put('/users', formData, {
      headers: {
        authorization: this.props.user.token
      }
    })
    .then(response => {
      if (response.ok) {
        $(".form-modal").removeClass('failure').addClass('success').text('Changes have been saved.');
        $("form button.btn-info").prop("disabled", true);
        setTimeout(function(){
          window.location.reload();
        }, 500)
      } else {
        this.props.showError(response.data.message);
        $(".form-modal").removeClass('success').addClass('failure').text(response.data.message || 'Failed to save changes.');
      }
    });
  }
  constructor(props){
    super(props);

    this.formSubmit = this.formSubmit.bind(this);
    this.onEnabled = this.onEnabled.bind(this);
  };
  render(){
    let { user } = this.props;

    if (!user.authenticated) {
      return(
        <div>
          <BaseView>
            <div className="content-wrapper">
                <h1>Looks like you're not logged in yet</h1>
                <p>Try <a href="/login">logging in</a> or going <a href="/">back home</a>.</p>
            </div>
          </BaseView>
        </div>
      )
    } else if (user.loading) {
      return <LoadingScreen />
    } else {
      return(
        <BaseView>
          <div className="account-dashboard">
            <header>
              <img src={api.getBaseURL() + "/user/image?id=" + user._id} className="avatar" alt="avatar"/>
              <div>
                <p>{user.username}</p>
                {user.verified ? null : <p className="text-muted">Unverified</p>}
              </div>
            </header>
            <form onSubmit={this.formSubmit} onChange={this.onEnabled} className="container" encType="multipart/form-data">
              <p className="form-modal"></p>
              <div className="form-group">
                <label>Email</label>
                <input name="email" className="form-control is-disabled" type="email" value={user.email} readOnly/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input name="password" className="form-control" type="password" autoComplete="off" required/>
              </div>
              <hr/>
              <div className="form-group">
                <label>Username: {user.username}</label>
                <input name="newUsername" className="form-control" autoComplete="off" placeholder={user.username}/>
              </div>
              <div className="form-group">
              </div>
              <label>Profile picture</label>
                <input name="avatar" className="form-control" type="file" accept="image/*"/>
              <div className="form-group">
                <label>Bio</label>
                <textarea name="bio" className="form-control" placeholder={user.bio}></textarea>
              </div>
              <button className="btn btn-info" type="submit" disabled>Update</button>
            </form>
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

export default connect(
  mapStateToProps,
  { showError }
)(Me);
