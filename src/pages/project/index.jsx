import React from 'react';
import http from '../../ultils/http';
import { Table, Button, Modal } from 'antd';
import AddProjectModal from '../../components/addProjectModal';
import './index.scss';

const confirm = Modal.confirm;

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      loading: false,
      addProject: false
    };
    this.columns = [
      {
        title: '项目标识',
        dataIndex: 'appName',
        key: 'appName',
      },
      {
        title: '项目名',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '操作',
        key: 'action',
        width: 100,
        align: 'center',
        render: (text, record) => (
          <Button type="danger" size="small" onClick={this.deleteProject.bind(this, record.appName)}>删除</Button>
        ),
      }];
  }

  componentDidMount () {
    this.getProjectList();
  }

  getProjectList () {
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

  closeModal (refresh) {
    this.setState({ addProject: false });
    if (refresh) {
      this.getProjectList();
    };
  }

  deleteProject (appName) {
    confirm({
      title: '确认删除所选项目',
      okType: 'danger',
      onOk: () => {
        return http.post('/tms/jobgroup/delete', { appName })
          .then(res => {
            this.getProjectList();
          })
          .catch(err => console.error(err));
      }
    });
  }

  render () {
    const { loading, projectList, addProject } = this.state;
    return <div >
      <Button type="primary" style={{ marginBottom: '10px' }} onClick={() => { this.setState({ addProject: true }) }}>新建项目</Button>
      <Table dataSource={projectList} columns={this.columns} bordered pagination={false} loading={loading} />
      {addProject && <AddProjectModal closeModal={this.closeModal.bind(this)} />}
    </div>
  }
}


export default Project;