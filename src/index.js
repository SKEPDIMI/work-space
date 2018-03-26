import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import Landing from './views/Landing';
import Teams from './views/Teams';

ReactDOM.render((
  <BrowserRouter>
  <Switch>
    <Route exact path="/" render={() => (
      <Redirect to="/landing"/>
    )}/>
    <Route exact path="/landing" component={Landing}/>
    <Route exact path="/teams" component={Teams}/>
  </Switch>
  </BrowserRouter>
  ), document.getElementById('root'));
registerServiceWorker();
