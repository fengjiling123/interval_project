import React from 'react';
import http from '../../ultils/http';
import { Table, Button } from 'antd';
import './index.scss';

const columns = [
  {
    title: '项目名',
    dataIndex: 'appName',
    key: 'appName',
  },
  {
    title: '分组',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    align: 'center',
    render: (text, record) => (
      <Button type="danger" size="small">删除</Button>
    ),
  }];

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    http.post('/tms/jobgroup/pageList')
      .then(res => {
        this.setState({
          loading: false,
          projectList: res.data
        })
      }).catch(err => {
        console.error(err);
        this.setState({ loading: false });
      })
  }

  render() {
    const { loading, projectList } = this.state;
    return <div >
      <Button type="primary" style={{ marginBottom: '10px' }}>新建项目</Button>
      <Table dataSource={projectList} columns={columns} bordered pagination={false} loading={loading} />
    </div>
  }
}


export default Project;