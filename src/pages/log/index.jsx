import React from 'react';
import http from '../../ultils/http';
import { Table, Button, Select, Input, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import LogDetailModal from '../../components/logDetailModal';
import LogCatModal from '../../components/logCatModal';
import moment from 'moment';

const Option = Select.Option;

class Log extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			start: 1,
			length: 10,
			logStatus: '',
			jobId: '',
			SearchJobId: '',
			filterTime: '',
			logList: [],
			total: 0,
			loading: false,
			logId: '',
			showLogDetail: false,
			showLogCat: false,
			catLog: null
		};
		this.columns = [
			{ title: '项目名称', dataIndex: 'jobGroup', key: 'jobGroup' },
			{ title: '触发时间', dataIndex: 'triggerTime', key: 'triggerTime', render: (time) => (moment(time).format('YYYY-MM-DD HH:mm:ss')) },
			{ title: '触发状态', dataIndex: 'triggerCode', key: 'triggerCode' },
			{ title: '触发信息', dataIndex: 'triggerMsg', key: 'triggerMsg' },
			{ title: '执行地址', dataIndex: 'executorAddress', key: 'executorAddress' },
			{ title: '执行时间', dataIndex: 'handleTime', key: 'handleTime', render: (time) => (moment(time).format('YYYY-MM-DD HH:mm:ss')) },
			{ title: '执行状态', dataIndex: 'handleCode', key: 'handleCode' },
			{ title: '执行信息', dataIndex: 'handleMsg', key: 'handleMsg' },
			{
				title: '操作',
				key: 'action',
				align: 'center',
				width: 100,
				render: (text, record) => (
					<div>
						<Button
							onClick={() => { this.setState({ logId: record.id, showLogDetail: true }) }}
							type="primary"
							size="small">
							详情
					 	</Button>
						{record.handleCode === 500 &&
							<Button style={{ marginTop: '10px' }} size="small" onClick={() => { this.setState({ showLogCat: true, catLog: record }) }}>
								文件
						</Button>
						}
					</div>
				),
			}
		];
	}

	componentDidMount () {
		const jobId = this.props.location.state || '';
		this.setState({ jobId, SearchJobId: jobId }, () => {
			this.getLogList();
		});
	}

	getLogList () {
		const { start, length, logStatus, SearchJobId: jobId, filterTime } = this.state;
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

	chagePagination (page, pageSize) {
		this.setState({ start: page, length: pageSize, jobId: this.state.SearchJobId }, () => {
			this.getLogList();
		});
	}

	changeValue (type, value) {
		this.setState({ [type]: value }, () => {
			this.getLogList();
		});
	}

	doSearch () {
		this.setState({ SearchJobId: this.state.jobId, start: 1 }, () => {
			this.getLogList();
		})
	}

	render () {
		const { logList, loading, total, start, length, logStatus, jobId, logId, showLogDetail,
			showLogCat, catLog } = this.state;
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
			<div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }} >
				<div>
					<span>日志状态：</span>
					<Select value={logStatus} style={{ width: 150 }} onChange={(logStatus) => { this.changeValue('logStatus', logStatus) }}>
						<Option value="">全部</Option>
						<Option value="1">成功</Option>
						<Option value="2">失败</Option>
						<Option value="3">未执行</Option>
					</Select>
				</div>
				<div>
					<Input
						placeholder="请输入任务ID"
						prefix={<Icon type="search" />}
						suffix={jobId && <Icon type="close-circle" onClick={() => { this.setState({ jobId: '' }) }} />}
						value={jobId}
						style={{ width: '200px' }}
						onChange={(e) => { this.setState({ jobId: e.target.value }) }}
					/>
					<Button
						type="primary"
						onClick={() => { this.doSearch(); }}>
						搜索
			    </Button>
				</div>
			</div>
			<Table {...config} />
			{showLogDetail && <LogDetailModal logId={logId} closeModal={() => { this.setState({ showLogDetail: false }) }} />}
			{showLogCat && <LogCatModal catLog={catLog} closeModal={() => { this.setState({ showLogCat: false }) }} />}
		</div>
	}
}

export default withRouter(Log);