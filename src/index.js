import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

import './index.css';
import './assets/stylesheets/global.css';

import Landing from './views/Landing';
import Teams from './views/Teams';
import SignIn from './forms/SignIn';

import config from './config';

ReactDOM.render((
  <div className="wrapper">
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
  </div>
  ), document.getElementById('root'));