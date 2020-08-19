import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <footer className="Footer">
                <div className="Fotter__logo"></div>
                <div className="Footer__copyright">Copyright</div>
                <div className="Footer__github">Github</div>
                <div className="Footer__email">Email</div>
                <div></div>
            </footer>
        );
    }
}

export default Footer;