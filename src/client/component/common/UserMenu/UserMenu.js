/* module */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* store */
import { checkLogin as checkLoginAction } from 'store/action/auth';

/* component */
import LoginButton from './LoginButton';
import Account from './Account';

const UserMenu = () => {
    const dispatch = useDispatch();
    // const login = useSelector(store => store.auth.login);

    // if (!login) {
    //     dispatch(checkLoginAction());
    // }

    return (
        <div className="Auth">
            <div className="Auth__content">
                {/* { login ? <Account /> : <LoginButton /> } */}
            </div>
        </div>
    );
}

export default UserMenu;