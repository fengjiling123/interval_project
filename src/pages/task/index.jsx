import React from 'react';
import http from '../../ultils/http';
import history from '../../ultils/history';
import { Table, Button, Input, Icon, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import AddTaskModal from '../../components/addTaskModal';
import TaskExecModal from '../../components/taskExecModal';
import './index.scss';

const confirm = Modal.confirm;

const statusList = { NORMAL: '正常执行', PAUSED: '暂停', COMPLETE: '执行完成', ERROR: '错误' };

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			start: 1,
			length: 10,
			taskList: [],
			total: 0,
			loading: false,
			addTask: false,
			editTask: null,
			jobDesc: '',
			doSearchJobDesc: "",
			showExecModal: false
		};
		this.columns = [
			{ title: 'ID', dataIndex: 'id', key: 'id', width: 60, align: 'center' },
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
						<Button size="small" type="primary" onClick={() => { this.setState({ editTask: record, showExecModal: true }) }}>统计</Button>
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
						{record.jobStatus !== 'NORMAL' && <Button size="small" onClick={this.resumeTask.bind(this, record)}>启动</Button>}
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
		const { start, length, doSearchJobDesc: jobDesc } = this.state;
		const params = { start, length, jobDesc };
		this.setState({ loading: true });
		http.post('/tms/job/pageList', params)
			.then(res => {
				console.log(res);
				this.setState({
					taskList: res.data.data,
					total: res.data.recordsTotal,
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
		confirm({
			title: '确认删除所选任务',
			okType: 'danger',
			onOk: () => {
				return http.post('/tms/job/remove', { id: record.id })
					.then(res => {
						this.getTaskList();
					}).catch(err => console.error(err));
			}
		});
	}

	chagePagination (page, pageSize) {
		this.setState({ start: page, length: pageSize, jobDesc: this.state.doSearchJobDesc }, () => {
			this.getTaskList();
		});
	}

	changeJobDesc (jobDesc) {
		this.setState({ jobDesc });
	}

	doSearch () {
		this.setState({
			start: 1,
			doSearchJobDesc: this.state.jobDesc
		}, () => { this.getTaskList(); })
	}

	render () {
		const { taskList, loading, addTask, editTask, total, start, length, jobDesc,
			showExecModal } = this.state;
		const config = {
			dataSource: taskList,
			columns: this.columns,
			bordered: true,
			loading: loading,
			pagination: {
				total,
				current: start,
				pageSize: length,
				showSizeChanger: true,
				showQuickJumper: true,
				showTotal: (total) => ('总条数：' + total),
				onChange: (page, pageSize) => { this.chagePagination(page, pageSize) },
				onShowSizeChange: (current, size) => { this.chagePagination(1, size) }
			}
		};
		return <div className="task-list-container">
			<div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-end' }}>
				<Input
					placeholder="请输入任务描述"
					prefix={<Icon type="search" />}
					suffix={jobDesc && <Icon type="close-circle" onClick={() => { this.changeJobDesc('') }} />}
					value={jobDesc}
					style={{ width: '200px' }}
					onChange={(e) => { this.changeJobDesc(e.target.value) }}
				/>
				<Button
					type="primary"
					style={{ marginRight: '20px' }}
					onClick={() => { this.doSearch(); }}>
					搜索
			 </Button>
				<Button
					type="primary"
					onClick={() => { this.setState({ addTask: true }) }}>
					新增任务
			 </Button>
			</div>
			<Table {...config} />
			{addTask && <AddTaskModal closeModal={this.closeModal.bind(this)} editTask={editTask} />}
			{showExecModal && <TaskExecModal closeModal={() => { this.setState({ showExecModal: false }) }} editTask={editTask} />}
		</div>
	}
}

export default Task;