import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Routes from './components/Routes';
import Loading from './views/Loading';

import config from './config';
import store from './redux/store.js';
import addUser from './redux/actions';


class App extends Component {
  componentDidMount(){
    if (localStorage.getItem('workspaceData')) {// IF THE USER HAS A TOKEN, VERIFY IT AND GET THE USER DATA FROM API
      let workspaceData = JSON.parse(localStorage.getItem('workspaceData'));
      axios.get(config.apiURL + '/api/auth', {
        headers: {
          'token': workspaceData.token,
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(response=>{
        this.setState({done:true})
        store.dispatch(addUser(response.data));
      })
      .catch(error=>{
        this.setState({done:true})
        store.dispatch(addUser({}));
      });
    } else {
      this.setState({done:true});
      store.dispatch(addUser(undefined))
    }
  }
  constructor(props){
    super(props);
    this.state = {done:false};
  };
render(){
return(
this.state.done ? <Routes/> : <Loading/>
);
}
};

export default App;