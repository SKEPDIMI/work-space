import React, {Component} from 'react';
import $ from 'jquery';
import api from '../api';
import Spinner from './util/Spinner';
import TimeAgo from 'react-timeago';

class UserMore extends Component { // A div that opens up and shows more info about the user
  constructor(props){
    super(props);
    this.state = {
      posts: 'inactive'
    };

    this.moreRef = React.createRef()
  };
  componentWillReceiveProps(nextProps) {
    let moreElement = $(this.moreRef.current);

    if (nextProps.active) {
      $(moreElement).addClass('active'); // Open ours only

      this.setState({
        posts: 'pending'
      });

      api.get(`/users/${this.props.userId}/posts`, {
        limit: 5
      })
      .then(response => {
        if (response.ok) {
          this.setState({ posts: response.data})
        } else {
          this.setState({ posts: [] })
        }
      });
    } else {
      $(moreElement).removeClass('active');
      this.setState({
        posts: 'inactive'
      })
    }
  }
  render(){
    let { posts } = this.state;

    if (posts === 'inactive') {
      return (
        <div className="more" ref={this.moreRef} />
      )
    } else if (posts === 'pending') {
      return (
        <div className="more" ref={this.moreRef}>
          <Spinner size={'medium'} />
        </div>
      )
    } else if (posts.length > 0) {
      return(
        <div className="more" ref={this.moreRef}>
          <ul className="list-group list-group-flush">
            {
              posts.map((post, index) => {
                return (
                  <a key={index} href={'/post/' + post._id} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{post.title} | {post.space.title}</h5>
                      <small>{post.author_name}</small>
                    </div>
                    <p className="mb-1">{post.body}</p>
                    <small><TimeAgo date={new Date(post.creationTime)} />, {post.likes.length} likes.</small>
                  </a>
                )
              })
            }
          </ul>
        </div>
      )
    } else if (posts.length === 0) {
      return (
        <div className="more" ref={this.moreRef}>
          <h5>This user has no posts</h5>
        </div>
      )
    } else {
      return <h3>There was an error loading the user's posts</h3>
    }
  }
};

class UserListItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false
    };
  };
  render(){
    let { user } = this.props;

    return(
      <li className="user-item list-group-item" onMouseLeave={() => this.setState({expanded: false})}>
        <div className="head">
          <div className="img-container">
            <img className="avatar" src={api.getBaseURL() + '/user/image?id=' + user._id} alt="avatar"/>
          </div>
          <div className="creds flex justify-content-evenly flex-direction-column align-items-start">
            <h5 className="mb-1">{user.username}</h5>
            <p className="mb-1">{user.bio}</p>
          </div>
          <div className="stats">
            <button id="toggle-more" className="btn btn-dark toggle" onClick={() => this.setState({expanded: !this.state.expanded})}>Learn more</button>
            <div>
              <small>Posts: {user.posts.length}</small><small>Followers: {user.followers.length}</small><small>Following: {user.following.length}</small>
            </div>
          </div>
        </div>
        <UserMore active={this.state.expanded} userId={user._id}/>
      </li>
    );
  }
};

export default UserListItem;
