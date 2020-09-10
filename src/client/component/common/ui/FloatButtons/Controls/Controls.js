import React from 'react';

import GoTop from './GoTop';
import NightMode from './NightMode';

import './Controls.scss';

const Controls = () => {
    return (
        <div className="Controls">
            <GoTop></GoTop>
            <NightMode></NightMode>
        </div>
    );
}

export default Controls;