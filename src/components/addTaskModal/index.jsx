import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, message } from 'antd';
import http from '../../ultils/http';
import './index.scss';

class AddTaskModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			desc: '',
			handler: 'httpJobHandler',
			address: '',
			command: '',
			cron: '',
			id: ''
		}
	}

	componentDidMount () {
		const { editTask } = this.props;
		if (editTask) {
			const { jobDesc: desc, address, command, jobCron: cron, id, handler } = editTask;
			this.setState({
				desc, address, command, cron, id, handler
			});
		}
	}

	saveTask () {
		const { desc, address, command, cron, id, handler } = this.state;
		const { closeModal, editTask } = this.props;
		if (!(desc && address && command && cron && id)) {
			message.error(<span>请填写所有<i style={{ color: 'red', margin: '0 3px' }}>*</i>标记字段</span>);
			return;
		}
		const params = { desc, address, command, cron, id, handler };
		let url = editTask ? '/tms/job/update' : '/tms/job/add';
		http.post(url, params)
			.then(res => {
				closeModal('refresh');
			}).catch(err => console.error(err));
	}

	changeValue (valueType, value) {
		this.setState({ [valueType]: value });
	}

	render () {
		const { closeModal, editTask } = this.props;
		const { desc, address, command, cron, id } = this.state;
		return <Modal
			title="新增任务"
			visible
			className="add-task-modal"
			onOk={() => { this.saveTask() }}
			onCancel={() => { closeModal(); }}
		>
			<div className="row requried">
				<span>任务描述</span>
				<Input
					value={desc}
					placeholder="请输入任务描述"
					onChange={(e) => { this.changeValue('desc', e.target.value) }} />
			</div>
			<div className="row requried">
				<span>api地址</span>
				<Input
					value={address}
					placeholder="请输入api地址"
					onChange={(e) => { this.changeValue('address', e.target.value) }} />
			</div>
			<div className="row requried">
				<span>api</span>
				<Input
					value={command}
					placeholder="请输入api"
					onChange={(e) => { this.changeValue('command', e.target.value) }} />
			</div>
			<div className="row requried">
				<span>cron表达式</span>
				<Input
					value={cron}
					placeholder="请输入cron表达式"
					onChange={(e) => { this.changeValue('cron', e.target.value) }} />
			</div>
			{!editTask &&
				<div className="row requried">
					<span>id</span>
					<Input
						value={id}
						placeholder="请输入id"
						onChange={(e) => { this.changeValue('id', e.target.value) }} />
				</div>
			}
		</Modal>
	}
}

AddTaskModal.propTypes = {
	closeModal: PropTypes.func,
	editTask: PropTypes.object
}

export default AddTaskModal;