import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

class Login extends Component {
  render() {
    console.log('entry');
    return (
      <div>
        hello world
        <span><Icon type="lock"/></span>
        <Icon type="mobile"/>
      </div>
    );
  }
}

export default Login;
