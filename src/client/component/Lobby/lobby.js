import React, { Component } from 'react';
import './Lobby.css'

class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const LOBBY_WAIT_TIMER = 2000;
        window.setTimeout(() => {
            this.props.history.push('/blog/lobby');    
        }, LOBBY_WAIT_TIMER);
    }

    render() {
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
            </div>
        );
    }
}

export default Lobby;