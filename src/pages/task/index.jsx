import React from 'react';
import http from '../../ultils/http';
import { Table, Button } from 'antd';
import './index.scss';

const statusList = { NORMAL: '正常执行', PAUSED: '暂停', COMPLETE: '执行完成', ERROR: '错误' };
const columns = [
	{
		title: '分组',
		dataIndex: 'jobGroup',
		key: 'jobGroup',
	},
	{
		title: '时间表达式',
		dataIndex: 'jobCron',
		key: 'jobCron',
	},
	{
		title: '任务描述',
		dataIndex: 'jobDesc',
		key: 'jobDesc',
	},
	{
		title: '地址',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: '报警邮箱',
		dataIndex: 'alarmEmail',
		key: 'alarmEmail',
	},
	{
		title: '任务状态',
		dataIndex: 'jobStatus',
		key: 'jobStatus',
		render: (text, record) => (
			<span>
				{statusList[text]}
			</span>)
	},

	{
		title: '操作',
		key: 'action',
		width: 100,
		align: 'center',
		render: (text, record) => (
			<div class="action-container">
				{record.jobStatus !== 'NORMAL' && <Button type="primary" size="small">编辑</Button>}
				{record.jobStatus === 'NORMAL' && <Button size="small">暂停</Button>}
				{record.jobStatus === 'PAUSED' && <Button size="small">启动</Button>}
				{record.jobStatus !== 'NORMAL' && <Button type="danger" size="small">删除</Button>}
			</div>
		),
	}];

class Task extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList: [],
			totalNum: 0,
			loading: false
		}
	}

	componentDidMount() {
		this.setState({ loading: true });
		http.post('/tms/job/pageList')
			.then(res => {
				console.log(res);
				this.setState({
					taskList: res.data.data,
					totalNum: res.data.recordsTotal,
					loading: false
				});
			})
	}

	render() {
		const { taskList, loading } = this.state;
		return <div className="task-list-container">
			<Button type="primary" style={{ marginBottom: '10px' }}>新增任务</Button>
			<Table dataSource={taskList} columns={columns} bordered pagination={false} loading={loading} />
		</div>
	}
}

Task.propTypes = {

}

export default Task;