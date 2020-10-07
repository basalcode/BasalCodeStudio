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
            <Link to="/blog/lobby">
                <a className="Logo__text">
                    BasalCodeStudio
                    <div className="Logo__underline"></div>
                </a>
            </Link>

        </div>
    );
}

export default Logo;