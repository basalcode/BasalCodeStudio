/* module */
import React from 'react';

/* component */
import Logo from './Logo';
import NavigationButton from './NavigationButton';

const Header = (props) => {
    const navigationButtonToggleHandler = toggle => {
        props.onNavigationButtonToggle(toggle);
    }

    return (
        <header className={`Header ${
            props.fadeInOn ? 
            "Header--fade-in-on" :
            "Header--fade-in-off"
        }`}>
            <Logo />
            <NavigationButton 
                onToggle={navigationButtonToggleHandler}/>
        </header>
    );
}

export default Header;