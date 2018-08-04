import React from 'react';
import Logo from '../../assets/logo.png';

const LoadingScreen = () => {
  return(
    <div className="loading-screen">
      <div className="inner-wrapper">
        <img src={Logo} alt="Loading.."/>
        <h1>Work Space</h1>
        <hr/>
        <span>Is Now Loading</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
