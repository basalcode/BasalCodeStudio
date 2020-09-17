/* module */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* store */
import { checkLogin as checkLoginAction } from 'store/action/authAction'

/* component */
import LoginButton from './LoginLoginButton';
import Account from './Account';

const UserMenu = () => {
    const dispatch = useDispatch();
    const login = useSelector(store => store.authReducer.login);

    if (!login) {
        dispatch(checkLoginAction());
    }

    return (
        <div className="Auth">
            <div className="Auth__content">
                { login ? <Account></Account> : <LoginButton></LoginButton> }
            </div>
        </div>
    );
}

export default UserMenu;