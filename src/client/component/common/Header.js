import React, { Component } from 'react';

import './Header.css';

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