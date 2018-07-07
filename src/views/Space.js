import React, {Component} from 'react';
import Header from '../components/Header';
import Sidemenu from '../components/Sidemenu';
import Footer from '../components/Footer';
import Axios from '../../node_modules/axios';
import config from '../config';
import Loading from './Loading';

class Space extends Component {
  constructor(props){
    super(props);
    this.state = {space: {}, loading: true};
  };
  componentDidMount() {
    let id = this.props.location.search.replace('?id=', '');

    if (!id) return window.location = '/popular/spaces'
    Axios.get(config.apiURL + '/api/spaces?id='+id)
    .then(res => {
      this.setState({loading: false, space: res.data})
    })
    .catch(err => {
      this.setState({loading: false})
      alert('Could not load space')
    })
  }
  render(){
    let {title, description} = this.state.space;
    return this.state.loading ? <Loading /> :
    (
      <div>
        <Header/>
        <Sidemenu/>
        <div className="container-fluid content">
          <h1>{title}</h1>
          <hr />
          <p>{description}</p>
        </div>
        <Footer/>
      </div>
    );
  }
};

export default Space;