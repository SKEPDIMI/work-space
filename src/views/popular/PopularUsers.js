import React, { Component } from 'react';
import config from '../../config';
import Header from '../../components/global/Header';
import Sidemenu from '../../components/global/Sidemenu';
import Footer from '../../components/global/Footer';
import LoadingScreen from '../../views/util/LoadingScreen';
import UserListItem from '../../components/UserListItem';
import CouldNotLoad from '../../components/util/CouldNotLoad'

import Axios from 'axios';
import '../../assets/stylesheets/users.css';

class PopularUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      users: []
    };
  };
  componentDidMount() {
    Axios.get(config.apiURL + '/api/users?limit=10')
    .then(res => {
      console.log(res.data)
      this.setState({loading: false, users: res.data})
    })
    .catch(err => {
      this.setState({
        loading: false,
        users: false
      });
    })

  }
  render(){
    return(
      this.state.loading === true ? <LoadingScreen /> :
      (
        this.state.users ? (
          <div>
            <Header/>
            <Sidemenu/>
            <div className="content container-fluid">
              <h1>Popular Users</h1>
              <hr />
              <p className="subtitle">{this.state.display}</p>
              <ul className="list-group">
                {this.state.users.map((user, i) => {
                  return (
                    <UserListItem key={i} user={user} />
                  )
                })}
              </ul>
            </div>
            <aside>

            </aside>
            <Footer/>
          </div>) : (<CouldNotLoad name="popular users" />)
      )
    );
  }
};

export default PopularUsers;
