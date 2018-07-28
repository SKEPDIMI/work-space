import React, { Component } from 'react';

class PostItem extends Component {
  render(){
    let { _id, title, body, author } = this.props.data;

    return(
      <div>
        <h4><a href={"/post/" + _id}>{title}</a></h4>
        <hr/>
        <p>{body.length > 100 ? body.substring(0, 100) : body}</p>
      </div>
    );
  }
};

export default PostItem;
