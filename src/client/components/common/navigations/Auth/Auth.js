import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkLogin as checkLoginAction } from 'action/authAction'

import Login from './Login';
import Account from './Account';

import './Auth.scss';

function Auth() {
    const dispatch = useDispatch();
    const login = useSelector(store => store.authReducer.login);

    if (!login) {
        dispatch(checkLoginAction());
    }

    return (
        <div className="Auth">
            <div className="Auth__top-margin"></div>
            <div className="Auth__content">
                { login ? <Account></Account> : <Login></Login> }
            </div>
        </div>
    );
}

export default Auth;