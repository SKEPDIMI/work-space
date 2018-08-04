import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import config from '../config';

class Comment extends Component {
  render(){
    let { user, creationTime, body } = this.props.data;

    return(
      <div className="list-group-item comment">
        <div className="d-flex w-100 justify-content-start align-items-center">
          <img src={config.apiURL + '/api/user/image?id=' + user._id} className="avatar small"/>
          <h5><a href={'/user/' + user._id}>{user.username}</a></h5>
          <small className="pull-right"><TimeAgo date={new Date(creationTime)} /></small>
        </div>
        <p className="mb-1">{body}</p>
      </div>
    );
  }
};

export default Comment;
