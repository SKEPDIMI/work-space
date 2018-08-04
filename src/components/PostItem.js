import React from 'react';
import TimeAgo from 'react-timeago';

const PostItem = (props) => {
  let { _id, title, body, author, creationTime, likes } = props.data;

  return(
    <a href={"/post/" + _id} className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{title}</h5>
        <small>Created <TimeAgo date={new Date(creationTime)} /> by <a href={'/users/' + author._id}>{author.username}</a></small>
      </div>
      <p className="mb-1">{body.length > 75 ? body.substring(0, 75) + '...' : body}</p>
      <small>{likes.length} likes</small>
    </a>
  );
}

export default PostItem;
