import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Popover } from 'antd';
import history from '../../ultils/history';
import './index.scss';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	loginout () {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		history.push('/login');
	}

	render () {
		const content = (
			<div onClick={this.loginout.bind(this)}  style={{ cursor: 'pointer' }}>
				退出登陆
      </div>
		);

		return <div className="header-container">
			<div className="pro-name">定时器管理系统</div>
			<div style={{ cursor: 'pointer' }}>
				<Popover placement="bottom" content={content}>
					<Avatar style={{ backgroundColor: '#1890ff', marginRight: '10px' }} icon="user" />
					<span>{window.localStorage.getItem('name') || '用户未登录'}</span>
				</Popover>
			</div>
		</div>
	}
}

Header.propTypes = {

}

export default Header;