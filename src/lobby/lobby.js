import React, { Component } from 'react';
import './Lobby.css';

import elementPosition from '../common/library/elementPosition'
import parser from '../common/library/parser';


class Lobby extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="Lobby" >
                <div className="Lobby__image"></div>
                <div className="Lobby__circle"></div>
                {/* <div id="sqaure"></div> */}
                <div className="Lobby__title">
                    <div className="Lobby__text">Basal Code</div>
                    <div className="Lobby__text">Studio</div>
                </div>
                <div className="Lobby__first-layer"></div>
                <div className="Lobby__second-layer"></div>
                <div className="Lobby__third-layer"></div>
            </div>
        );
    }
}

export default Lobby;