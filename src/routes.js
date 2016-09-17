import React from 'react';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import App from './App';
import Login from './views/Login';
import Register from './views/Register';
import Person from './views/Person';
import EditName from './views/Person/Name';
import EditImg from './views/Person/Img';
import EditNumber from './views/Person/CarNumber';
import EditInfo from './views/Person/CarInfo';
import EditWeight from './views/Person/Weight';
import EditTag from './views/Person/Tag';
import Cargo from './views/Cargo';
import CargoDetail from './views/CargoDetail';
import MyCargo from './views/MyCargo';
import MyCargoDetail from './views/MyCargoDetail';
import MyCargoSuccess from './views/MyCargoDetail/OfferSuccess';

// function redirectToDashboad(nextState, replace) {
//   if (sessionStorage.getItem('uuid')) {
//     replace('/');
//   }
// }
//
// function redirectToLogin(nextState, replace) {
//   if (!sessionStorage.getItem('uuid')) {
//     replace('/login');
//   }
// }

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>
        <Route path="/" component={App}>
          <IndexRoute component={Person}/>
          <Route path="person" component={Person}>
            <Route path="name" component={EditName}/>
            <Route path="car-number" component={EditNumber}/>
            <Route path="car-info" component={EditInfo}/>
            <Route path="car-weight" component={EditWeight}/>
            <Route path="car-tag" component={EditTag}/>
            <Route path="car-img" component={EditImg}/>
          </Route>
          <Route path="cargo" component={Cargo}/>
          <Route path="cargo/:id" component={CargoDetail}/>
          <Route path="my-cargo" component={MyCargo}/>
          <Route path="my-cargo/:id" component={MyCargoDetail}>
            <Route path="success" component={MyCargoSuccess}/>
          </Route>
        </Route>
      </Router>
    );
  }
}

export default Routes;
