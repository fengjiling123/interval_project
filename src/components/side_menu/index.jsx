import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import history from '../../ultils/history';
import menuData from '../../ultils/menu_data';
import './index.scss';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  isShow (menu) {
    let LoginUser = window.localStorage.getItem('name');
    let adminMenu = ['用户管理', '项目管理'];
    if (LoginUser === 'admin' && adminMenu.indexOf(menu.name) !== -1) {
      window.location.pathname === '/' && history.push('/project');
      return true;

    }
    if (LoginUser !== 'admin' && adminMenu.indexOf(menu.name) === -1) {
      return true;
    }
  }

  render () {
    const selectedKeys = window.location.pathname === '/' ? ['/taskList'] : [window.location.pathname];
    return <div className="side-menu-container">
      <Menu
        selectedKeys={selectedKeys}
        theme='dark'
        onSelect={({ item, key }) => { history.push(key); }}
      >
        {menuData.map(item => (
          this.isShow(item) &&
          <Menu.Item key={item.path} >
            <Icon type={item.icon} />
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  }
}

export default withRouter(SideMenu);