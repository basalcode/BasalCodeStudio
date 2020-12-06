/* module */
import React from 'react';

/* component */
import UserMenu from './UserMenu/UserMenu';

const NavigationHeader = () => {
    return (
        <header className="NavigationHeader">
            <UserMenu />
        </header>
    );
}

export default NavigationHeader;