import React from 'react';
import './style/antd-mobile.min';
// import Home from './views/Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
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
