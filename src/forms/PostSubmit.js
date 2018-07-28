import React, { Component } from 'react';
import Header from '../components/global/Header';
import Sidemenu from '../components/global/Sidemenu';
import Footer from '../components/global/Footer';
import { connect } from 'react-redux';
import config from '../config';
import Axios from 'axios';
import $ from 'jquery';

class PostSubmit extends Component {
  componentDidMount() {
    if (!this.props.match.params.id) window.location = ''
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.match.params.id) {
      return window.location = '/'
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
    formData.append('token', this.props.user.token);

    Axios.post(config.apiURL + '/api/posts', formData)
    .then(response => {
      window.location = '/post/' + response.data.postId
    })
    .catch(err => {
      this.displayError('Could not create post!')
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
      <div>
        <Header />
        <Sidemenu />
        <div>
          <div className="container-fluid content">
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
                <textarea className="form-control" name="body" placeholder="Text">
                </textarea>
              </div>
              <button className="btn btn-info" type="submit">Submit</button>
            </form>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(PostSubmit);
