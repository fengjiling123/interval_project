import React from 'react';
import PropTypes from 'prop-types';
import history from '../../ultils/history';
import { Menu, Icon, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import menuData from '../../ultils/menu_data';
import './index.scss';

class SideMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render () {
		const selectedKeys = window.location.pathname === '/' ? ['/taskList'] : [window.location.pathname];
		return <div className="side-menu-container">
			<Menu
				selectedKeys={selectedKeys}
				theme='dark'
				onSelect={({ item, key }) => { history.push(key); }}
			>
				{menuData.map(item => (
					<Menu.Item key={item.path} >
						<Icon type={item.icon} />
						{item.name}
					</Menu.Item>
				))}
			</Menu>
		</div>
	}

}

SideMenu.propTypes = {

}

export default withRouter(SideMenu);