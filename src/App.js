import React, { Component } from 'react';
import {
  Switch,
  Router,
  Route
} from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import './App.scss';

import history from './ultils/history';
import Login from './pages/login';
import IndexPage from './pages';

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={IndexPage} />
            </Switch>
          </div>
        </Router>
      </LocaleProvider>
    );
  }
}

export default App;
