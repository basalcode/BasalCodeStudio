import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css'

const Login = () => {
    
    return (
        <div className="Login">
            <Link to={`/auth/login`}>Login</Link>
        </div>
    );
}

export default Login;