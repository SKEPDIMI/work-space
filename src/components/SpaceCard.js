import React, {Component} from 'react';
import spaceDefault from '../assets/spaceDefault.jpg'

class SpaceCard extends Component {
  render(){
    return(
      <div className="list-group">
        <a href={"/space/" + this.props.space._id} className="list-group-item list-group-item-action d-flex align-items-start row">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{this.props.space.title} | {this.props.space.owner}</h5>
            <small>Subcribers: {this.props.space.users.length}</small>
          </div>
          <div className="d-flex w-100 justify-content-around align-items-center">
            <div className="col">
              <img src={spaceDefault} alt="logo" className="rounded-circle" style={{maxHeight: '10vh'}}/>
            </div>
            <p className="mb-1">{this.props.space.description}</p>
          </div>
        </a>
      </div>
    );
  }
};

export default SpaceCard;