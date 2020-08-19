import React, { Component } from 'react';
import './Logo.css';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="Logo">
                <div className="Logo__text">BasalCodeStudio</div>
                <div className="Logo__bottom-line"></div>
            </div>
        );
    }
}

export default Logo;