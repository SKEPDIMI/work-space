import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Landing from '../../views/Landing';
import PopularSpaces from '../../views/popular/PopularSpaces';
import LogIn from '../../forms/LogIn';
import SignUp from '../../forms/SignUp';
import Me from '../../views/Me';
import LogOut from '../../views/util/LogOut';
import PopularUsers from '../../views/popular/PopularUsers';
import Space from '../../views/Space';
import About from '../../views/About';
import PostSubmit from '../../forms/PostSubmit';
import VerifyEmail from '../../views/VerifyEmail';

class Routes extends Component {
render(){
return(
  <BrowserRouter>
  <Switch>
    <Route exact path="/" render={() => (
      <Redirect to="/landing"/>
    )}/>
    <Route path="/about" component={About}/>
    <Route path="/landing" component={Landing}/>
    <Route path="/popular/spaces" component={PopularSpaces}/>
    <Route path="/popular/users" component={PopularUsers}/>
    <Route path="/login" component={LogIn}/>
      <Route path="/login" render={() => {
          if (this.props.user && this.props.user !== 'pending') {
            return <Redirect to="/landing" />
          } else {
            return <LogIn />
          }
      }}/>
    <Route path="/signup" render={() => {
        if (this.props.user && this.props.user !== 'pending') {
          return <Redirect to="/landing" />
        } else {
          return <SignUp />
        }
    }}/>
    <Route path="/logout" component={LogOut}/>
    <Route path="/me" component={Me} />
    <Route path="/space" component={Space} />
    <Route path="/verifyemail/:id" component={VerifyEmail} />
    <Route path="/submit/:id" component={PostSubmit} />
    <Route path="/post/:id" component={null} />

    {/*404*/}
    <Route component={null} />
  </Switch>
  </BrowserRouter>
);
}
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Routes);
