import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';

import Landing from './views/Landing';
import Teams from './views/Teams';

ReactDOM.render((
  <HashRouter>
  <Switch>
    <Route exact path="/" render={() => (
      <Redirect to="/landing"/>
    )}/>
    <Route exact path="/landing" component={Landing}/>
    <Route exact path="/teams" component={Teams}/>
  </Switch>
  </HashRouter>
  ), document.getElementById('root'));
registerServiceWorker();
