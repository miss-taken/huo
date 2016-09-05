import React from 'react';
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
        Home
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

export default App;
