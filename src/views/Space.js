import React, { Component } from 'react';
import Header from '../components/global/Header';
import Sidemenu from '../components/global/Sidemenu';
import Footer from '../components/global/Footer';
import Axios from '../../node_modules/axios';
import Spinner from './util/Spinner';
import PostItem from '../components/PostItem';
import config from '../config';
import '../assets/stylesheets/space.css';
import queryString from 'query-string';

class Space extends Component {
  constructor(props){
    super(props);
    this.state = { space: {}, posts: 'pending' };
  };
  async componentDidMount() {
    let values = queryString.parse(this.props.location.search);
    let id = values.id;

    if (!id) return window.location = '/popular/spaces';

    try {
      let response = await Axios.get(config.apiURL + '/api/spaces?id=' + id)
      this.setState({loading: false, space: response.data})
    } catch (error) {
      alert('Could not load space')
    }

    Axios.get(config.apiURL + '/api/posts?spaceId=' + id)
    .then(res => {
      this.setState({posts: res.data})
    })
    .catch(err => {
      this.setState({posts: false})
    })
  }
  render(){
    let { title, description, _id } = this.state.space;
    return (
      <div>
        <Header/>
        <Sidemenu/>
        <div className="space-main container-fluid">
          <div className="content container-fluid">
            {
              this.state.posts === 'pending' ? (
                <div>
                  <Spinner size={'medium'}/>
                </div>
              ) : this.state.posts.length === 0 ? (
                <p>This space has no posts</p>
              ) : this.state.posts.length > 0 ? (
                this.state.posts.map((post, i) => {
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
        <Footer/>
      </div>
    );
  }
};

export default Space;
