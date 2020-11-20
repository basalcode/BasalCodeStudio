/* module */
import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton = () => {
    return (
        <div className="LoginButton">
            <Link className="LoginButton__text" to={`/auth/login`}>
                BasalCodeStudio 로그인
            </Link>
        </div>
    );
}

export default LoginButton;