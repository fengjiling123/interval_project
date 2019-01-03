import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import {
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

import Header from '../components/header';
import SideMenu from '../components/side_menu';
import Task from './task';
import Log from './log';
import './index.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render () {
        return <div>
            <Header />
            <div className="bottom-container">
                <SideMenu />
                <div className="pages-container">
                    <Switch>
                        <Route path="/taskList" component={Task} />
                        <Route path="/logList" component={Log} />
                        <Route path="*" component={Task} />
                    </Switch>
                </div>
            </div>
        </div>
    }
}

App.propTypes = {

}

export default App;