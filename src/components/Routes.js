import React, {Component} from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

import Landing from '../views/Landing';
import Teams from '../views/Teams';
import SignIn from '../forms/SignIn';

class Routes extends Component {
render(){
return(
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
);
}
};

export default Routes;