/* module */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* store */
import { checkLogin as checkLoginAction } from 'store/action/auth';

/* component */
import LoginButton from './LoginButton';
import Account from './Account';

const UserMenu = () => {
    const dispatch = useDispatch();
    const login = useSelector(store => store.auth.login);

    useEffect(() => {
        if (!login) {
            dispatch(checkLoginAction());
        }
    }, []);

    return (
        <div className="UserMenu">
            { login ? <Account /> : <LoginButton /> }
        </div>
    );
}

export default UserMenu;