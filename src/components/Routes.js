import React, {Component} from 'react';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

import Landing from '../views/Landing';
import PopularSpaces from '../views/PopularSpaces';
import LogIn from '../forms/LogIn';
import SignUp from '../forms/SignUp';
import Me from '../views/Me';
import LogOut from '../views/LogOut';

class Routes extends Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => ( <Redirect to="/landing"/> )}/>
          <Route path="/landing" component={Landing}/>
          <Route path="/popular/spaces" component={PopularSpaces}/>
          <Route path="/login" component={LogIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/logout" component={LogOut}/>
          <Route path="/me" component={Me} />
        </Switch>
      </BrowserRouter>
    );
  }
};

export default Routes;
