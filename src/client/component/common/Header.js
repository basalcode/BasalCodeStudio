import React from 'react';

import './Header.scss';

import Logo from 'component/common/ui/Logo';
import Navigation from 'component/common/ui/Navigation/Navigation';

const Header = () => {
    return (
        <header className="Header">
            <Logo></Logo>
            <Navigation></Navigation>
        </header>
    );
}

export default Header;