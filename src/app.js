import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';

import Routes from './components/util/Routes';

import config from './config';
import { fetchUser, setUser } from './redux/actions';

var store = createStore(reducers, {}, applyMiddleware(reduxThunk));

class App extends Component {
  async componentDidMount() {
    const WSdata = JSON.parse(
      localStorage.getItem('workspaceToken') || "false"
    );
    if ( WSdata ) {
      store.dispatch(await fetchUser());
    } else {
      this.setState({ done:true });
      store.dispatch(setUser(false));
    }
  }
  constructor(props){
    super(props);
  };
  render(){
    return(
      <Provider store={store}>
        <Routes/>
      </Provider>
    );
  }
};

export default App;
