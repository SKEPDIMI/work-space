import React, {Component} from 'react';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

class SignIn extends Component {
render(){
return(
<div>
<Header/>
<div className="container">
  <div className="row"> 
    <div className="col">
      <h1>Welcome back!</h1>
      <hr/> 
    </div>

    <div className="col">
      <form method="get" action="/api/users">
      <div className="form-control">
      <label>Username</label>
      <input placeholder="Username"/>
      </div>
      <div className="form-control">
      <label>Email</label>
      <input placeholder="Email"/>
      </div>
      <div className="form-control">
      <label>Password</label>
      <input placeholder="Password"/>
      </div>

      <button type="submit" className="btn btn-info"/>
      </form>
    </div>
  </div>
</div>
<Footer/>
</div>
);
}
};

export default SignIn;