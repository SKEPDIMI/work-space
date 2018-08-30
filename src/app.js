import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';

import Routes from './components/util/Routes';

import { fetchUser, setUser } from './redux/actions';

var store = createStore(reducers, {}, applyMiddleware(reduxThunk));

class App extends Component {
  componentDidMount() {
    const workspaceToken = JSON.parse( // Parse the JWT that is store in localStorage
      localStorage.getItem('workspaceToken') || "false"
    );

    if (workspaceToken) { // If there is a JWT in our local storage we want to call the fetchUser action creator, and dispatch whatever it returns to us (an action to set store.user to the usersdata, fetched from the API)
      store.dispatch(fetchUser())
    } else { // If there is no JWT in out local storage, just set the user to false for user components to know that the user is undefined and not pending
      this.setState({ done: true });
      store.dispatch(setUser(false));
    }
  }
  render(){
    return(
      <Provider store={store}>
        <Routes/>
      </Provider>
    );
  }
};

export default App;
