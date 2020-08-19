import React, { Component } from 'react';
import './LoginLink.css';

class LoginLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="LoginLink" onClick={event => this.props.history.push('/login')}>
            </div>
        );
    }
}

export default LoginLink;