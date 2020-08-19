import React, { Component } from 'react';
import './Navigation.css';

import LoginLink from './LoginLink';
import CategoryLinks from './CategoryLinks';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="Navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg>

                <div className="Navigation__drop-down-container">
                    <LoginLink></LoginLink>
                    <CategoryLinks></CategoryLinks>
                </div>
            </div>
        );
    }
}

export default Navigation;