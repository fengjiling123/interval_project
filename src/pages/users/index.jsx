import React from 'react';
import http from '../../ultils/http';
import { Table, Button } from 'antd';
import AddUserModal from '../../components/addUserModal';
import './index.scss';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      loading: false,
      addUser: false
    };
    this.columns = [
      { title: '用户名', dataIndex: 'username', key: 'username' },
      { title: '角色', dataIndex: 'role', key: 'role' },
      { title: '邮箱', dataIndex: 'email', key: 'email' },
      {
        title: '操作',
        key: 'action',
        width: 100,
        align: 'center',
        render: (text, record) => (
          record.username !== 'admin' && <Button type="danger" size="small" onClick={this.deleteUser.bind(this, record)}>删除</Button>
        ),
      }
    ];
  }

  componentDidMount () {
    this.getUserList();
  }

  getUserList () {
    this.setState({ loading: true });
    http.post('/tms/user/users')
      .then(res => {
        this.setState({
          loading: false,
          userList: res.data
        })
      }).catch(err => {
        console.error(err);
        this.setState({ loading: false });
      })
  }

  closeModal (refresh) {
    this.setState({ addUser: false });
    if (refresh) {
      this.getUserList();
    }
  }

  deleteUser (record) {
    this.setState({ loading: true });
    const params = { user: record.username };
    http.post('/tms/user/delete', params)
      .then(res => {
        this.getUserList();
      })
      .catch(err => console.error(err));
  }

  render () {
    const { loading, userList, addUser } = this.state;
    return <div >
      <Button
        type="primary"
        style={{ marginBottom: '10px' }}
        onClick={() => { this.setState({ addUser: true }); }}>
        创建账号
      </Button>
      <Table dataSource={userList} columns={this.columns} bordered pagination={false} loading={loading} />
      {addUser && <AddUserModal closeModal={this.closeModal.bind(this)} />}
    </div>
  }
}


export default Users;