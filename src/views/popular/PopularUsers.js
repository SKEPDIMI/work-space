import React, { Component } from 'react';
import LoadingScreen from '../../views/util/LoadingScreen';
import UserListItem from '../../components/UserListItem';
import CouldNotLoad from '../../components/util/CouldNotLoad'

import api from '../../api';

import '../../assets/stylesheets/users.css';
import BaseView from '../../components/util/BaseView';

class PopularUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      users: []
    };
  };
  componentDidMount() {
    api.get('/users?limit=10')
    .then(response => {
      if (response.ok) {
        this.setState({
          loading: false,
          users: response.data
        });
      } else {
        this.setState({
          loading: false,
          users: false
        });
      }
    });
  }
  render(){
    return(
      this.state.loading === true ? <LoadingScreen /> :
      (
        this.state.users ? (
          <BaseView>
            <div className="content-wrapper">
              <h1>Popular Users</h1>
              <hr />
              <p className="subtitle">{this.state.display}</p>
              <ul className="list-group">
                {this.state.users.map((user, i) => {
                  return (
                    <UserListItem key={i} user={user}/>
                  )
                })}
              </ul>
            </div>
            <aside>

            </aside>
          </BaseView>) : (<CouldNotLoad name="popular users" />)
      )
    );
  }
};

export default PopularUsers;
