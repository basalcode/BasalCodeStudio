/* module */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const NavigationButton = () => {
    /* store */
    const nightModeOn = useSelector(store => store.app.nightModeOn);

    /* state */
    const [animationOn, setAnimationOn] = useState(false);

    /* constant */
    const classNameArray = ['first', 'second', 'third', 'fourth'];

    const toggleButtonAnimation = event => {
        setAnimationOn(animationOn ? false : true);
    }

    return (
        <div className={`NavigationButton ` + 
            `${nightModeOn ? 'NavigationButton--night-mode ' : ' '}`}
            onClick={toggleButtonAnimation}> {
                classNameArray.map(element =>
                    <div className={
                        `NavigationButton__bar ` + 
                        `NavigationButton__${element}` + 
                        `--${animationOn ? 'on' : 'off'}`
                    }></div>
                )
            }
        </div>
    );
}

export default NavigationButton;