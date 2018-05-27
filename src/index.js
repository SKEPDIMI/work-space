import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

import './index.css';

import Landing from './views/Landing';
import Teams from './views/Teams';
import SignIn from './forms/SignIn';

ReactDOM.render((
  <BrowserRouter>
  <Switch>
    <Route exact path="/" render={() => (
      <Redirect to="/landing"/>
    )}/>
    <Route exact path="/landing" component={Landing}/>
    <Route exact path="/teams" component={Teams}/>
    <Route exact path="/signin" component={SignIn}/>
  </Switch>
  </BrowserRouter>
  ), document.getElementById('root'));