import React from 'react';
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
import Project from './project';
import Users from './users';
import './index.scss';
import history from '../ultils/history';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount () {
		if (!window.localStorage.getItem('name')) {
			history.push('/login')
		}
	}

	render () {
		return <div>
			<Header />
			<div className="bottom-container">
				<SideMenu />
				<div className="pages-container">
					<div style={{ padding: '20px' }}>
						<Switch>
							<Route path="/taskList" component={Task} />
							<Route path="/logList" component={Log} />
							<Route path="/project" component={Project} />
							<Route path="/users" component={Users} />
							<Route path="*" component={Task} />
						</Switch>
					</div>
				</div>
			</div>
		</div>
	}
}

export default App;