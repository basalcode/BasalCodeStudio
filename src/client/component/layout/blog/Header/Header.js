import React, { useState, useEffect } from 'react';

import Logo from 'component/link/Logo';
import Navigation from 'component/ui/Navigation/Navigation';

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