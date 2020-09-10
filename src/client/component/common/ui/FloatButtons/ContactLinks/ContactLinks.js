import React from 'react';

import EmailLink from './EmailLink';
import GitHubLink from './GitHubLink';

import './ContactLinks.scss';

const ContactLinks = () => {
    return (
        <div className="ContactLinks">
            <EmailLink></EmailLink>
            <GitHubLink></GitHubLink>
        </div>
    );
}

export default ContactLinks;