/* module */
import React, { useState } from 'react';

const NavigationButton = () => {
    const [animationOn, setAnimationOn] = useState(false);
    const classNameArray = ['first', 'second', 'third', 'fourth'];

    const toggleButtonAnimation = event => {
        setAnimationOn(animationOn ? false : true);
    }

    return (
        <div className="NavigationButton"
            onClick={toggleButtonAnimation}> {
                classNameArray.map(element =>
                    <div className={
                        `NavigationButton__${element}` + 
                        `--${animationOn ? 'on' : 'off'}`
                    }></div>
                )
            }
        </div>
    );
}

export default NavigationButton;