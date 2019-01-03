import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render () {
        return <div className="header-container">
            <div>定时器管理系统</div>
        </div>
    }
}

Header.propTypes = {

}

export default Header;