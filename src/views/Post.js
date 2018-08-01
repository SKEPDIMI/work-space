import React, { Component } from 'react';
import '../assets/stylesheets/post.css';

import TimeAgo from 'react-timeago';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import Sidemenu from '../components/global/Sidemenu';
import LoadingScreen from '../views/util/LoadingScreen';

import Axios from 'axios';
import config from '../config';

class Post extends Component {
  componentDidMount() {
    let postId = this.props.match.params.id;

    Axios.get(config.apiURL + '/api/posts?postId=' + postId)
    .then( response => {
      console.log(response.data)
      this.setState({
        post: response.data
      })
    })
    .catch( error => {
      this.setState({
        post: false
      })
    })
  }
  constructor(props){
    super(props);

    this.state = {
      space: 'pending',
      post: 'pending'
    };
  };
  render(){
    let { post } = this.state;

    if (post === 'pending') return (
      <LoadingScreen />
    )
    if (post === false) return (
      <div>
        <Header />
        <Sidemenu />
        <div className="container content">
          <a href={this.props.match.spaceId ? '/spaces/' + this.props.match.spaceId : '/landing' /* if the post fails to load */} className="rounded btn-link">
            <i className="fa fa-chevron-left" /> Back
          </a>
          <h1>Sorry! This post could not be loaded!</h1>
        </div>
        <Footer />
      </div>
    )
    return(
      <div>
        <Header />
        <Sidemenu />
        <div className="container content">
          <a href={'/space?id=' + post.space._id} className="rounded btn-link"><i className="fa fa-chevron-left" /> Back</a>

          <div className="post">
            <div className="container-fluid">
              <h3>{post.title}</h3>
              <small className="text-muted">Posted <TimeAgo date={new Date(post.creationTime)} /> by <a href={'/user/' + post.author._id}>{post.author.username}</a></small>
            </div>
            <hr />
            <div className="container">
              {post.body}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Post;
