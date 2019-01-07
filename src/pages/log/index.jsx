import React from 'react';
import PropTypes from 'prop-types';
import http from '../../ultils/http';
import { Table, Button } from 'antd';

class Log extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			start: 1,
			length: 10,
			logStatus: '',
			jobId: '',
			filterTime: ''
		}
	}

	componentDidMount () {
		this.getLogList();
	}

	getLogList () {
		const { start, length, logStatus, jobId, filterTime } = this.state;
		const params = { start, length, logStatus, jobId, filterTime };
		console.log(params)
		http.post('/tms/joblog/pageList', params)
			.then(res => {
				console.log(res);
			})
			.catch(err => { console.error(err) });
	}

	render () {
		return <div>
			日志页面
        </div>
	}
}

Log.propTypes = {
	
}

export default Log;