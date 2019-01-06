import React from 'react';
import http from '../../ultils/http';
import { Table, Button } from 'antd';
import './index.scss';

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
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

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      loading: false
    }
  }

  componentDidMount() {
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

  render() {
    const { loading, userList } = this.state;
    return <div >
      <Button type="primary" style={{ marginBottom: '10px' }}>创建账号</Button>
      <Table dataSource={userList} columns={columns} bordered pagination={false} loading={loading} />
    </div>
  }
}


export default Users;