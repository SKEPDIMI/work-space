import React, {Component} from 'react';
import UserMore from './UserMore';
import $ from 'jquery';
import config from '../config';

class UserListItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false
    };
  };
  render(){
    let user = this.props.user;
    return(
      <li className="user-item list-group-item">
        <div className="head justify-content-start">
          <div className="img-container">
            <img className="avatar" src={config.apiURL + '/api/user/image?id=' + user._id} />
          </div>
          <div className="creds flex justify-content-evenly flex-direction-column align-items-start">
            <h5 className="mb-1">{user.username}</h5>
            <p className="mb-1">{user.bio}</p>
          </div>
          <div className="stats">
            <button id="toggle-more" className="btn btn-dark toggle" onClick={() => this.setState({expanded: !this.state.expanded})}>Learn more</button>
            <div>
              <small>Posts: {user.posts.length}</small><small>Followers: {user.followers.length}</small><small>Following: {user.following.length}</small>
            </div>
          </div>
        </div>
        <UserMore active={this.state.expanded} userId={user._id}/>
      </li>
    );
  }
};

export default UserListItem;
