import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    );
  }
}

export default Routes;
