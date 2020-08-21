import React from 'react';
import { Link } from 'react-router-dom';

import './LoginLink.css';

function LoginLink() {
    return (
        <div className="LoginLink">
        <Link to="/login">Login</Link>
        </div>
    );
}

export default LoginLink;