import React, { Component } from 'react';
import './Navigation.css';

import LoginLink from './LoginLink';
import CategoryLinks from './CategoryLinks';

function Navigation() {
    return (
        <button className="Navigation">
            <svg className="Navigation__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" onClick={function () {
                console.log('Clicked');
            }} /></svg>

            <div className="Navigation__drop-down-container">
                    <LoginLink></LoginLink>
                    <CategoryLinks></CategoryLinks>
                </div>
        </button>
    );
}

export default Navigation;