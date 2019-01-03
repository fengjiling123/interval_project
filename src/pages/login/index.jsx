import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        
    }

    render () {
        console.log(this.props, 111)
        return <div>
            登陆页面
        </div>
    }
}

Login.propTypes = {

}

export default Login;