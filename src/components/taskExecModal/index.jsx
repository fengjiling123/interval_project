import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Spin } from 'antd';
import http from '../../ultils/http';
import echarts from 'echarts';
import PieChart from '../pieChart';

class TaskExecModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      option: null
    }
  }

  componentDidMount () {
    this.getExecInfo();
  }

  getExecInfo () {
    const params = { jobId: this.props.editTask.id };
    http.post('/tms/joblog/jobExecInfo', params)
      .then(res => {
        const data = res.data;
        this.setOption(data);
        this.setState({ loading: false });
      }).catch(err => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  setOption (data) {
    let seriesData = [];
    const status = { success: '执行成功', fail: '执行失败', unHandle: '已触发，未处理' };
    Object.keys(data).map(item => {
      if (item !== 'total') {
        let name = status[item];
        seriesData.push({ value: data[item], name });
      }
    })
    let option = {
      title: {
        text: '任务运行结果',
        subtext: `结果总数：${data.total}`,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: '状态',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: seriesData,
          label: {
            normal: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.setState({ option });
  }

  render () {
    const { closeModal } = this.props;
    const { loading, option } = this.state;
    return <Modal
      title="任务运行结果统计"
      className="log-detail-modal"
      footer={null}
      visible
      onCancel={() => { closeModal(); }}
    >
      <Spin spinning={loading}>
        <PieChart option={option} />
      </Spin>
    </Modal>
  }
}

TaskExecModal.propTypes = {
  closeModal: PropTypes.func,
  editTask: PropTypes.object
}

export default TaskExecModal;