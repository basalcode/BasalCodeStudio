import React from 'react';

import './BlogLobbySkills.scss'

const BlogLobbySkills = () => {
    const subtitles = [
        'basics',
        'front-end',
        'back-end',
        'version-control',
        'packages',
    ];
    const images = [
        
    ];
    const texts = [

    ];

    return (
        <section className="BlogLobbySkills">
            <h1 className="BlogLobbySkills__title">Used Skills</h1>
            <p classname="BlogLobbySkills__paragraph">
                {subtitles.map(subtitle => (
                    <h2 className="BlogLobbySkills__subtitle">
                        {subtitle}
                    </h2>
                ))}
                {images.map(image => (
                    <div className="BlogLobbySkills__image" src={image} />
                ))}
                {texts.map(text => (
                    <span className="BlogLobbySkills__text">
                        {text}
                    </span>
                ))}
            </p>
            

        </section>
    );
}

export default BlogLobbySkills;