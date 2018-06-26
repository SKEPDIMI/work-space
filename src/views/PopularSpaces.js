import React, {Component} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidemenu from '../components/Sidemenu';
import SpaceCard from '../components/SpaceCard';
import { connect } from 'react-redux';
import { setPopularSpaces } from '../redux/actions';
import Loading from './Loading';

class PopularSpaces extends Component {
  componentWillMount() {
    this.props.setPopularSpaces()
  }
  render(){
    return(
      <div>
      <Header/><Sidemenu/>

      <div className="content">
        <div className="row-fluid">
          {this.props.spaces ? this.props.spaces.map((space, i) => {
            return (<SpaceCard key={i} space={space}/>)
          }) : <Loading />}
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