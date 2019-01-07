import React from 'react';
import PropTypes from 'prop-types';
import http from '../../ultils/http';
import { Modal, Input, message } from 'antd';
import './index.scss';
import Item from 'antd/lib/list/Item';

class AddProjectModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			appName: '',
			title: ''
		}
	}

	changeValue (valueType, value) {
		this.setState({ [valueType]: value });
	}

	saveProject () {
		const { appName, title } = this.state;
		const { closeModal } = this.props;
		if (!(appName && title)) {
			message.error('项目标识和项目名称不能为空');
			return;
		}
		const params = { appName, title };
		http.post('/tms/jobgroup/create', params)
			.then(res => {
				closeModal('refresh');
			})
			.catch(err => console.error(err));
	}

	render () {
		const { closeModal } = this.props;
		const { appName, title } = this.state;
		return <Modal
			title="新建项目"
			visible
			className="add-project-modal"
			onOk={() => { this.saveProject() }}
			onCancel={() => { closeModal(); }}
		>
			<div className="row requried">
				<span>项目标识</span>
				<Input
					value={appName}
					placeholder="请输入项目标识"
					onChange={(e) => { this.changeValue('appName', e.target.value) }} />
			</div>
			<div className="row requried">
				<span>项目名称</span>
				<Input
					value={title}
					placeholder="请输入项目名称"
					onChange={(e) => { this.changeValue('title', e.target.value) }} />
			</div>
		</Modal>
	}
}

AddProjectModal.propTypes = {
	closeModal: PropTypes.func
}

export default AddProjectModal;