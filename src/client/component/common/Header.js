import React, { Component } from 'react';
import './Header.css';

import Navigation from '../common/Navigation';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <header className="Header">
                <div className="Header__logo">Basal Code Studio</div>
            </header>
        );
    }
}

export default Header;