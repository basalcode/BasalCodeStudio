import React, { useState } from 'react';

import './NavigationButton.scss';

const NavigationButton = ({ clicked }) => {
    console.log(clicked);
    // const [activated, setActivated] = useState(false);

    const activated = "NavigationButton__on";
    const inactivated = "NavigationButton__off";

    return (
        <div className= "NavigationButton">
            <div className={clicked ? `${activated}--first` : `${inactivated}--first`}></div>
            <div className={clicked ? `${activated}--second` : `${inactivated}--second`}></div>
            <div className={clicked ? `${activated}--third` : `${inactivated}--third`}></div>
            <div className={clicked ? `${activated}--fourth` : `${inactivated}--fourth`}></div>
        </div>
    );
}

export default NavigationButton;