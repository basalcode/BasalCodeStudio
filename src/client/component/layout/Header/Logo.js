/* module */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Logo = props => {
    const nightModeOn = useSelector(store => store.app.nightModeOn);

    /* props */
    const fadeInOn = props.fadeInOn;

    return (
        <div className={
            "Logo " +
            `${fadeInOn ? 
                "Logo--fade-in-on" :
                "Logo--fade-in-off"} ` +
            `${nightModeOn ? "Logo--night-mode " : " "}`}>
            <Link className="Logo__text" to="/blog/lobby">
                    BasalCodeStudio
                    <div className="Logo__underline"></div>
            </Link>
        </div>
    );
}

export default Logo;