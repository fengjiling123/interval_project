import React from 'react';
import PropTypes from 'prop-types';
import http from '../../ultils/http';
import { Modal, Input, Select, message } from 'antd';
import './index.scss';
import Item from 'antd/lib/list/Item';

const Option = Select.Option;

class AddUserModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projectList: [],
			user: '',
			password: '',
			appName: '',
			email: '',
			loading: false
		}
	}

	componentDidMount () {
		this.setState({ loading: true })
		http.post('/tms/jobgroup/pageList')
			.then(res => {
				if (!res.data || res.data.length === 0) {
					message.error('请先创建项目');
					return;
				}
				this.setState({
					projectList: res.data,
					loading: false
				});
			}).catch(err => {
				console.error(err);
				this.setState({ loading: false });
			})
	}

	changeValue (valueType, value) {
		this.setState({ [valueType]: value });
	}

	saveUser () {
		const { user, password, appName, email } = this.state;
		const { closeModal } = this.props;
		if (!(user && password && appName)) {
			message.error('用户名、密码、项目名不能为空');
			return;
		};
		const params = { user, password, appName, email };
		http.post('/tms/user/create', params)
			.then(res => {
				closeModal('refresh');
			})
			.catch(err => console.error(err));
	}

	render () {
		const { closeModal } = this.props;
		const { projectList, user, password, appName, email, loading } = this.state;
		return <Modal
			title="创建账号"
			visible
			className="add-user-modal"
			onOk={() => { this.saveUser() }}
			onCancel={() => { closeModal(); }}
		>
			<div className="row requried">
				<span>用户名</span>
				<Input
					value={user}
					placeholder="请输入用户名"
					onChange={(e) => { this.changeValue('user', e.target.value) }} />
			</div>
			<div className="row requried">
				<span>密码</span>
				<Input
					value={password}
					placeholder="请输入密码"
					onChange={(e) => { this.changeValue('password', e.target.value) }} />
			</div>
			<div className="row requried" >
				<span>项目名</span>
				<Select onChange={this.changeValue.bind(this, 'appName')} style={{ flex: 1 }} placeholder='请选择项目'>
					{projectList ?
						(loading ?
							<Option value='loading' disabled>加载中...</Option> :
							projectList.map(item => (<Option value={item.appName} key={item}>{item.appName}</Option>))
						)
						: <Option value='empty' disabled>没有数据</Option>
					}
				</Select>
			</div>
			<div className="row">
				<span>邮箱</span>
				<Input
					value={email}
					placeholder="请输入邮箱"
					onChange={(e) => { this.changeValue('email', e.target.value) }} />
			</div>
		</Modal>
	}
}

AddUserModal.propTypes = {
	closeModal: PropTypes.func
}

export default AddUserModal;