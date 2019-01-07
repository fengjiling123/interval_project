import React from 'react';
import PropTypes from 'prop-types';
import http from '../../ultils/http';
import { Table, Button, Select } from 'antd';
import { withRouter } from 'react-router-dom';

const Option = Select.Option;

class Log extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			start: 1,
			length: 10,
			logStatus: '',
			jobId: '',
			filterTime: '',
			logList: [],
			total: 0,
			loading: false,
			taskList: []
		};
		this.columns = [
			{ title: '项目名称', dataIndex: 'jobGroup', key: 'jobGroup' },
			{ title: '触发时间', dataIndex: 'triggerTime', key: 'triggerTime' },
			{ title: '触发状态', dataIndex: 'triggerCode', key: 'triggerCode' },
			{ title: '触发信息', dataIndex: 'triggerMsg', key: 'triggerMsg' },
			{ title: '执行时间', dataIndex: 'handleTime', key: 'handleTime' },
			{ title: '执行状态', dataIndex: 'handleCode', key: 'handleCode' },
			{ title: '执行信息', dataIndex: 'handleMsg', key: 'handleMsg' },
			{
				title: '操作',
				key: 'action',
				width: 100,
				align: 'center',
				render: (text, record) => (
					<Button type="primary"
						size="small">
						查看详情
				 </Button>
				),
			}
		];
	}

	componentDidMount () {
		if (this.props.location.state) {
			this.setState({ jobId: this.props.location.state },()=>{
				this.getLogList();
			});
		}else{
			this.getLogList();
		}
		this.getTaskList();
	}

	getLogList () {
		const { start, length, logStatus, jobId, filterTime } = this.state;
		const params = { start, length, logStatus, jobId, filterTime };
		this.setState({ loading: true });
		http.post('/tms/joblog/pageList', params)
			.then(res => {
				this.setState({
					logList: res.data.data,
					total: res.data.recordsTotal,
					loading: false
				})
			})
			.catch(err => {
				console.error(err);
				this.setState({ loading: false });
			});
	}

	getTaskList () {
		http.post('/tms/job/pageList')
			.then(res => {
				this.setState({
					taskList: res.data.data
				});
			}).catch(err => console.error(err));
	}

	chagePagination (page, pageSize) {
		this.setState({ start: page, length: pageSize }, () => {
			this.getLogList();
		});
	}

	changeValue (type, value) {
		this.setState({ [type]: value }, () => {
			this.getLogList();
		});
	}

	render () {
		const { logList, loading, total, start, length, logStatus, taskList, jobId } = this.state;
		const config = {
			dataSource: logList,
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
		const status = { 1: '成功', 2: '失败', 3: '未执行' }
		return <div>
			<div style={{ marginBottom: '10px' }} >
				<span>日志状态：</span>
				<Select value={logStatus} style={{ width: 150 }} onChange={(logStatus) => { this.changeValue('logStatus', logStatus) }}>
					<Option value="">全部</Option>
					<Option value="1">成功</Option>
					<Option value="2">失败</Option>
					<Option value="3">未执行</Option>
				</Select>
				<span style={{ marginLeft: '30px' }}>任务：</span>
				<Select value={jobId} style={{ width: 150 }} onChange={(jobId) => { this.changeValue('jobId', jobId) }}>
					<Option value="">全部</Option>
					{taskList && taskList.map(item => (<Option value={item.id} key={item.id}>{item.jobDesc}</Option>))}
				</Select>
			</div>
			<Table {...config} />
		</div>
	}
}

Log.propTypes = {

}

export default withRouter(Log);