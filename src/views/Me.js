import React,{Component} from 'react';
import Loading from './Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidemenu from '../components/Sidemenu';

import '../assets/stylesheets/account.css';
import {avatar} from '../assets/avatar.png';

import store from '../redux/store';

class Me extends Component {
  constructor(props){
    super(props);
    this.state = {user:store.getState()};
  };
  componentWillMount(){
    store.subscribe(()=>{
      let user = store.getState();

      user ? this.setState({user}) : this.setState({user:undefined});
    });
  }
render(){
  {
    if (this.state.user === 'pending') {
      return(<Loading/>)
    } else if (this.state.user === undefined) {
      return(<div><Header/><Sidemenu/>
          <h1>You are not logged in</h1>
          <a href="/">Back home</a>
        <Footer/></div>)
    } else {
      return(
        <div>
        <Header/><Sidemenu/>
        <div className="account-dashboard">
          <header>
            <img src={avatar}/>
          </header>
        </div>
        <Footer/>
        </div>
      )
    }
  }
}
};

export default Me;