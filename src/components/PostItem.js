import React, { Component } from 'react';

class PostItem extends Component {
  render(){
    let { _id, title, body, author } = this.props.data;

    return(
      <div>
        <h4><a href={"/post/" + _id}>{title}</a></h4>
        <hr/>
        <small>{author.username}</small>
        <p>{body.length > 75 ? body.substring(0, 75) : body}</p>
      </div>
    );
  }
};

export default PostItem;
