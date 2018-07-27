import React, { Component } from 'react';

class PostItem extends Component {
  render(){
    return(
      <div>
        {this.props.data.title}
      </div>
    );
  }
};

export default PostItem;