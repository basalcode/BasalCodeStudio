/* module */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

/* component */
import LoginButton from './LoginButton';
import Account from './Account';

const UserMenu = () => {
    /* store */
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

    useEffect(() => {
        console.log('USER MENU: login', isLoggedIn);
    }, []);

    return (
        <div className="UserMenu">
            { isLoggedIn ? <Account /> : <LoginButton /> }
        </div>
    );
}

export default UserMenu;