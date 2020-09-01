import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { isLoggedIn } from '../../../../../library/auth';

import './Auth.css';

import Login from './Login';
import Account from './Account';

function Auth() {
    const login = useSelector(store => store.auth.login);
    console.log(login);
    return (
        <div className="LoginLink"> {
            login ?
                <Account></Account> :
                <Login></Login>
        }</div>
    );
}

export default Auth;