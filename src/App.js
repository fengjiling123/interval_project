import React, { Component } from 'react';

import {
  Switch,
  Router,
  Route,
  Link
} from 'react-router-dom';
import './App.scss';
import history from './ultils/history';
import Login from './pages/login';
import IndexPage from './pages';


class App extends Component {
  render () {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={IndexPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
