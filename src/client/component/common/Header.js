import React, { Component } from 'react';
import './Header.css';

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
                <nav className="Header__navigation">Navigation</nav>
            </header>
        );
    }
}

export default Header;