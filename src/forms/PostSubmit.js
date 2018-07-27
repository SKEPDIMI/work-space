import React, { Component } from 'react';
import Header from '../components/global/Header';
import Sidemenu from '../components/global/Sidemenu';

class PostSubmit extends Component {
  render(){
    return(
      <div>
        <Header />
        <Sidemenu />

        <div>
          <form>
            <h1>Create a post</h1>
          </form>
        </div>
        <Footer/>
      </div>
    );
  }
};

export default PostSubmit;