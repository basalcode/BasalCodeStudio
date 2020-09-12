import React, { useState, useEffect } from 'react';

import './Header.scss';

import Logo from 'component/common/ui/Logo';
import Navigation from 'component/common/ui/Navigation/Navigation';

const Header = () => {
    const [effectClassName, setEffectClassName] = useState('Header--before')
    useEffect(() => {
        const interval = 1500;
        setTimeout(() => {
            setEffectClassName('Header--after');
        }, interval)
    }, []);

    return (
        <header className={"Header " + effectClassName}>
            <Logo></Logo>
            <Navigation></Navigation>
        </header>
    );
}

export default Header;