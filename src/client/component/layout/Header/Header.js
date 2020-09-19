/* module */
import React, { useState, useEffect } from 'react';

/* component */
import Logo from './Logo';
import NavigationButton from './NavigationButton';

const Header = ({ fadeInOn }) => {
    return (
        <header className={`Header ${
            fadeInOn ? 
            "Header--fade-in-on" :
            "Header--fade-in-off"
        }`}>
            <Logo></Logo>
            <NavigationButton></NavigationButton>
        </header>
    );
}

export default Header;