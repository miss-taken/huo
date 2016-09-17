import React from 'react';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import App from './App';
import Login from './views/Login';
import Register from './views/Register';
import Person from './views/Person';
import EditName from './views/Person/Name';
import EditNumber from './views/Person/CarNumber';
import EditInfo from './views/Person/CarInfo';
import EditWeight from './views/Person/Weight';
import EditTag from './views/Person/Tag';
import Cargo from './views/Cargo';
import CargoDetail from './views/CargoDetail';

function redirectToDashboad(nextState, replace) {
  if (sessionStorage.getItem('uuid')) {
    replace('/');
  }
}

function redirectToLogin(nextState, replace) {
  if (!sessionStorage.getItem('uuid')) {
    replace('/login');
  }
}

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="login" component={Login} onEnter={redirectToDashboad}/>
        <Route path="/" component={App} onEnter={redirectToLogin}>
          <IndexRoute component={Login}/>
          <Route path="register" component={Register}/>
          <Route path="person" component={Person}>
            <Route path="name" component={EditName}/>
            <Route path="car-number" component={EditNumber}/>
            <Route path="car-info" component={EditInfo}/>
            <Route path="car-weight" component={EditWeight}/>
            <Route path="car-tag" component={EditTag}/>
          </Route>
          <Route path="cargo" component={Cargo}/>
          <Route path="cargo/:id" component={CargoDetail}/>
        </Route>
      </Router>
    );
  }
}

export default Routes;
