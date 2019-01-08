import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Spin } from 'antd';
import http from '../../ultils/http';
import moment from 'moment';
import './index.scss';

class LogDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      loading: true
    }
  }

  componentDidMount () {
    this.getLogDetail();
  }

  getLogDetail () {
    const { logId: id } = this.props;
    http.post('/tms/joblog/logDetailPage', { id })
      .then(res => {
        console.log(res);
        this.setState({ detail: res.data, loading: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  render () {
    const { closeModal } = this.props;
    const { loading } = this.state;
    const { logId, triggerCode, triggerTime, executorAddress, handleCode } = this.state.detail;
    return <Modal
      title="日志详情"
      visible
      className="log-detail-modal"
      footer={null}
      onCancel={() => { closeModal(); }}
    >
      <Spin spinning={loading}>
        <div className="row">
          <span>日志id：</span>
          <div>{logId}</div>
        </div>
        <div className="row">
          <span>触发时间：</span>
          <div>{triggerTime && moment(triggerTime).format('YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        <div className="row">
          <span>触发状态：</span>
          <div>{triggerCode}</div>
        </div>
        <div className="row">
          <span>执行地址：</span>
          <div>{executorAddress}</div>
        </div>
        <div className="row">
          <span>执行状态：</span>
          <div>{handleCode}</div>
        </div>
      </Spin>
    </Modal>
  }
}

LogDetailModal.propTypes = {
  closeModal: PropTypes.func,
  logId: PropTypes.number
}

export default LogDetailModal;