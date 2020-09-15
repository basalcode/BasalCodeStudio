import React from 'react';

import ContactLinks from './ContactLinks/ContactLinks';
import Controls from './Controls/Controls';

import './FloatButtons.scss';

const FloatButtons = () => {
    return (
        <div className="FloatButtons">
            <ContactLinks></ContactLinks>
            <Controls></Controls>
        </div>
    );
}

export default FloatButtons;