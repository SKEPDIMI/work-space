import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showError } from '../redux/actions';
import '../assets/stylesheets/space.css';

import BaseView from '../components/util/BaseView';
import Spinner from '../components/util/Spinner';
import PostItem from '../components/PostItem';
import LoadingScreen from './util/LoadingScreen';
import CouldNotLoad from '../components/util/CouldNotLoad';

import api from '../api';
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

    await api.get('/spaces', {
      id
    })
    .then(response => {
      if (response.ok) {
        this.setState({
          space: response.data
        })
      } else {
        this.props.showError(response.data.message || 'Failed to load space.');

        this.setState({
          space: false
        });
      }
    });

    api.get('/posts', {
      spaceId: id
    }, {
      headers: {
        population: JSON.stringify({
          author: 'username',
          space: 'title'
        })
      }
    })
    .then(response => {
      if (response.ok) {
        this.setState({
          posts: response.data
        })
      } else {
        this.props.showError(response.data.message || 'Failed to load posts.');

        this.setState({
          posts: false
        });
      }
    });
  }
  render(){
    let { space, posts } = this.state;

    if (space === 'pending') {
      return <LoadingScreen />
    }
    if (!space) return (
      <CouldNotLoad name="this space" />
    )
    let { title, description, _id } = space;

    return (
      <div>
        <BaseView>
          <div className="space-main content-wrapper container-fluid">
            <div className="content">
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
            <div className="aside">
              <h2>{title}</h2>
              <hr />
              <p>{description}</p>
              <a className="btn btn-info" href={"submit/" + _id}>Create post</a>

            </div>
          </div>
        </BaseView>
      </div>
    );
  }
};

export default connect(
  null,
  { showError }
)(Space);
