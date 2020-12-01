/* module */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Prologue = () => {
    /* history */
    const history = useHistory();

    /* constant */
    const imageURL = "https://images.unsplash.com/photo-1529974019031-b0cd38fd54fc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80";

    useEffect(() => {
        const LOBBY_WAIT = 2000;
        window.setTimeout(() => {
            history.push('/blog/lobby');
        }, LOBBY_WAIT);
    });

    return (
        <div className="Prologue">
            <div className="Prologue__image-container">
                <img className="Prologue__image" src={imageURL} />
            </div>
            <div className="Prologue__circle"></div>
            <div className="Prologue__text-container">
                <p className="Prologue__text">Basal Code</p>
                <p className="Prologue__text">Studio</p>
            </div>
        </div>
    );
}

export default Prologue;
