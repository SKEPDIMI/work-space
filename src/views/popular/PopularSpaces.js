import React, {Component} from 'react';

import SpaceCard from '../../components/SpaceCard';
import CouldNotLoad from '../../components/util/CouldNotLoad';
import { connect } from 'react-redux';
import { fetchPopularSpaces, showError } from '../../redux/actions';
import LoadingScreen from '../util/LoadingScreen';
import BaseView from '../../components/util/BaseView';

class PopularSpaces extends Component {
  componentDidMount() {
    this.props.fetchPopularSpaces()
  }
  componentDidUpdate() {
    if (this.props.spaces.length === 0) {
      this.props.showError('Could not load popular spaces.')
    }
  }
  render(){
    let { spaces } = this.props;

    return(
      <BaseView>
        <div className="content-wrapper">
          <div className="d-flex w-100 justify-content-between align-items-center container-fluid">
            <h1>Popular Spaces</h1> <a href="/space/create">Create your own</a>
          </div>
          <div className="row-fluid">
            {spaces === 'pending' ? <LoadingScreen /> : Array.isArray(spaces) ? spaces.map((space, i) => {
              return (<SpaceCard key={i} data={space}/>)
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

export default connect(
  mapStateToProps, 
  {
    fetchPopularSpaces,
    showError
  }
)(PopularSpaces);
