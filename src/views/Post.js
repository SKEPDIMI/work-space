import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/stylesheets/post.css';

import TimeAgo from 'react-timeago';
import LoadingScreen from '../views/util/LoadingScreen';

import Axios from 'axios';
import config from '../config';
import BaseView from '../components/util/BaseView';

class Post extends Component {
  likeToggle() {
    let { user } = this.props;
    let { post } = this.state;
    let postId = this.props.match.params.id;

    if (this.state.likeClass === 'like pending') return

    this.setState({likeClass: 'like pending'});

    const failure = () => {
      this.setState({
        likeClass: 'like'
      })
    };

    if (!this.state.post.likes.includes(user._id)) {
      Axios.put(config.apiURL + '/api/posts', {
        postId,
        like: true
      }, {
        headers: {
          token: user.token
        }
      })
      .then(response => {
        let likes = post.likes

        this.setState({
          likeClass: 'like active',
          post: {
            ...this.state.post,
            likes: [...likes, user._id]
          }
        })
      })
      .catch((error) => {
        failure()
      });
    } else {
      Axios.put(config.apiURL + '/api/posts', {
        postId,
        unlike: true
      }, {
        headers: {
          token: user.token
        }
      })
      .then(response => {
        let likes = post.likes

        this.setState({
          likeClass: 'like',
          post: {
            ...this.state.post,
            likes: likes.filter(v => v !== user._id)
          }
        })
      })
      .catch(() => {
        failure()
      });
    }
  }
  componentDidMount() {
    let postId = this.props.match.params.id;

    Axios.get(config.apiURL + '/api/posts?postId=' + postId, {
      headers: {
        population: JSON.stringify({
          space: 'title',
          author: 'username'
        })
      }
    })
    .then( response => {
      let post = response.data;

      this.setState({
        post,
        likeClass: post.likes.includes(this.props.user._id) ? 'like active' : 'like'
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
      post: 'pending',
      likeClass: 'like pending'
    };
  };
  render(){
    let { post } = this.state;

    if (post === 'pending') return (
      <LoadingScreen />
    )
    if (post === false) return (
      <div>
        <BaseView>
        <div className="content-wrapper">
          <a href={this.props.match.spaceId ? '/spaces/' + this.props.match.spaceId : '/landing' /* if the post fails to load */} className="rounded btn-link">
            <i className="fa fa-chevron-left" /> Back
          </a>
          <h1>Sorry! This post could not be loaded!</h1>
        </div>
        </BaseView>
      </div>
    )
    return(
      <BaseView>
        <div className="content-wrapper container-fluid">
          <a href={'/space?id=' + post.space._id} className="rounded btn-link"><i className="fa fa-chevron-left" /> Back to {post.space.title || null}</a>
          <div className="post">
            <div className="post_header">
              <h3>{post.title}</h3>
              <small className="text-muted">Posted <TimeAgo date={new Date(post.creationTime)} /> by <a href={'/user/' + post.author._id}>{post.author.username}</a></small>
            </div>
            <hr />
            <div className="post_body">
              {post.body}
            </div>
            <div className="post_footer">
              <i className={this.state.likeClass} onClick={this.likeToggle.bind(this)}>like</i>
            </div>
          </div>
        </div>
      </BaseView>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user
})
export default connect(mapStateToProps)(Post);
