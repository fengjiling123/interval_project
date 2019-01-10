import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Spin } from 'antd';
import http from '../../ultils/http';

class LogCat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      logContent: ''
    }
  }

  componentDidMount () {
    this.getLogDetailCat();
  }

  getLogDetailCat () {
    const { triggerTime, id: logId } = this.props.catLog;
    const params = { executorAddress: 'address', triggerTime, logId, fromLineNum: 0 };
    http.post('/tms/joblog/logDetailCat', params)
      .then(res => {
        this.setState({
          logContent: res.data.logContent,
          loading: false
        })
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  render () {
    const { loading, logContent } = this.state;
    const { closeModal } = this.props;
    return <Modal
      title="日志文件"
      visible
      footer={null}
      onCancel={() => { closeModal(); }}
    >
      <Spin spinning={loading}>
        <div dangerouslySetInnerHTML={{ __html: logContent }} />
      </Spin>
    </Modal>
  }
}

LogCat.propTypes = {
  catLog: PropTypes.object,
  closeModal: PropTypes.func
}

export default LogCat;