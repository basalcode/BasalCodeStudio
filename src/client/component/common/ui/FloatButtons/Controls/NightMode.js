import React, { useState } from 'react';

import './NightMode.scss';

const NightMode = () => {
    const [nightMode, setNightMode] = useState(false);
    const [nightModeClassName, setNightModeClassName] = useState('icon-moon');
    const onClickHandler = (event) => {
        if (nightMode) {
            setNightModeClassName('icon-sun-1');
            setNightMode(false);    
        } else {
            setNightModeClassName('icon-moon');
            setNightMode(true);
        }
    }

    return (
        <div className="NightMode">
            <div class={`NightMode__icon ${nightModeClassName}`}
                onClick={onClickHandler}></div>
        </div>
    );
}

export default NightMode;