/* module */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Logo = () => {
    const nightModeOn = useSelector(store => store.app.nightModeOn);

    return (
        <div className={
            `Logo ` +
            `${nightModeOn ? "Logo--night-mode " : " "}`}>
            <Link className="Logo__text" to="/blog/lobby">
                    BasalCodeStudio
                    <div className="Logo__underline"></div>
            </Link>
        </div>
    );
}

export default Logo;