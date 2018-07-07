import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidemenu from '../components/Sidemenu';
import SpaceCard from '../components/SpaceCard';
import CouldNotLoad from '../components/CouldNotLoad';
import { connect } from 'react-redux';
import { setPopularSpaces } from '../redux/actions';
import Loading from './Loading';

class PopularSpaces extends Component {
  componentDidMount() {
    this.props.setPopularSpaces()
  }
  render(){
    return(
      <div>
      <Header/><Sidemenu/>

      <div className="content">
        <div className="d-flex w-100 justify-content-between align-items-center container-fluid">
          <h1>Popular Spaces</h1> <a href="/space/create">Create your own</a>
        </div>
        <div className="row-fluid">
          {this.props.spaces === 'pending' ? <Loading /> : this.props.spaces.length >= 1 ? this.props.spaces.map((space, i) => {
            return (<SpaceCard key={i} space={space}/>)
          }) : <CouldNotLoad name="popular spaces" />}
        </div>
      </div>

      <Footer/>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  spaces: state.popularSpaces
});

export default connect(mapStateToProps, {setPopularSpaces})(PopularSpaces);