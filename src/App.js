import React from 'react';
// import './style/antd-mobile';
import './style/app';
// import Home from './views/Home';
import url from './utils/url';
import request from 'superagent-bluebird-promise';

class App extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
        {this.props.children || 'Home' }
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

export default App;
