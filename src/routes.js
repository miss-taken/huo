import React from 'react';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import App from './App';
import Login from './views/Login';
import Register from './views/Register';
import Person from './views/Person';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Login}/>
          <Route path="login" component={Login}/>
          <Route path="register" component={Register}/>
          <Route path="person" component={Person}/>
        </Route>
      </Router>
    );
  }
}

export default Routes;
