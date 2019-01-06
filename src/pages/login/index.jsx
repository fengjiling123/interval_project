import React from 'react';
import LoginImage from '../../images/loginbg.png';
import { Form, Input, Button, Icon } from 'antd';
import http from '../../ultils/http';
import './index.scss';
const FormItem = Form.Item;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        window.localStorage.setItem('token', 'lOrsPNHUMcbb3TlXN5ce');
        // window.localStorage.setItem('token', 'OVeMi7ImLJuUop7RECrH');
        window.localStorage.setItem('name', values.userName);
        history.push('/');
        http.post('/tms/user/login', { username: values.username, password: values.password })
          .then((res) => {
            console.log(res)
            window.localStorage.setItem('token', 'lOrsPNHUMcbb3TlXN5ce');
            window.localStorage.setItem('name', values.userName);
            history.push('/');
          }).catch(e => console.error(e));
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return <div className='login-container'>
      <div className="login-image" ><img src={LoginImage} style={{ width: '100%' }} /></div>
      <div className='login-form-container'>
        <div className='header'>定时器管理系统</div>
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号!' }],
            })(
              <Input prefix={<Icon type="user" />} className="oInput accountNum"
                placeholder="请输入账号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input className="oInput passNum" prefix={<Icon type="lock" />}
                type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" className="loginBtn">登录</Button>
        </Form>
      </div>
    </div>
  }
}


export default Form.create()(Login);