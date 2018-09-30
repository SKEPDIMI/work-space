import React, { Component } from 'react';
import BaseView from '../components/util/BaseView';
import { connect } from 'react-redux';
import api from '../api';
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

    // Use params instead!
    api.post(`/spaces/${this.props.match.params.id}/posts/`, formData, {
      headers: {
        authorization: this.props.user.token
      }
    })
    .then(response => {
      if (response.ok) {
        this.displaySuccess(response.data.message);
        window.location = '/post/' + response.data.postId
      } else {
        this.displayError(response.data.message);
      }
    });
  }
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayError = this.displayError.bind(this);
    this.displaySuccess = this.displaySuccess.bind(this);
  };
  render(){
    let { user } = this.props;
    
    if (!user.authenticated && !user.loading) {
      window.location = '/login?redirect=submit/' + this.props.match.params.id;
      return null
    }
    return(
      <BaseView>
        <div className="content-wrapper container-fluid">
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
              <textarea className="form-control" name="body" placeholder="Text" style={{minHeight: '50vh'}} required/>
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
