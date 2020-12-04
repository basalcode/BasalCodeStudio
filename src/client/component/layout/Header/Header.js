/* module */
import React from 'react';
import { useSelector } from 'react-redux';

/* component */
import Logo from './Logo';
import NavigationButton from './NavigationButton';

const Header = props => {
    /* store */
    const navigationOn = useSelector(store => store.blog.navigationOn);

    /* props */
    const fadeInOn = props.fadeInOn;

    return (
        <header className={"Header " +
            `${fadeInOn ? 
                "Header--fade-in-on" :
                "Header--fade-in-off"} ` +
            `${navigationOn ? "Header--navigation-on" : ""} `}>
            <Logo fadeInOn={fadeInOn} />
            <NavigationButton fadeInOn={fadeInOn} />
        </header>
    );
}

export default Header;