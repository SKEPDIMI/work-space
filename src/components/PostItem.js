import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

class PostItem extends Component {
  render(){
    let { _id, title, body, author, creationTime, space } = this.props.data;

    return(
      <a href={"/post/" + _id} className="list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{title}</h5>
          <small>Created <TimeAgo date={new Date(creationTime)} /> by <a href={'/users/' + author._id}>{author.username}</a></small>
        </div>
        <p class="mb-1">{body.length > 75 ? body.substring(0, 75) + '...' : body}</p>
        <small>created in <a href={'space/' + space._id}>{space.title}</a></small>
      </a>
    );
  }
};

export default PostItem;
