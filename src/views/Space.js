import React, { Component } from 'react';
import '../assets/stylesheets/space.css';

import BaseView from '../components/util/BaseView';
import Spinner from '../components/util/Spinner';
import PostItem from '../components/PostItem';
import CouldNotLoad from '../components/util/CouldNotLoad';

import Axios from '../../node_modules/axios';
import config from '../config';
import queryString from 'query-string';

class Space extends Component {
  constructor(props){
    super(props);
    this.state = { space: 'pending', posts: 'pending' };
  };
  async componentDidMount() {
    let values = queryString.parse(this.props.location.search);
    let id = values.id;

    if (!id) return window.location = '/popular/spaces';

    Axios.get(config.apiURL + '/api/spaces?id=' + id)
    .then(response => {
      this.setState({
        space: response.data
      })
    })
    .catch(error => {
      this.setState({
        space: false
      })
    });

    Axios.get(config.apiURL + '/api/posts?spaceId=' + id, {
      headers: {
        population: JSON.stringify({
          author: 'username',
          space: 'title'
        })
      }
    })
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    .catch(err => {
      this.setState({
        posts: false
      })
    });
  }
  render(){
    let { space, posts } = this.state;

    if (!space) return (
      <CouldNotLoad name="this space" />
    )
    let { title, description, _id } = space;

    return (
      <div>
        <BaseView>
          <div className="space-main content-wrapper">
            <div className="content container-fluid">
              {
                posts === 'pending' || this.state.space === 'pending' ? (
                  <div>
                    <Spinner size={'medium'}/>
                  </div>
                ) : posts.length === 0 ? (
                  <p>This space has no posts</p>
                ) : this.state.posts.length > 0 ? (
                  posts.map((post, i) => {
                    return <PostItem key={i} data={post}/>
                  })
                ) : (
                  <p>Could not load posts</p>
                )
              }
            </div>
            <div className="content">
              <h1>{title}</h1>
              <hr />
              <p>{description}</p>
              <button className="btn info">
                <a href={"submit/" + _id}>Create post</a>
              </button>
            </div>
          </div>
        </BaseView>
      </div>
    );
  }
};

export default Space;
