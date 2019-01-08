import React from 'react';
import LoginImage from '../../images/time2.png';
import { Form, Input, Button, Icon } from 'antd';
import http from '../../ultils/http';
import './index.scss';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit (e) {
    e.preventDefault();
    const { history } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        http.post('/tms/user/login', { username: values.username, password: values.password })
          .then((res) => {
            console.log(res)
            window.localStorage.setItem('token', res.data);
            window.localStorage.setItem('name', values.username);
            history.push('/');
          }).catch(e => console.error(e));
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return <div className='login-container'>
      <div className='login-form-container'>
        <div className='header'>定时器管理系统</div>
        <img src={LoginImage} alt="" />
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <div className="title">用户登陆</div>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号!' }],
            })(
              <Input
                size="large"
                style={{ width: '260px' }}
                prefix={<Icon type="user" />}
                className="oInput accountNum"
                placeholder="请输入账号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                size="large"
                style={{ width: '260px' }}
                className="oInput passNum"
                prefix={<Icon type="lock" />}
                type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <Button style={{ width: '260px', marginTop: '20px' }} type="primary" htmlType="submit" className="loginBtn">登录</Button>
        </Form>
      </div>
    </div>
  }
}

export default Form.create()(Login);