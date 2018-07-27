import React, {Component} from 'react';
import $ from 'jquery';
import Axios from 'axios';
import config from '../config';

class UserMore extends Component {
  constructor(props){
    super(props);
    this.state = {};

    this.moreRef = React.createRef()
  };
  componentWillReceiveProps(nextProps) {
    let moreElement = $(this.moreRef.current);

    if (nextProps.active) {
      $('.more').removeClass('active').children().remove();
      $(moreElement).addClass('active').append('<h1>Loading</h1>');

      Axios.get(config.apiURL + '/api/posts?limit=5&userId='+ this.props.userId)
      .then(response => {
        let posts = response.data;

        $(moreElement).empty();

        posts.forEach(post => {
          $(moreElement).append('<h5><a href="post/' + post._id + '">' + post.title + '</a></h5>')
        })
      })
      .catch(err => {
        $(moreElement).empty();
        $(moreElement).append('<div class="d-flex w-100 justify-content-between"><h5 class="mb-1">This user appears to have no posts</h5><button class="btn btn-info">Follow</button></div>')
      })
    } else {
      $(moreElement).removeClass('active').children().remove()
    }
  }
  render(){
    return(
      <div className="more" ref={this.moreRef}>
      </div>
    );
  }
};

export default UserMore;
