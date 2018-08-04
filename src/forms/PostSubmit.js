import React, { Component } from 'react';
import BaseView from '../components/util/BaseView';
import { connect } from 'react-redux';
import config from '../config';
import Axios from 'axios';
import $ from 'jquery';

class PostSubmit extends Component {
  componentDidMount() {
    if (!this.props.match.params.id)  {
      window.location = '/'
    }
  }
  displayError(error) {
    $(".form-modal").removeClass('success').addClass('failure').text(error);
  }
  displaySuccess(message) {
    $(".form-modal").removeClass('failure').addClass('success').text(message);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.displaySuccess('Creating post...');

    let formData = new FormData(event.target);

    formData.append('spaceId', this.props.match.params.id);

    Axios.post(config.apiURL + '/api/posts', formData, {
      headers: {
        token: this.props.user.token
      }
    })
    .then( response => {
      this.displaySuccess(response.data.message);
      window.location = '/post/' + response.data.postId
    })
    .catch( error => {
      if (!error.response.data) error.response.data.message = 'Failed to log in!'
      this.displayError(error.response.data.message);
    });
  }
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayError = this.displayError.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
  };
  render(){
    if (!this.props.user) {
      window.location = '/login?redirect=submit/' + this.props.match.params.id;
      return null
    }
    return(
      <BaseView>
        <div className="container-wrapper">
          <h1>New Post</h1>
          <hr/>
          <span className="form-modal"></span>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input className="form-control" name="title" placeholder="Title"/>
            </div>
            <div className="form-group">
              <label>Text</label>
              <textarea className="form-control" name="body" placeholder="Text" required/>
            </div>
            <button className="btn btn-info" type="submit">Submit</button>
          </form>
        </div>
      </BaseView>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(PostSubmit);
