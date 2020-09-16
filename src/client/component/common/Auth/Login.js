import React from 'react';
import { Link } from 'react-router-dom';

import './Login.scss';

const Login = () => {
    return (
        <div className="Login">
            <Link to={`/auth/login`}>
                <div className="Login__content">
                    <div className="Login__content-text">
                        login
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Login;