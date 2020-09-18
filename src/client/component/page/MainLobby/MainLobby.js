/* module */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const MainLobby = () => {
    const history = useHistory();

    useEffect(() => {   
        const LOBBY_WAIT = 2000;
        window.setTimeout(() => {
            history.push('/blog/lobby');
        }, LOBBY_WAIT);
    });

    return (
        <div className="MainLobby">
            <div className="MainLobby__image"></div>
            <div className="MainLobby__circle"></div>
            <div className="MainLobby__text-container">
                <span className="MainLobby__text">Basal Code</span>
                <span className="MainLobby__text">Studio</span>
            </div>
        </div>
    );
}

export default MainLobby;
