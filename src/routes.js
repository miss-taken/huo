import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import App from './App';
import Login from './views/Login';
import Register from './views/Register';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Login}/>
          <Route path="login" component={Login}/>
          <Route path="register" component={Register}/>
        </Route>
      </Router>
    );
  }
}

export default Routes;
