import React, { useState, useEffect } from 'react';

import EmailLink from './EmailLink';
import GitHubLink from './GitHubLink';

import './ContactLinks.scss';

const ContactLinks = () => {
    const [effectClassName, setEffectClassName] = useState('ContactLinks--before')
    useEffect(() => {
        const interval = 1500;
        setTimeout(() => {
            setEffectClassName('ContactLinks--after');
        }, interval)
    }, []);


    return (
        <div className={"ContactLinks " + effectClassName}>
            <EmailLink></EmailLink>
            <GitHubLink></GitHubLink>
        </div>
    );
}

export default ContactLinks;