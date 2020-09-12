import React, { useState, useEffect } from 'react';

import GoTop from './GoTop';
import NightMode from './NightMode';

import './Controls.scss';

const Controls = () => {
    const [effectClassName, setEffectClassName] = useState('Controls--before')
    useEffect(() => {
        const interval = 1500;
        setTimeout(() => {
            setEffectClassName('Controls--after');
        }, interval)
    }, []);

    return (
        <div className={"Controls " + effectClassName}>
            <GoTop></GoTop>
            <NightMode></NightMode>
        </div>
    );
}

export default Controls;