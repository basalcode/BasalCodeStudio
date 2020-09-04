import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkLogin as checkLoginAction } from '../../../../../action/authAction'

import Login from './Login';
import Account from './Account';

import './Auth.css';

function Auth() {
    const dispatch = useDispatch();
    const login = useSelector(store => store.authReducer.login);

    if (!login) {
        dispatch(checkLoginAction());
    }

    return (
        <div className="LoginLink"> {
            login ?
                <Account></Account> :
                <Login></Login>
        }</div>
    );
}

export default Auth;