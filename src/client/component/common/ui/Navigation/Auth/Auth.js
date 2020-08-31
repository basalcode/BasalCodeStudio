import React, { useState, useEffect } from 'react';

import './Auth.css';

import { isLoggedIn } from '../../../../../library/auth'

import Login from './Login';
import Account from './Account';

function Auth() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log('hello');
        setLoggedIn(isLoggedIn);
    }, [])

    return (
        <div className="LoginLink"> {
            loggedIn ?
            <Account></Account> :
            <Login></Login>
        }</div>
    );
}

export default Auth;