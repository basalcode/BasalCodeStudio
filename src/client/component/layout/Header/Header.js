/* module */
import React, { useState, useEffect } from 'react';

/* component */
import Logo from './Logo';
import NavigationButton from './NavigationButton';

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
            <NavigationButton></NavigationButton>
        </header>
    );
}

export default Header;