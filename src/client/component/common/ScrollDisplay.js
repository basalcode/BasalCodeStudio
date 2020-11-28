/* module */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ScrollDisplay = () => {
    /* store */
    const appRef = useSelector(store => store.app.appElement, []);
    
    /* state */
    const [progressBarStyle, setProgressBarStyle] = useState({
        width: 0
    });

    /* useEeffect */
    useEffect(() => {
        if (appRef) {
            appRef.addEventListener('scroll', event => {
                const target = event.target;
                const scrollHeight = target.scrollHeight - target.clientHeight;
                const currentScrollPosition = target.scrollTop;
            
                setProgressBarStyle({
                    width: `${Math.floor(currentScrollPosition / scrollHeight * 100)}%`
                });
            });
        }
    }, [appRef]);

    return (
        <div className="ScrollDisplay">
            <div className="ScrollDisplay__progress-bar"
                style={progressBarStyle}></div>
        </div>
    );
}

export default ScrollDisplay;