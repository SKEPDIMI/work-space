import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import axios from 'axios';

import Routes from './components/Routes';
import Loading from './views/Loading';

import config from './config';
import {setUser} from './redux/actions';

var store = createStore(reducers, {}, applyMiddleware(reduxThunk));

class App extends Component {
  componentDidMount(){
    if (localStorage.getItem('workspaceToken')) { // IF THE USER HAS A TOKEN, VERIFY IT AND GET THE USER DATA FROM API
      let workspaceData = JSON.parse(localStorage.getItem('workspaceToken'));
      axios.get(config.apiURL + '/api/auth?token=' + workspaceData.token)
        .then(response=>{
          this.setState({done:true});
          store.dispatch(setUser(response.data));
        })
        .catch(error=>{
          this.setState({done:true})
          store.dispatch(setUser(false));
        });
    } else {
      this.setState({done:true});
      store.dispatch(setUser(false));
    }
  }
  constructor(props){
    super(props);
    this.state = {done:false};
  };
  render(){
    return(
      this.state.done ? <Provider store={store}><Routes/></Provider> : <Loading/>
    );
  }
};

export default App;
