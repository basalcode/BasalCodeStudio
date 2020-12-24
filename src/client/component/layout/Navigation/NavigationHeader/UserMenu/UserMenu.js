/* module */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

/* component */
import LoginButton from './LoginButton';
import Account from './Account';

const UserMenu = () => {
    /* store */
    const login = useSelector(store => store.auth.login);

    useEffect(() => {
        console.log('login', login);
    }, []);

    return (
        <div className="UserMenu">
            { login ? <Account /> : <LoginButton /> }
        </div>
    );
}

export default UserMenu;