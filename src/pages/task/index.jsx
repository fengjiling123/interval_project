import React from 'react';
import http from '../../ultils/http';
import history from '../../ultils/history';
import { Table, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import AddTaskModal from '../../components/addTaskModal';
import './index.scss';

const statusList = { NORMAL: '正常执行', PAUSED: '暂停', COMPLETE: '执行完成', ERROR: '错误' };

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList: [],
			totalNum: 0,
			loading: false,
			addTask: false,
			editTask: null
		};
		this.columns = [
			{ title: '项目名', dataIndex: 'jobGroup', key: 'jobGroup' },
			{ title: 'cron表达式', dataIndex: 'jobCron', key: 'jobCron' },
			{ title: '描述', dataIndex: 'jobDesc', key: 'jobDesc' },
			{ title: 'api地址', dataIndex: 'address', key: 'address' },
			{ title: 'api', dataIndex: 'command', key: 'command' },
			{ title: '邮箱', dataIndex: 'alarmEmail', key: 'alarmEmail' },
			{ title: '任务状态', dataIndex: 'jobStatus', key: 'jobStatus', render: (text, record) => (statusList[text]) },
			{
				title: '操作',
				key: 'action',
				width: 150,
				render: (text, record) => (
					<div className="action-container">
						{record.jobStatus !== 'NORMAL' &&
							<Button type="primary"
								size="small"
								onClick={this.editTask.bind(this, record)}>
								编辑
						 </Button>}
						<Button size="small" onClick={() => {
							let path = {
								pathname: '/logList',
								state: record.id,
							}
							this.props.history.push(path);
						}}>
							日志
						 </Button>
						{record.jobStatus === 'NORMAL' && <Button size="small" onClick={this.pauseTask.bind(this, record)}>暂停</Button>}
						{record.jobStatus === 'PAUSED' && <Button size="small" onClick={this.resumeTask.bind(this, record)}>启动</Button>}
						{record.jobStatus !== 'NORMAL' && <Button type="danger" size="small" onClick={this.deleteTask.bind(this, record)}>删除</Button>}
					</div>
				),
			}
		];
	}

	componentDidMount () {
		this.getTaskList();
	}

	getTaskList () {
		this.setState({ loading: true });
		http.post('/tms/job/pageList')
			.then(res => {
				console.log(res);
				this.setState({
					taskList: res.data.data,
					totalNum: res.data.recordsTotal,
					loading: false
				});
			}).catch(err => {
				console.error(err);
				this.setState({ loading: false });
			});
	}

	closeModal (refresh) {
		this.setState({
			addTask: false,
			editTask: null
		});
		if (refresh) {
			this.getTaskList();
		}
	}

	editTask (editTask) {
		this.setState({ editTask, addTask: true });
	}

	pauseTask (record) {
		http.post('/tms/job/pause', { id: record.id })
			.then(res => {
				this.getTaskList();
			}).catch(err => console.error(err));
	}

	resumeTask (record) {
		http.post('/tms/job/resume', { id: record.id })
			.then(res => {
				this.getTaskList();
			}).catch(err => console.error(err));
	}

	deleteTask (record) {
		http.post('/tms/job/remove', { id: record.id })
			.then(res => {
				this.getTaskList();
			}).catch(err => console.error(err));
	}

	render () {
		const { taskList, loading, addTask, editTask } = this.state;
		return <div className="task-list-container">
			<Button
				type="primary"
				style={{ marginBottom: '10px' }}
				onClick={() => { this.setState({ addTask: true }) }}>
				新增任务
			 </Button>
			<Table dataSource={taskList} columns={this.columns} bordered pagination={false} loading={loading} />
			{addTask && <AddTaskModal closeModal={this.closeModal.bind(this)} editTask={editTask} />}
		</div>
	}
}

export default Task;