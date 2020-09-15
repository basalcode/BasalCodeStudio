import React, { useEffect } from 'react';

import './MainLobby.scss'

const MainLobby = ({ history }) => {
    useEffect(() => {
        const LOBBY_WAIT_TIMER = 2000;
        window.setTimeout(() => {
            history.push('/blog/lobby');
        }, LOBBY_WAIT_TIMER);
    });

    return (
        <div className="Lobby">
            <div className="Lobby__image"></div>
            <div className="Lobby__circle"></div>
            <div className="Lobby__title">
                <div className="Lobby__text">Basal Code</div>
                <div className="Lobby__text">Studio</div>
            </div>
            <div className="Lobby__first-layor"></div>
            <div className="Lobby__second-layor"></div>
            <div className="Lobby__third-layor"></div>
            <div className="Test"></div>
        </div>
    );
}

export default MainLobby;
