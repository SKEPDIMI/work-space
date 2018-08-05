import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeError } from '../../redux/actions';

class GlobalError extends Component {
  componentDidUpdate() {
    let { errorMessages } = this.props;
    let { message, active } = this.state;

    if (!active && errorMessages.length > 0 && message !== errorMessages[0]) {
      this.onDisplay();
    }
  }
  onDisplay() {
    let { errorMessages } = this.props;
    let message = errorMessages[0];

    this.setState({
      active: true,
      message,
      class: 'global-error active'
    });
    
    // Give user time to read message
    let timeToRead = 3000 - (errorMessages.length * 90); // More errors means less time to read through them

    setTimeout(() => {
      this.props.removeError(message);
      this.offDisplay()
    }, timeToRead)
  }
  offDisplay() {
    // Set class to default
    this.setState({
      class: 'global-error'
    });

    // And wait for animation to finish
    setTimeout(() => {
      this.setState({
        message: '',
        active: false
      })
      if (this.props.errorMessages.length > 0) { // If there is another message in que, show it
        this.onDisplay()
      }
    }, 1000)
  }
  constructor(props){
    super(props);
    this.state = {
      active: false,
      class: 'global-error',
      message: ''
    };
    this.onDisplay = this.onDisplay.bind(this);
    this.offDisplay = this.offDisplay.bind(this);
  };
  render(){
    return(
      <div className={this.state.class}>
        {this.state.message}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  errorMessages: state.errorMessages
});

export default connect(
  mapStateToProps,
  { removeError }
)(GlobalError);