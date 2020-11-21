/* module */
import React from 'react';
import { useSelector } from 'react-redux';

/* component */
import Logo from './Logo';
import NavigationButton from './NavigationButton';

const Header = (props) => {
    /* store */
    const navigationOn = useSelector(store => store.blog.navigationOn);

    return (
        <header className={"Header " +
            `${props.fadeInOn ? 
                "Header--fade-in-on" :
                "Header--fade-in-off"} ` +
            `${navigationOn ? "Header--navigation-on" : ""} `}>
            <Logo />
            <NavigationButton />
        </header>
    );
}

export default Header;