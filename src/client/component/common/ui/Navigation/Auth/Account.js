import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { login as loginAction } from '../../../../../action/authAction';
import { logout as logoutSession } from '../../../../../api/session/authApiSession';

import './Account.css'

const Account = () => {
    const dispatch = useDispatch();

    const onClickHandler = (event) => {
        const LOG_OUT = false;
        (async () => {
            return await fetch(`/auth/update/login?session=${LOG_OUT}`)
                .then(response => response.json())
                .then(result => {
                    const isSuccess = result.validity;
                    if (isSuccess) {
                        logoutSession();
                        alert('You have logged out successfully!');
                    } else {
                        const LOGOUT_FAILD = result.value;
                        alert(LOGOUT_FAILD);
                    }
                })
        })();
    }
    
    return (
        <div className="Account">
            <p>Login Success !</p>
            <input
                type="button"
                value="logout"
                onClick={onClickHandler}
            ></input>
        </div>
    );
}

export default Account;