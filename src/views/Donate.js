import React, { Component } from 'react';
import BaseView from '../components/util/BaseView';
import queryString from 'query-string';

class Donate extends Component {
  state = {
    thank: false
  }
  componentWillMount() {
    let values = queryString.parse(this.props.location.search);
    let thank = values.t === "1" ? true : false;

    this.setState({
      thank
    })
  }
  render(){
    return(
      <BaseView>
        <h1>Donate</h1>
        <hr/>
        {this.state.thank ? <p className="text-success">Thank you for donating :)</p> : null}
        <div className="container-fluid">
          <p>Help me keep this site up by donating to my PayPal</p>
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
            <input type="hidden" name="cmd" value="_s-xclick"/>
            <input type="hidden" name="hosted_button_id" value="T7QL679C9KFYY"/>
            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
          </form>
        </div>
      </BaseView>
    );
  }
};

export default Donate;