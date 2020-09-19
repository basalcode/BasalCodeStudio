/* module */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Prologue = () => {
    const history = useHistory();

    useEffect(() => {   
        const LOBBY_WAIT = 2000;
        window.setTimeout(() => {
            history.push('/blog/lobby');
        }, LOBBY_WAIT);
    });

    return (
        <div className="Prologue">
            <div className="Prologue__image"></div>
            <div className="Prologue__circle"></div>
            <div className="Prologue__text-container">
                <span className="Prologue__text">Basal Code</span>
                <span className="Prologue__text">Studio</span>
            </div>
        </div>
    );
}

export default Prologue;
