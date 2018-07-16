import React, {Component} from 'react';
import config from '../config';
import Header from '../components/Header';
import Sidemenu from '../components/Sidemenu';
import Footer from '../components/Footer';
import Loading from '../views/Loading';
import UserListItem from '../components/UserListItem';
import Axios from '../../node_modules/axios';
import '../assets/stylesheets/users.css';

class PopularUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      display: '',
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
      this.setState(err.response.data.message || 'Could not load popular users');
      this.setState({loading: false})
    })

  }
  render(){
    return(
      this.state.loading === true ? <Loading /> :
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
      </div>
    );
  }
};

export default PopularUsers;
