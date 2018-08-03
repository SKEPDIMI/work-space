import React, {Component} from 'react';

import SpaceCard from '../../components/SpaceCard';
import CouldNotLoad from '../../components/util/CouldNotLoad';
import { connect } from 'react-redux';
import { fetchPopularSpaces } from '../../redux/actions';
import LoadingScreen from '../util/LoadingScreen';
import BaseView from '../../components/util/BaseView';

class PopularSpaces extends Component {
  componentDidMount() {
    this.props.fetchPopularSpaces()
  }
  render(){
    return(
      <BaseView>
        <div className="content">
          <div className="d-flex w-100 justify-content-between align-items-center container-fluid">
            <h1>Popular Spaces</h1> <a href="/space/create">Create your own</a>
          </div>
          <div className="row-fluid">
            {this.props.spaces === 'pending' ? <LoadingScreen /> : Array.isArray(this.props.spaces) ? this.props.spaces.map((space, i) => {
              return (<SpaceCard key={i} space={space}/>)
            }) : <CouldNotLoad name="popular spaces" />}
          </div>
        </div>
      </BaseView>
    );
  }
};

const mapStateToProps = state => ({
  spaces: state.popularSpaces
});

export default connect(mapStateToProps, {fetchPopularSpaces})(PopularSpaces);
