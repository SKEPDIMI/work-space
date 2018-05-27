import React, { Component } from 'react';

class Footer extends Component {
render(){
return(
<footer className="page-footer font-small blue pt-4 mt-4">
<div className="container-fluid text-center text-md-left">
  <div className="row">
      <div class="col-md-6 mt-md-0 mt-3">
        <h5 class="text-uppercase">WorkSpace</h5>
        <p>A place to share ideas and materials</p>
      </div>

      <div class="col-md-6 mb-md-0 mb-3">

        <h5 class="text-uppercase"> </h5>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Home</a>
          </li>
          <li>
            <a href="#!">Account</a>
          </li>
          <li>
            <a href="#!">Open Source</a>
          </li>
        </ul>

      </div>
  </div>
</div>
<div class="footer-copyright text-center py-3">
© 2018 Copyright:
    <a href="/"> Workspace</a>
  </div>
</footer>
);
}
};

export default Footer;