import React from 'react';
import PropTypes from 'prop-types';
import history from '../../ultils/history';
import './index.scss';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render () {
        return <div className="side-menu-container">
            <div onClick={() => { history.push('/taskList') }}>任务列表</div>
            <div onClick={() => { history.push('/logList') }}>日志列表</div>
        </div>
    }

}


SideMenu.propTypes = {
}


export default SideMenu;