/* module */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* store */
import { navigation as navigationAction } from 'store/action/blog';

const NavigationButton = props => {
    /* store */
    const dispatch = useDispatch();
    const nightModeOn = useSelector(store => store.app.nightModeOn);
    const navigationButtonOn = useSelector(store => store.blog.navigationOn);

    /* constant */
    const fadeInOn = props.fadeInOn;

    const classNameArray = ['first', 'second', 'third', 'fourth'];

    const toggleHandler = event => {
        const toggleResult = !navigationButtonOn;

        dispatch(navigationAction(toggleResult));
    }

    return (
        <div className={`NavigationButton ` + 
            `${fadeInOn ? 
                "NavigationButton--fade-in-on" :
                "NavigationButton--fade-in-off"} ` +
            `${nightModeOn ? 'NavigationButton--night-mode ' : ' '}`}
            onClick={toggleHandler}> {
                classNameArray.map((element, index) =>
                    <div className={
                        `NavigationButton__bar ` + 
                        `NavigationButton__${element}` + 
                        `--${navigationButtonOn ? 'on' : 'off'}`}
                        key={index}></div>
                    )
                }
        </div>
    );
}

export default NavigationButton;