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

// import Task from './task';
// import Log from './log';
// import Project from './project';
// import Users from './users';

import './index.scss';
import history from '../ultils/history';

import AsynLoadingComponent from '../components/asynComponent';
import Loadable from 'react-loadable';

const Task = Loadable({
	loader: () => import("./task"),
	loading: AsynLoadingComponent
});
const Log = Loadable({
	loader: () => import("./log"),
	loading: AsynLoadingComponent
});
const Project = Loadable({
	loader: () => import("./project"),
	loading: AsynLoadingComponent
});
const Users = Loadable({
	loader: () => import("./users"),
	loading: AsynLoadingComponent
});

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