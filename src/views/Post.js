import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showError } from '../redux/actions';

import '../assets/stylesheets/post.css';

import TimeAgo from 'react-timeago';
import LoadingScreen from '../views/util/LoadingScreen';

import api from '../api';
import BaseView from '../components/util/BaseView';
import Comment from '../components/Comment';

class Post extends Component {
  likeToggle() {
    let { user } = this.props;
    let { post } = this.state;
    let postId = this.props.match.params.id;

    const failure = (message) => {
      this.props.showError(message);
    };

    if (!post.likes[user._id]) {
      api.post(`/posts/${postId}/like`, {}, {
        headers: {
          authorization: user.token
        }
      })
      .then(response => {
        if (response.ok) {
          let newLikes = post.likes;
          newLikes[user._id] = new Date();

          this.setState({
            post: {
              ...post,
              likes: newLikes
            }
          });
        } else {
          failure(response.data.message || 'Could not like post.')
        }
      });
    } else {
      api.delete(`/posts/${postId}/like`, {}, {
        headers: {
          authorization: user.token
        }
      })
      .then(response => {
        if (response.ok) {
          let newLikes = post.likes;
          delete newLikes[user._id];

          this.setState({
            post: {
              ...post,
              likes: newLikes
            }
          });
        } else {
          failure(response.data.message)
        }
      });
    }
  }
  componentDidMount() {
    let postId = this.props.match.params.id;

    api.get(`/posts/${postId}`)
    .then(response => {
      if (response.ok) {
        let post = response.data;
        this.setState({
          post
        });
      } else {
        this.props.showError(response.data.message || 'Could not load post');

        this.setState({
          post: false
        });
      }
    });
  }
  commentSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    api.post(`/posts/${this.state.post._id}/comment`, formData, {
      headers: {
        authorization: this.props.user.token
      }
    })
    .then(response => {
      if (response.ok) {
        window.location.reload();
      } else {
        this.props.showError(response.data.message || 'Failed to save comment');
      }
    });
  }
  constructor(props){
    super(props);

    this.state = {
      post: 'pending'
    };
  };
  render(){
    let { post } = this.state;
    let { user } = this.props;

    if (post === 'pending') return (
      <LoadingScreen />
    )
    if (post === false) return (
      <div>
        <BaseView>
          <div className="content-wrapper post_wrapper">
            <a href={this.props.match.spaceId ? '/spaces?id=' + this.props.match.spaceId : '/landing' /* if the post fails to load */} className="rounded btn-link">
              <i className="fa fa-chevron-left" /> Back
            </a>
            <h1>Sorry! This post could not be loaded!</h1>
          </div>
        </BaseView>
      </div>
    )
    return(
      <BaseView>
        <div className="content-wrapper container-fluid post_wrapper">
          <a href={'/space?id=' + post.space} className="rounded btn-link"><i className="fa fa-chevron-left" /> Back to {post.space.title || null}</a>
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
              <i className={
                post.likes[user._id] ?
                'like active' : 'like'
              } onClick={this.likeToggle.bind(this)}>like</i>
            </div>
          </div>
          <h4>{post.comments.length} comments on "{post.title}"</h4>
          <hr/>
          {post.comments.length > 0 ?
            (<div className="comments">
                {
                  post.comments.map((comment, i) => <Comment key={i} data={comment} />)
                }
              </div>)
            :
            <p>Be the first to comment!</p>}

            {user ? (
              <form onSubmit={this.commentSubmit.bind(this)} >
                <img src={api.getBaseURL() + '/user/image?id=' + user._id} className="avatar"/>
                <div className="input_wrapper">
                  <textarea name="content" placeholder="Enter a comment" minLength="1" maxLength="1520"/>
                </div>
                <button className="btn btn-info">Submit</button>
              </form>) : null}
        </div>
      </BaseView>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user
})
export default connect(
  mapStateToProps,
  { showError }
)(Post);
