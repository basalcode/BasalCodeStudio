/* module */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const NavigationButton = (props) => {
    /* store */
    const nightModeOn = useSelector(store => store.app.nightModeOn);

    /* state */
    const [animationOn, setAnimationOn] = useState(false);

    /* constant */
    const classNameArray = ['first', 'second', 'third', 'fourth'];

    const toggleHandler = event => {
        const toggleResult = !animationOn;

        setAnimationOn(toggleResult);
        props.onToggle(toggleResult);
    }

    return (
        <div className={`NavigationButton ` + 
            `${nightModeOn ? 'NavigationButton--night-mode ' : ' '}`}
            onClick={toggleHandler}> {
                classNameArray.map((element, index) =>
                    <div className={
                        `NavigationButton__bar ` + 
                        `NavigationButton__${element}` + 
                        `--${animationOn ? 'on' : 'off'}`}
                        key={index}></div>
                    )
                }
        </div>
    );
}

export default NavigationButton;